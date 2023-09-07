""" 
Module for interaction between the client and the Product table
"""

from website.models import Product
from .. import db
from flask_restful import Resource, reqparse
import json



class ProductInfo(Resource):
    def get(self, prod_id=None):
        """ get request

        Attributes
        ----------
        all_product: list
            Product.query.all
        data: dict
            
        Returns:
            json: full information from the Product class
        """
        if prod_id:
            all_product = Product.query.filter_by(id=prod_id).first()
            if all_product:
                data = json.dumps({all_product.id:all_product.to_dict()}, indent=4, sort_keys=True, default=str, ensure_ascii=False)
            else:
                return json.dumps({'massages': 'product not found'}), 404
        else:
            all_product = Product.query.all()
            data = json.dumps({prod.id: prod.to_dict() for prod in all_product}, indent=4, sort_keys=True, default=str, ensure_ascii=False)

        return data, 200

    def post(self):
        # чисто для теорииб, тк в реале товары буду добовляться лишь через админку
        """ post request

        Note:
            The request is processed using reqparse.RequestParser()
            The function processes the query as a dictionary
            The arguments passed have the following representations
            args:
                {title (str): required,
                prise (int): required,
                discount (int): not required,
                filter_category (str): required,
                category (str): required,
                img_file (str): not required
                }
        
        Attributes
        ----------
        parser: RequestParser
        new_prod: dict
        product: Product

        Returns:
            json: success message, code 200
        """
        parser = reqparse.RequestParser()
        parser.add_argument('title', type=str, required=True)
        parser.add_argument('prise', type=int, required=True)
        parser.add_argument('discount', type=int)
        parser.add_argument('filter_category', type=str, required=True)
        parser.add_argument('category', type=str, required=True)
        parser.add_argument('img_file', type=str)
        new_prod = parser.parse_args()
        product = Product(**new_prod)
        # os.path.isdir
        db.session.add(product)
        db.session.commit()

        return json.dumps(new_prod, indent=4, sort_keys=True, default=str, ensure_ascii=False), 200

    def put(self, prod_id):
        """ put request
        
        Note:
            The request is processed using reqparse.RequestParser()
            The function processes the query as a dictionary
            The arguments passed have the following representations
            args:
                {isActive (bool): not required,
                buy (bool): not required,
                basket (int): not required,
                buy_id (int): not required
                }

        Args:
            prod_id (int): must be passed in the request
                the transfer of the id is implied
            
        Attributes
        ----------
        put_prod: Product
            this attribute will be searched in Product by id
        parser: RequestParser
        resul_parser: dict
        
        Returns:
            json: success message, code 200
            json: error message, code 404
        """
        
        put_prod = db.session.query(Product).get(prod_id)
        parser = reqparse.RequestParser()
        parser.add_argument('isActive', type=bool)
        parser.add_argument('buy', type=bool)
        parser.add_argument('basket', type=int)
        parser.add_argument('buy_id', type=int)
        resul_parser = parser.parse_args()
        if put_prod:
            for key, value in resul_parser.items():
                if not value is None:
                    put_prod.key = setattr(put_prod, key, value)
            db.session.add(put_prod)
            db.session.commit()
            return json.dumps(resul_parser), 200
        else:
            return json.dumps({'massages': 'product not found'}), 404

    def delete(self, prod_id):
        """ delete request

        Args:
            prod_id (int): must be passed in the request
                the transfer of the id is implied

        Attributes
        ----------
        put_prod: Product
            this attribute will be searched in Product by id
        
        Returns:
            json: success message, code 200
            json: error message, code 404
        """
        put_prod = db.session.query(Product).get(prod_id)
        if put_prod:
            db.session.delete(put_prod)
            db.session.commit()
            return json.dumps({'massages': 'the product has been removed'}), 200
        
        else:
            return json.dumps({'massages': 'product not found'}), 404