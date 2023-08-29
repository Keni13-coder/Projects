""" A module belonging to the blueprint authentication group responsible for request forms
"""

from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, SubmitField, PasswordField
from wtforms.validators import DataRequired, Email, Length, EqualTo,InputRequired
from ..models import User
from flask import flash


class LoginForm(FlaskForm):
    username = StringField('Имя', validators=[DataRequired()])
    password = PasswordField('Пароль', validators=[DataRequired() ])
    # галочка запомнить True False, нужен для login_user(remember=remember)
    remember = BooleanField('Запомнить меня')
    submit = SubmitField('Войти')
    
    
    def validate_username(self, username):
        user = User.query.filter_by(username=username.data).first()
        return user


class SingUpForm(FlaskForm):
    sing_username = StringField('Имя', validators=[DataRequired(), Length(min=6, max=36) ])
    sing_email = StringField('Емайл', validators=[DataRequired(),Email() ])
    # идет сравнение через EqualTo паролей
    sing_password = PasswordField('Пароль', validators=[InputRequired(), EqualTo('sing_config_password')])
    sing_config_password = PasswordField('Подвердите пароль', validators=[InputRequired()] )
    sing_submit = SubmitField('Зарегистрироваться')
      
      
    def sing_validate_username(self, sing_username):
        """ Function sing_validate_username for checking the name in the database

        Args:
            sing_username (StringField): data received from the form

        Returns:
            str: confirmation string
            None: None if the given name has already been reserved 
        """
        
        user = User.query.filter_by(username=sing_username.data).first()
        if user:
            flash('Это имя уже занято', 'danger')
            return
        return 'Ок'


    def sing_validate_email(self, sing_email):
        """ Function sing_validate_email for checking the email in the database

        _extended_summary_

        Args:
            sing_email (StringField):  data received from the form

        Returns:
            str: confirmation string
            None: None if the given email has already been reserved 
        """
        email = User.query.filter_by(email=sing_email.data).first()
        if email:
            flash('Это емайл уже занят', 'danger')
            return
        return 'Ок'