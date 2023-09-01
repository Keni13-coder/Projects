""" Module with routes related to account interaction

    Attributes
    ----------
    acc = Blueprint('acc', template_folder='templates\\account', static_folder='static')
"""

from .. import db
from flask import Blueprint
from flask import render_template, request, flash, url_for, redirect, session
from website.account.account_form import UpdateNameAccount, PasswordAccounForm, UpdateEmailAccount, UpdatePhoneAccount,\
    UpdateImageAccount,AccauntBasketForm, AccauntPlaceForm, AccountLileForm, AccountBuyProducts
    
from website.models import hashpw, gensalt
from flask_login import current_user, login_required
from ..models import User, Product, UserProduct, BuyProductUser
from ..utils import save_img as s
import os



acc = Blueprint('acc', __name__, template_folder='templates\\account', static_folder='static')

@acc.route('/account/', methods=['GET', 'POST'])
@login_required  # схема работы если пользователь авторизован
def account():
    """ account function for user data management

    Note:
        the main route is carried out using '/account'
        processes the get, post methods
        this function has binding conditions
            login_required: the user must be logged in

    Attributes
    ----------
    form_name: UpdateNameAccount
    form_email: UpdateEmailAccount
    form_image: UpdateImageAccount
    form_phone: UpdatePhoneAccount
    password_form: PasswordAccounForm
    filter_category: list
        Product.query.with_entities
    context: dict
    
    Returns:
        function: returns the html page via render_template
    """
    form_name = UpdateNameAccount()
    form_email = UpdateEmailAccount()
    form_image = UpdateImageAccount()
    form_phone = UpdatePhoneAccount()
    password_form = PasswordAccounForm()
    filter_category = Product.query.with_entities(
        Product.category, Product.filter_category).distinct()
    
    context = {
        'title': 'Пользователь', 
        'current_user': current_user, 
        'filter_category': filter_category,
        'form_image': form_image, 
        'form_password': password_form, 
        'form_name': form_name, 
        'form_email': form_email, 
        'form_phone': form_phone, 
        'legend': 'Поменять данные'
    }
    
    if request.method == 'POST':
        if password_form.validate_on_submit():
            if password_form.validate_password(password_form.old_password):
                id = session['_user_id']
                user_password = db.session.query(User).get(id)
                user_password.password = hashpw(
                    password_form.new_password.data.encode(), gensalt())
                db.session.add(user_password)
                db.session.commit()

                return redirect(url_for('auth.logout'))
            
        if form_name.validate_on_submit():
            if form_name.validate_username(form_name.new_username):
                id = session['_user_id']
                username = db.session.query(User).get(id)
                username.username = form_name.new_username.data
                db.session.add(username)
                db.session.commit()

        if form_email.validate_on_submit():
            id = session['_user_id']
            email = db.session.query(User).get(id)
            email.email = form_email.email.data
            db.session.add(email)
            db.session.commit()

        if form_phone.validate_on_submit():
            id = session['_user_id']
            phone = db.session.query(User).get(id)
            phone.user_phone = form_phone.phone.data
            db.session.add(phone)
            db.session.commit()

        if form_image.validate_on_submit():
            try:
                path = s.save_image(form_image.image.data)
                id = session['_user_id']
                img = db.session.query(User).get(id)
                img.image_file = path
                db.session.add(img)
                db.session.commit()
            except AttributeError:
                flash('Фыйл не был выбран')

    return render_template('account.html', **context)







@acc.route('/basket/', methods=['GET', 'POST'])
@login_required
def shopping_basket():
    """ shopping_basket function provides information about the products that the user has in the cart

    Note:
        the main route is carried out using '/basket'
        processes the get, post methods
        this function has binding conditions
            login_required: the user must be logged in

    Attributes
    ----------
    basket: AccauntBasketForm
        (prefix='data')
    place: AccauntPlaceForm
        (prefix='plase')
    summa: int
    id: int
    context: dict
    
    Returns:
        function: returns the html page via render_template
    """

    basket = AccauntBasketForm(prefix='data')
    place = AccauntPlaceForm(prefix='plase')
    summa = 0
    id = session['_user_id']
    results = db.session.query(UserProduct, User, Product).join(
        Product).join(User).filter(UserProduct.user_id == id, Product.buy == 0, Product.basket == id).all()
    
    context = {
        'title': 'Корзина покупок',
        'data': results,
        'sum': summa, 
        'basket': basket,
        'place': place
    }
    
    
    for user_p, user, prod in results:
        summa += prod.prise

    if request.method == 'POST':

        if basket.validate_on_submit():
            del_prod = basket.basket.data
            changes = db.session.query(Product).get(del_prod)
            changes.isActive = True
            changes.basket = id
            del_prod = db.session.query(UserProduct).filter(
                                                UserProduct.product_id == del_prod, UserProduct.user_id == id).first()
            
            db.session.add(changes)
            if del_prod:
                db.session.delete(del_prod)
            
            db.session.commit()
            return redirect(url_for('.shopping_basket'))

        if place.validate_on_submit() and place.place_submit.data:
            if summa:
                buy = []
                order_nubmer = os.urandom(16)
                place_opder = BuyProductUser(user_id=id, summa=summa, order_number=order_nubmer)
                
                db.session.add(place_opder)

                for user_p, user, prod in results:
                    prod.buy = True
                    prod.buy_order = order_nubmer
                    prod.basket = 0
                    db.session.delete(user_p)
                    buy.append(prod)
                # подготовил почву к списку заказов, сделать нужный фильтры по каказам и пользователям
                db.session.add_all([*buy])

                db.session.commit()
                
            return redirect(url_for('views.index'))
    return render_template('basket.html', **context)


