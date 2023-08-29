from . import db
from flask_login import UserMixin
from sqlalchemy.sql import func
from bcrypt import hashpw, checkpw, gensalt
from . import login_manager
from sqlalchemy_utils import PhoneNumberType


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


class User(db.Model, UserMixin):
    """This class representing a custom model

    Args:
        db (SQLAlchemy): DATABASE
        UserMixin (flask_login): help in creating a user model

    """
    
    __tablename__ = 'User'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)
    image_file = db.Column(db.String(20), nullable=False,
                           default='image/avatars/inc.jpg')
    time = db.Column(db.DateTime(timezone=True), default=func.now())

    user_phone = db.Column(PhoneNumberType(), nullable=False, default='')

    def set_password(self, password, hashed_password):
        """ Method for changing the password

        Args:
            password (str): this is a new password 
            hashed_password (sqlalchemy.orm.attributes.InstrumentedAttribute): this is an old password
        """
        self.hashed_password = hashpw(password.encode(), gensalt())

    def check_password(self, password):
        """ Password decryption method

        Args:
            password (function): _description_

        Returns:
            str: password decode
        """
        return checkpw(password.encode(), self.hashed_password)

    def __repr__(self):
        """__repr__

        Returns:
            User: Output of the main fields of the User class
        """
        return f'User({self.username}, {self.email}, {self.password}, {self.image_file}, {self.user_phone})'


class Product(db.Model):
    """ This class represents the product model

    Args:
        db (SQLAlchemy): DATABASE
    """
    
    __tablename__ = 'Product'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    prise = db.Column(db.Integer, nullable=False)
    isActive = db.Column(db.Boolean, nullable=False, default=True)
    discount = db.Column(db.Integer, nullable=False, default=0)
    time = db.Column(db.DateTime(timezone=True), default=func.now())
    # возможно нужно будет добавить обратную связь
    category = db.Column(db.String(100), nullable=False)
    filter_category = db.Column(db.String(100), nullable=False)
    img_file = db.Column(db.String(20), nullable=False,
                         default='image/product/nlo.jpg')
    basket = db.Column(db.Integer, nullable=False, default=0)

    buy = db.Column(db.Boolean, nullable=False, default=False)
    user_prod = db.relationship('UserProduct', backref='users', uselist=False)
    buy_order = db.Column(db.Integer, db.ForeignKey(
        'BuyProductUser.order_number'), default=0)

    def to_dict(self):
        """ Method for getting a dictionary with Product information

        Returns:
            dict: Information about columns and their values is displayed
        """
        return {
            column.name: getattr(self, column.name, None)
            for column in Product.__table__.columns if column.name != 'id'
        }


class UserProduct(db.Model):
    """This class represents a user product model

    Args:
        db (SQLAlchemy): DATABASE
    """
    
    __tablename__ = 'UserProduct'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('User.id'))
    product_id = db.Column(db.Integer, db.ForeignKey('Product.id'))
    like = db.Column(db.Boolean, nullable=False, default=False)


class BuyProductUser(db.Model):
    """A class for representing user purchases

    Args:
        db (SQLAlchemy): DATABASE
    """
    
    __tablename__ = 'BuyProductUser'

    id = db.Column(db.Integer, primary_key=True)
    order_number = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('User.id'))
    summa = db.Column(db.Integer, nullable=False)
    time = db.Column(db.DateTime(timezone=True), default=func.now())
    buy_prod = db.relationship('Product', backref='by_prod', uselist=False)


