""" This module contains the main route and its event handlers

    Attributes
    ----------
    views: Blueprint
"""

from .. import db
from flask import Blueprint
from flask import render_template, request, url_for, redirect, session
from website.account.account_form import AccauntBasketForm, AccountLileForm
from website.main.product_image_form import ProductItemForm
from flask_login import current_user, login_required
from ..models import Product, UserProduct
import json
from ..utils import save_img as s


views = Blueprint('views', __name__)


@views.route('/', methods=['GET', 'POST'])
def index():
    """ The main flow of information located on the index home page

    Note:
        the main route is carried out using '/'
        processes the get, post methods

    Attributes
    ----------
    like: AccountLileForm
    form_basket: AccauntBasketForm
    product: list
    user_prod_help_like: list
    filter_category: list
    context: dict
    Returns:
        function: returns the html page via render_template
    """

    like = AccountLileForm(prefix='like')
    form_basket = AccauntBasketForm(prefix='basket')
    product = Product.query.order_by(Product.prise).all()

    if '_user_id' in session:
        id = session['_user_id']
        user_prod_help_like = db.session.query(UserProduct).filter(
            UserProduct.user_id == id, UserProduct.like == True).all()

    else:
        user_prod_help_like = []

    filter_category = Product.query.with_entities(
        Product.category, Product.filter_category).distinct()

    context = {
        'title': 'Главная страница',
        'data': product,
        'current_user': current_user,
        'filter_category': filter_category,
        'request': request.base_url,
        'form_basket': form_basket,
        'like': like,
        'help_like': user_prod_help_like
    }

    if request.method == 'POST':

        if form_basket.validate_on_submit and form_basket.basket_submit.data:
            bask = form_basket.basket.data
            product_basket = db.session.query(Product).get(bask)
            exists = UserProduct.query.filter(
                UserProduct.product_id == bask, UserProduct.user_id == id).first()

            if not exists:
                product_basket.basket = id
                product_basket.isActive = False
                user_product = UserProduct(user_id=id, product_id=bask)
                db.session.add_all([user_product, product_basket])
            else:
                product_basket.basket = id
                product_basket.isActive = False
                db.session.add(product_basket)
            db.session.commit()

        if like.validate_on_submit and like.like_submit.data:
            lk = like.like.data

            exists = UserProduct.query.filter(
                UserProduct.product_id == lk, UserProduct.user_id == id).first()

            if not exists:
                product_like = UserProduct(
                    user_id=id, product_id=lk, like=True)
                db.session.add(product_like)

            else:
                product_like = db.session.query(Product).get(lk)
                product_like.like = True

            db.session.commit()

            return redirect(url_for('.index'))

    return render_template('index.html', **context)


@views.route('/info/')
def info():
    """ This creation was made only because of my poor acquaintance in js, and with this function info you can get product categories

    Returns:
        json: get product filter_categories
    """
    category = Product.query.with_entities(
        Product.filter_category, Product.isActive).distinct()
    return json.dumps({x.filter_category: '1' for x in category if x.isActive})


@views.route('/create-product/', methods=['GET', 'POST'])
@login_required
def create():
    """ The create function allows you to add a product to the database

    Note:
        the main route is carried out using '/create-product'
        processes the get, post methods
        this function has binding conditions
            login_required: the user must be logged in

    Attributes
    ----------
    form_prod: ProductItemForm
    context: dict

    Returns:
        function: returns the html page via render_template
    """
    form_prod = ProductItemForm()
    context = {
        'title': "Создание заявки",
        'legend': 'Создание продукта',
        'form': form_prod
    }

    if request.method == 'POST':

        if form_prod.validate_on_submit():
            filter_category = ''.join(form_prod.category.data.split())
            category = form_prod.category.data
            discount = int(form_prod.discount.data)
            title = form_prod.title.data
            price = int(form_prod.price.data) - \
                (int(form_prod.price.data)) / 100 * discount
                
            if not form_prod.image.data is None:
                path = s.save_image(form_prod.image.data)
                product = Product(title=title, prise=price, discount=discount,
                                  category=category, filter_category=filter_category, img_file=path)

            else:
                product = Product(title=title, prise=price, discount=discount,
                                  category=category, filter_category=filter_category)

            db.session.add(product)
            db.session.commit()

            return redirect(url_for('.index'))
    return render_template('create.html', **context)


@views.app_errorhandler(404)
def page_nor_found(error):
    context = {
        'title':'Страница не найдена',
        'url': request.base_url
    }
    return render_template('404.html', **context), 404