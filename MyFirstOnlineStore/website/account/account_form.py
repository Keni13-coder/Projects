"""module with the necessary forms for the account"""

from ..main.product_image_form import ImageField,ImageAllowed
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, PasswordField
from wtforms.validators import ValidationError, DataRequired, Length, Email, InputRequired, EqualTo
from ..models import User, checkpw 
from flask import flash
from flask_login import current_user



class UpdateNameAccount(FlaskForm):
    new_username = StringField('Имя', validators=[DataRequired(), Length(min=6, max=36) ])
    name_submit = SubmitField('Обновить')


    def validate_username(self, new_username):
        """ Function validate_username for checking the name in the database
        
        Args:
            new_username (StringField): data received from the form
        
        Returns:
            str: confirmation string
            None: None if the given name has already been reserved
        """
        user = User.query.filter_by(username=new_username.data).first()
        if user:
            flash('Это имя уже занято', 'danger')
            return
        return 'Ок'
    

class UpdateEmailAccount(FlaskForm):
    email = StringField('Емайл', validators=[DataRequired(),Email() ])
    email_submit = SubmitField('Обновить')
    

    def validate_email(self, email):
        """ Function validate_email for checking the email in the database 

        Args:
            email (StringField): data received from the form

        Raises:
            ValidationError: This email is already taken
        """
        
        email = User.query.filter_by(email=email.data).first()
        if email:
            flash('Это емайл уже занят', 'danger')
            raise ValidationError('Этот email уже занят')

    
    
    
class UpdatePhoneAccount(FlaskForm):
    phone = StringField('Phone', validators=[DataRequired()])
    phone_submit = SubmitField('Обновить')
    
    def validate_phone(self, phone):
        """ Function validate_phone for checking the phone in the database

        Args:
            phone (StringField): data received from the form

        Raises:
            ValidationError: This field is not filled in correctly
            ValidationError: This phone is already busy
        """
        
        try:
            phone = User.query.filter_by(user_phone=phone.data).first()
        except:
            raise ValidationError('Данное поле заполненной не верно')
        if phone:
            flash('Это телефон уже занят', 'danger')
            raise ValidationError('Это телефон уже занят')
            
    
    
class UpdateImageAccount(FlaskForm):
    image = ImageField(validators=[ImageAllowed(['jpeg', 'jpg'])])
    image_submit = SubmitField('Обновить')



class PasswordAccounForm(FlaskForm):
    old_password = PasswordField('Старый пароль', validators=[DataRequired() ])
    new_password = PasswordField('Новый пароль', validators=[InputRequired(), EqualTo('config_password')])
    config_password = PasswordField('Подвердите новый пароль', validators=[InputRequired()] )
    password_submit = SubmitField('Обновить')
    
    def validate_password(self, old_password):
        """ Function validate_password for checking the old_password in the database
        
        Args:
            old_password (StringField): data received from the form
        
        Returns:
            str: confirmation string
            None: None if the given name has already been reserved
        """
        user_name = User.query.filter_by(username=current_user.username).first()
        old_password =  old_password.data.encode()
        if not checkpw(old_password,  user_name.password):
            flash('Не верный пароль', 'danger')
            return
        else:
            return 'Ок'
 
 
class AccauntBasketForm(FlaskForm):
    basket = StringField()
    basket_submit = SubmitField('Корзина')




class AccauntPlaceForm(FlaskForm):
    place = StringField()
    place_submit = SubmitField('Оплатить')
    

class AccountLileForm(FlaskForm):
    like = StringField()
   
    like_submit = SubmitField('Понарвилось')


class AccountBuyProducts(FlaskForm):

    buy = StringField()
    buy_submit = SubmitField('Подробнее')