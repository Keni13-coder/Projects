from website.models import BuyProductUser, Product
from .. import db
from flask_restful import Resource, reqparse
import json


class BuyProductUserInfo(Resource):

    def get(self):
        """ get request

        Attributes
        ----------
        prod_info: list
            Product.query.all()
        buy_info: list
            BuyProductUser.query.all()
        full_info: dict
            contains information about the user's purchases
        
        Returns:
            json: full information from the Product class
        """
        prod_info = Product.query.all()
        buy_info = BuyProductUser.query.all()
        full_info = json.dumps({buy.id: {'user_id': buy.user_id, 'summa': buy.summa, 'time': buy.time, 'buy_prod': {prod.id: prod.to_dict(
        ) for prod in prod_info if buy.order_number == prod.buy_order}} for buy in buy_info}, indent=4, default=str, ensure_ascii=False)
        
        return full_info, 200

    def post(self):
        """ post request

        Note:
            The request is processed using reqparse.RequestParser()
            The function processes the query as a dictionary
            The arguments passed have the following representations
            args:
                {user_id (int): required,
                summa (int): required,
                buy_prod (dict): required
                }
        
        Attributes
        ----------
        parser: RequestParser
        prod: dict
        place_buy_prod: dict
        product: BuyProductUser
        product_changes: Product
            does overwriting of columns in the table through the received data from buy_prod
        Returns:
            json: error message, code 404
            function: returns the get function of the BuyProductUserInfo class
        """
        parser = reqparse.RequestParser()
        parser.add_argument('user_id', type=int, required=True)
        parser.add_argument('summa', type=int, required=True)
        parser.add_argument('buy_prod', type=dict, required=True)
        parser_buy = parser.parse_args()
        place_buy_prod = {}
        prod = {}
        for key, value in parser_buy.items():
            if key == 'buy_prod':
                prod = value
            else:
                place_buy_prod[key] = value

        place_opder = BuyProductUser(**place_buy_prod)

        for id, values in prod.items():
            product_changes = db.session.query(Product).get(id)
            if product_changes:
                for key, value in values.items():
                    product_changes.key = setattr(product_changes, key, value)

            else:
                return json.dumps({'massages': 'product not found'}), 404

        db.session.add_all([product_changes, place_opder])
        db.session.commit()
        return self.get()

    def delete(self, buy_prod_id):
        """ delete request

        Args:
            buy_prod_id (int): must be passed in the request
                the transfer of the id is implied

        Attributes
        ----------
        del_order: BuyProductUser
            this attribute will be searched in BuyProductUser by id
        
        Returns:
            function: returns the get function of the BuyProductUserInfo class
            json: error message, code 404
        """
        del_order = db.session.query(BuyProductUser).get(buy_prod_id)
        if del_order:
            db.session.delete(del_order)
            db.session.commit()
            return self.get()
        else:
            return json.dumps({'massages': 'there is no order'}), 404