@acc.route('/like/', methods=['GET', 'POST'])
@login_required
def like_user():
    """ like_user function provides information about the product the user likes

    Note:
        the main route is carried out using '/like'
        processes the get, post methods
        this function has binding conditions
            login_required: the user must be logged in

    Attributes
    ----------
    form_basket: AccauntBasketForm
        (prefix='basket')
    like: AccountLileForm
        (prefix='like')
    likes: list
        join UserProduct and Product
    id: int
    context: dict
    
    Returns:
        function: returns the html page via render_template
    """
    id = session['_user_id']
    likes = db.session.query(UserProduct, Product).join(
        Product).filter(UserProduct.user_id == id, UserProduct.like == True).all()

    form_basket = AccauntBasketForm(prefix='basket')
    like = AccountLileForm(prefix='like')
    context = {
        'title': 'Понравилось',
        'likes': likes,
        'form_basket': form_basket,
        'like': like
    }
    
    if request.method == 'POST':
        if form_basket.validate_on_submit and form_basket.basket_submit.data:
            bask = form_basket.basket.data
            product_basket = db.session.query(UserProduct, Product).join(Product).filter(UserProduct.user_id == id, Product.id == bask).first()
            # на данный момент после понравилось если кто-то и пользователей добовляет в корзину товар появляеться у всех!!!!
            product_basket[1].basket = id
            product_basket[1].isActive = False
            product_basket[0].like = False
            db.session.add_all(product_basket)
            
        if like.validate_on_submit and like.like_submit.data:
            lk = like.like.data
            product_like = db.session.query(UserProduct).filter_by(product_id=lk).first()
            if product_like:
                db.session.delete(product_like)

        db.session.commit()
        return redirect(url_for('.like_user'))
    
    return  render_template('like.html', **context)


@acc.route('/purchase/Order-number<int:buy_id>/')
@login_required
def log_user_prod(buy_id):
    """ auxiliary function displaying the desired url
    
     Note:
        the main route is carried out using 'purchase/Order-number<buy_id>'
        this function has binding conditions
            login_required: the user must be logged in

    Args:
        buy_id (int): received data from the form transmitting the purchase id

    Attributes
    ----------
    id: int
    user_log_prod: list 
        join BuyProductUser and Product
        
    Returns:
        function: returns the html page via render_template
    """
    
    id = session['_user_id']
    user_log_prod = db.session.query(BuyProductUser,Product).join(Product).filter(BuyProductUser.user_id == id,BuyProductUser.id == buy_id).all()
    return render_template('user_prod_log.html', log=user_log_prod, title=f'Заказ №-{buy_id}')


@acc.route('/purchase/', methods=['GET', 'POST'])
@login_required
def purchase_log():
    """ like_user function provides information about the product the user likes

    Note:
        the main route is carried out using '/purchase'
        processes the get, post methods
        this function has binding conditions
            login_required: the user must be logged in

    Attributes
    ----------
    log_form: AccountBuyProducts()
    log_user: list
        join BuyProductUser and Product
    order: list
        BuyProductUser
    id: int
    context: dict
    
    Returns:
        function: returns the html page via render_template
    """
    
    log_form = AccountBuyProducts()
    id = session['_user_id']
    log_user = db.session.query(BuyProductUser,Product).join(Product).filter(BuyProductUser.user_id == id).all()
    order = db.session.query(BuyProductUser).filter(BuyProductUser.user_id == id).all()
    context = {
        'log': log_user,
        'order': order,
        'form': log_form,
        'title': 'История покупок'
    }
    
    if request.method == 'POST':
        if log_form.validate_on_submit():
            id_order = log_form.buy.data
            
            return redirect(url_for('.log_user_prod', buy_id=id_order))

    return render_template('user_buy_log.html', **context)