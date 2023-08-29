""" Module for routing authentication

    Attributes
    ----------
    auth: Blueprint('auth', template_folder='templates\\auth', static_folder='static')
"""
from .. import db
from flask import Blueprint
from flask import render_template, request, flash, url_for, redirect
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
            if singUp_form.sing_validate_username(singUp_form.sing_username) and singUp_form.sing_validate_email(singUp_form.sing_email):
                new_user = User(username=singUp_form.sing_username.data, email=singUp_form.sing_email.data, password=hashpw(
                    singUp_form.sing_password.data.encode(), gensalt()))

                # добовляем в базу данных
                db.session.add(new_user)

                # сохроняем
                db.session.commit()
                login_user(new_user, remember=True)
                # переходим на главную, переход делаеться через функции url_for('views.index')- указываем модуль и функцию
                next_page = request.args.get('next')
                return redirect(next_page) if next_page else redirect(url_for('views.index'))

            else:
                flash('Такой пользователь уже зарегистрирован',
                      category='successes')

        # Вход

        if login_form.validate_on_submit():

            user = login_form.validate_username(username=login_form.username)
            # делаем проверку на вхождение майла и пароля пользователя
            if user and checkpw(login_form.password.data.encode(), user.password):
                # авторизуем его
                login_user(user, remember=login_form.remember)
                # next получаем из аргументов
                next_page = request.args.get('next')
                return redirect(next_page) if next_page else redirect(url_for('views.index'))
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
