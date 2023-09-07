""" 
Module for interaction between the client and the User table
"""

from website.models import User
from .. import db
from flask_restful import Resource, reqparse
from bcrypt import hashpw, gensalt
import json
from flask import session




class UserInfo(Resource):

    def get(self, user_id):
        """ get request

        Attributes
        ----------
        all_user: list
            User.query.all
            all_user: dict
            
        Returns:
            json: full information from the User class
        """

        all_user = User.query.filter_by(id=user_id).first()
        if all_user:
            if all_user.id == int(session.get('_user_id')):
                all_user = {all_user.id: all_user.to_user()}
                return json.dumps(all_user, indent=4, sort_keys=True, default=str, ensure_ascii=False)
            
            else:
                return json.dumps({'massages': 'no access'}), 403
        
        else:   
            return json.dumps({'massages': 'this user does not exist'}), 404
        

        


    def post(self):
        """ post request

        Note:
            The request is processed using reqparse.RequestParser()
            The function processes the query as a dictionary
            The arguments passed have the following representations
            args:
                {username (str): required,
                email (str): required,
                password (str): required,
                image_file (str): not required,
                user_phone (str): not required
                }
        
        Attributes
        ----------
        new_user_dict: dict
        parser: RequestParser
        user_parser: dict
        new_user: User

        Returns:
            json: error message, code 409
            json: success message, code 200
        """
        
        new_user_dict = {}
        parser = reqparse.RequestParser()
        parser.add_argument('username', type=str, required=True)
        parser.add_argument('email', type=str, required=True)
        parser.add_argument('password', type=str, required=True)
        parser.add_argument('image_file', type=str)
        parser.add_argument('user_phone', type=str)
        user_parser = parser.parse_args()

        for key, value in user_parser.items():
            if not value is None:
                if key == 'password':
                    new_user_dict[key] = hashpw(value.encode(), gensalt())
                elif key in ['username', 'email']:
                    test = User.query.with_entities(
                        User.username, User.email).all()
                    for username, email in test:
                        print(username, email)
                        if value not in username and value not in email:
                            print(value, 'условие на проверну нахождения в юзерах')
                            new_user_dict[key] = value
                            break
                        else:
                            return json.dumps({'massages': f'UNIQUE constraint failed:{key}:{value}'}), 409
                    else:
                        new_user_dict[key] = value
                else:
                    new_user_dict[key] = value

        new_user = User(**new_user_dict)
        db.session.add(new_user)
        db.session.commit()
        return json.dumps({'massages': 'entry added'}), 200

    def put(self, user_id):
        """ put request
        
        Note:
            The request is processed using reqparse.RequestParser()
            The function processes the query as a dictionary
            The arguments passed have the following representations
            args:
                {username (str): required,
                email (str): required,
                password (str): required,
                image_file (str): not required,
                user_phone (str): not required
                }

        Args:
            user_id (int): must be passed in the request
                the transfer of the id is implied
            
        Attributes
        ----------
        user_update: User
            this attribute will be searched in User by id
        parser: RequestParser
        user_parser: dict
        
        Returns:
            json: success message, code 200
            json: error message, code 404
        """
        user_update = db.session.query(User).get(user_id)
        parser = reqparse.RequestParser()
        parser.add_argument('username', type=str)
        parser.add_argument('email', type=str)
        parser.add_argument('password', type=str)
        parser.add_argument('image_file', type=str)
        parser.add_argument('user_phone', type=str)
        user_parser = parser.parse_args()

        if user_update:
            for key, value in user_parser.items():
                if not value is None:
                    if key == 'password':
                        user_update.key = setattr(
                            user_update, key, hashpw(value.encode(), gensalt()))
                    else:
                        user_update.key = setattr(user_update, key, value)

            db.session.add(user_update)
            db.session.commit()

            return json.dumps({'massages': 'information updated'}), 200

        else:
            return json.dumps({'massages': 'this user does not exist'}), 404

    def delete(self, user_id):
        """ delete request

        Args:
            user_id (int): must be passed in the request
                the transfer of the id is implied

        Attributes
        ----------
        user_del: User
            this attribute will be searched in User by id
        
        Returns:
            json: success message, code 200
            json: error message, code 404
        """
        
        user_del = db.session.query(User).get(user_id)
        if user_del:
            db.session.delete(user_del)
            db.session.commit()
            json.dumps({'massages': 'the user has been removed'}), 200
        else:
            return json.dumps({'massages': 'this user does not exist'}), 404