""" The website package defines the flask application, and also creates a database of models

    Attributes
    ----------
    db : SQLAlchemy
        defining databases
        
    login_manager : LoginManager
        defining the login manager
        
    api : Api
        api (application programming interface) definition 
        
    Functions
    ---------
    create_app()
        defining the flask of an application
        
    create_data(app)
        creating a database
"""


from flask import Flask 
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from bcrypt import hashpw, gensalt
from flask_restful import Api



db = SQLAlchemy()
login_manager = LoginManager()
login_manager.login_view = 'auth.login'
login_manager.login_message_category = 'danger'
api = Api()




# функция создания приложения
def create_app():
    """ Function for defining the application and routes, as well as for initialization
    
    Initializations
    ---------------
        db
        login_manager
        api
    
    Routes blueprint
    ----------------
        /acc
        /auth
        /
        
    Attributes
    ----------
        app : Flask
        
    Functions
    ---------
    create_data(app: Flask)
    
    Returns:
        Flask: application
    """
    
    app = Flask(__name__)

    app.config.from_pyfile('main/settings.py')
    db.init_app(app)
    login_manager.init_app(app)

    # API
    from website.API import prod_api, user_api, user_prod_api, buy_user_prod_api
    api.add_resource(prod_api.ProductInfo, '/api/product/', '/api/product/<int:prod_id>/')
    api.add_resource(user_api.UserInfo, '/api/user/<int:user_id>/')
    api.add_resource(user_prod_api.UserProductInfo, '/api/user_prod/<int:user_prod_id>/')
    api.add_resource(buy_user_prod_api.BuyProductUserInfo, '/api/buy_prod/<int:buy_prod_id>/')
    api.init_app(app)
    
    
    # blueprints
    from .main.temp import views
    from .account.account_route import acc
    from.auth.auth_route import auth
    
    
    app.register_blueprint(acc, url_prefix='/acc')
    app.register_blueprint(auth ,url_prefix='/auth')
    app.register_blueprint(views,url_prefix='/')


    # создаём базу данных с нашими таблицами, усли такая уже есть пересоздовать не будет
    create_data(app)
    


    # возвращаем наше приложение
    return app

def create_data(app: Flask):
    """ Function for creating a database based on SQLAlchemy class models

    Args:
        app (Flask): the definition of a flask application is given
        
    Imports model
    -------------
        User 
        Product 
        UserProduct 
        BuyProductUser
    """
    
    
    # импортируем наши таблицы для create_all
    from .models import User, Product, UserProduct, BuyProductUser

     # открываем контекст, без него нельзя
    with app.app_context():
        # создаём базу данных с нашими таблицами, усли такая уже есть пересоздовать не будет
        db.drop_all()
        db.create_all()
        hashed_password =  hashpw('1313'.encode(), gensalt())
        user = User(username='Admin13', email='admin@blog.com', password=hashed_password)
        usertest = User(username='Usertest', email='user@blog.com', password=hashed_password)
        product = Product(title='Гучи кроссы', prise=500, category='Элит', filter_category='Элит', img_file='image/product/sneakers_pro.jpg')
        product_1 = Product(title='Турбо кроссы', prise=300, category='Дорогие кросы', filter_category='Дорогиекросы', img_file='image/product/sneakers.jpg')
        product_2 = Product(title='Мега кроссы', prise=200, category='Дорогие кросы', filter_category='Дорогиекросы')
        product_3 = Product(title='Мега кроссы', prise=200, category='Дорогие кросы', filter_category='Дорогиекросы')
        product_4 = Product(title='Мега кроссы', prise=200, category='Дорогие кросы', filter_category='Дорогиекросы')
        product_5 = Product(title='Мега кроссы', prise=200, category='Дорогие кросы', filter_category='Дорогиекросы')
        product_6 = Product(title='Мега кроссы', prise=200, category='Дорогие кросы', filter_category='Дорогиекросы')
        buy = UserProduct(user_id=1, product_id=1, like=True)
        db.session.add_all([user, product, product_1, product_2, product_3, product_4, product_5, product_6, usertest, buy])
        db.session.commit()
        
        
