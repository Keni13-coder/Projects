""" Module for routing authentication

    Attributes
    ----------
    auth: Blueprint('auth', template_folder='templates\\auth', static_folder='static')
"""
from .. import db
from flask import Blueprint
from flask import render_template, request, flash, url_for, redirect, make_response
from website.auth.auth_form import LoginForm, SingUpForm
from website.models import hashpw, checkpw, gensalt
from flask_login import login_user, logout_user
from ..models import User




auth = Blueprint('auth', __name__, template_folder='templates\\auth', static_folder='static')



@auth.route('/login/', methods=['GET', 'POST'])
def login():
    """ login function performs two tasks: registration and login

    Note:
        the main route is carried out using '/login'
        processes the get, post methods
        after any POST request, the user logs in through the login_use() function
        GET request provides the basic information of the page

    Attributes
    ----------
    login_form: LoginForm
    singUp_form: SingUpForm
    context: dict
    
    Returns:
        function: returns the html page via render_template
    """

    login_form = LoginForm()
    singUp_form = SingUpForm()
    context = {
        'title':'Вход',
        'login_legend':'Войти',
        'singup_legend':'Зарегистрироваться',
        'login_form':login_form,
        'singUp_form':singUp_form
    }
    
    if request.method == 'POST':
        # Регистрация
        
        if singUp_form.validate_on_submit():
            password = hashpw(singUp_form.sing_password.data.encode(), gensalt())
            new_user = User(username=singUp_form.sing_username.data, email=singUp_form.sing_email.data, password=password)

            db.session.add(new_user)

            db.session.commit()
            login_user(new_user, remember=True)
            username = singUp_form.sing_username.data
            response = make_response(redirect(url_for('views.index')))
            response.set_cookie('username', username)
            next_page = request.args.get('next')
            return redirect(next_page) if next_page else response

        # Вход
        if login_form.validate_on_submit():
            user = db.session.query(User).filter_by(username=login_form.username.data).first()

            if user:
                if checkpw(login_form.password.data.encode(), user.password):

                    login_user(user, remember=login_form.remember)
                    username = login_form.username.data
                    response = make_response(redirect(url_for('views.index')))
                    response.set_cookie('username', username)
                    next_page = request.args.get('next')
                    return redirect(next_page) if next_page else response
                else:
                    flash('Войти не удалось. Пожалуйста проверте Имя или пароль', 'danger')
            else:
                flash('Войти не удалось. Пожалуйста проверте Имя или пароль', 'danger')
                
    return render_template('sing_up.html', **context)





@auth.route('/logout/')
def logout():
    """ logout function will allow the user to log out of the system

    Note:
        Logs out using the logout_user() function

    Returns:
        views.index: switching to the login function
    """
    logout_user()
    return redirect(url_for('views.index'))
