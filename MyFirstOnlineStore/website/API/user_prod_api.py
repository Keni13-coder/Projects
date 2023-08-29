""" 
Module for interaction between the client and the UserProduct table
"""

from website.models import UserProduct
from .. import db
from flask_restful import Resource, reqparse
import json


class UserProductInfo(Resource):

    def get(self):
        """ get request

        Attributes
        ----------
        user_prod: list
            UserProduct.query.all
            user_prod: dict
            
        Returns:
            json: full information from the UserProduct class
        """
        user_prod = UserProduct.query.all()
        user_prod = {us_pd.id: {'user_id': us_pd.user_id,
                                'product_id': us_pd.product_id, 'like': us_pd.like} for us_pd in user_prod}

        return json.dumps(user_prod, indent=4, sort_keys=True, default=str, ensure_ascii=False)

    def post(self):
        """ post request

        Note:
            The request is processed using reqparse.RequestParser()
            The function processes the query as a dictionary
            The arguments passed have the following representations
            args:
                {user_id (int): required
                product_id (int): required
                like (bool): not required
                }
        
        Attributes
        ----------
        parser: RequestParser
        parser_user_prod: dict
        new_user_prod: UserProduct

        Returns:
            json: success message, code 200
        """
        
        parser = reqparse.RequestParser()
        parser.add_argument('user_id', type=int, required=True)
        parser.add_argument('product_id', type=int, required=True)
        parser.add_argument('like', type=bool)

        parser_user_prod = parser.parse_args()
        new_user_prod = UserProduct(**parser_user_prod)

        db.session.add(new_user_prod)
        db.session.commit()

        return json.dumps({'massages': 'the user\'s product has been created'}), 200

    def put(self, user_prod_id):
        """ put request
        
        Note:
            The request is processed using reqparse.RequestParser()
            The function processes the query as a dictionary
            The arguments passed have the following representations
            args:
                {like (bool): required}

        Args:
            user_prod_id (int): must be passed in the request
                the transfer of the id is implied
            
        Attributes
        ----------
        like_changes: UserProduct
            this attribute will be searched in UserProduct by id
        parser: RequestParser
        parser_like: dict
        
        Returns:
            json: returns a modified object dict
            json: error message, code 404
        """
        like_changes = db.session.query(UserProduct).get(user_prod_id)
        parser = reqparse.RequestParser()
        parser.add_argument('like', type=bool, required=True)
        parser_like = parser.parse_args()
        if like_changes:
            for _, value in parser_like.items():
                like_changes.like = value
            
            db.session.add(like_changes)
            db.session.commit()
            
            return json.dumps({like_changes.id: {'user_id': like_changes.user_id, 
                                                'product_id': like_changes.product_id, 
                                                'like': like_changes.like}}, indent=4, sort_keys=True, default=str, ensure_ascii=False), 200
        else:
            return json.dumps({'massages': 'position not found'}), 404
        
        
    def delete(self, user_prod_id):
        """ delete request

        Args:
            user_prod_id (int): must be passed in the request
                the transfer of the id is implied

        Attributes
        ----------
        del_user_prod: UserProduct
            this attribute will be searched in UserProduct by id
        
        Returns:
            json: success message, code 200
            json: error message, code 404
        """
        del_user_prod = db.session.query(UserProduct).get(user_prod_id)
        if del_user_prod:
            
            db.session.delete(del_user_prod)
            db.session.commit()
            return json.dumps({'massages': 'the user_product has been removed'}), 200
        
        else:
            return json.dumps({'massages': 'user_product not found'}), 404