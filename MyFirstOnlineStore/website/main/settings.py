""" Module for defining .env add-ins

"""


import os
from dotenv import load_dotenv


# создание путей к .env
basedir = os.path.abspath(os.path.dirname(__file__))
# берет basedir и ищет в нём .env
load_dotenv(os.path.join(basedir, '.env'))

SECRET_KEY = os.urandom(36)
SQLALCHEMY_DATABASE_URI = os.environ.get('SQLALCHEMY_DATABASE_URI')
SQLALCHEMY_TRACK_MODIFICATION = os.environ.get('SQLALCHEMY_TRACK_MODIFICATION')
