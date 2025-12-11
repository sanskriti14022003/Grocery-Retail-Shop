from flask import Flask, request, jsonify
from flask_cors import CORS
import products_dao
import uom_dao
import orders_dao
from sql_connection import get_sql_connection

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

connection = get_sql_connection()


# ---------------------------------------------------------------
@app.route('/getProducts', methods=['GET'])
def get_products():
    products = products_dao.get_all_products(connection)
    return jsonify(products)


# ---------------------------------------------------------------
@app.route('/getUOM', methods=['GET'])
def get_uom():
    uoms = uom_dao.get_uoms(connection)
    return jsonify(uoms)


# ---------------------------------------------------------------
@app.route('/deleteProduct', methods=['POST'])
def delete_product():
    return_id = products_dao.delete_product(connection, request.form['product_id'])
    response = jsonify({
        'product_id': return_id
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/insertProduct', methods=['POST'])
def insert_product():
    request_payload = request.form['data']
    product_id = products_dao.insert_new_product(connection, request_payload)
    response = jsonify({
        'product_id': product_id
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response



# ---------------------------------------------------------------
if __name__ == '__main__':
    app.run(port=5000, debug=True)
