""" A module belonging to the blueprint authentication group responsible for request forms
"""

from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, SubmitField, PasswordField
from wtforms.validators import DataRequired, Email, Length, EqualTo, InputRequired, ValidationError
from ..models import User


class LoginForm(FlaskForm):
    username = StringField('Имя', validators=[DataRequired()], render_kw={'class':'form-post-title'})
    password = PasswordField('Пароль', validators=[DataRequired() ], render_kw={'class':'form-post-title'})
    # галочка запомнить True False, нужен для login_user(remember=remember)
    remember = BooleanField('Запомнить меня', render_kw={'class':'form-check-label'})
    submit = SubmitField('Войти', render_kw={'class':'btn'})
    
    


class SingUpForm(FlaskForm):
    sing_username = StringField('Username', validators=[DataRequired(), Length(min=6, max=36)], render_kw={'class':'form-post-title', 'placeholder':'Username'})
    sing_email = StringField('Email', validators=[DataRequired(),Email() ], render_kw={'class':'form-post-title', 'placeholder':'Email'})
    # идет сравнение через EqualTo паролей
    sing_password = PasswordField('Password', validators=[InputRequired(), EqualTo('sing_config_password','passwords must match')], 
                                  render_kw={'class':'form-post-title', 'placeholder':'Password'})
    
    sing_config_password = PasswordField('Config Password', validators=[InputRequired()], render_kw={'class':'form-post-title', 'placeholder':'Config Password'})
    sing_submit = SubmitField('Зарегистрироваться', render_kw={'class':'btn'})
      
      
    def validate_sing_username(self, sing_username):
        """ Function sing_validate_username for checking the name in the database

        Args:
            sing_username (StringField): data received from the form

        Returns:
            str: confirmation string
            None: None if the given name has already been reserved 
        """
        
        user = User.query.filter_by(username=sing_username.data).first()
        if user:
            raise ValidationError('this name is already reserved')


    def validate_sing_email(self, sing_email):
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
            raise ValidationError('this email is already reserved')