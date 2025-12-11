from sql_connection import get_sql_connection

# ===============================
# FETCH ALL PRODUCTS
# ===============================
def get_all_products(connection):
    cursor = connection.cursor()

    query = (
        "SELECT products.product_id, products.product_name, products.uom_id, "
        "products.price_per_unit, uom.uom_name "
        "FROM products "
        "INNER JOIN uom ON products.uom_id = uom.uom_id"
    )

    cursor.execute(query)

    response = []

    for (product_id, product_name, uom_id, price_per_unit, uom_name) in cursor:
        response.append({
            'product_id': product_id,
            'product_name': product_name,
            'uom_id': uom_id,
            'price_per_unit': price_per_unit,
            'uom_name': uom_name
        })

    return response


# ===============================
# INSERT NEW PRODUCT
# ===============================
def insert_product(connection, product_name, uom_id, price_per_unit):
    cursor = connection.cursor()
    query = """
        INSERT INTO products (product_name, uom_id, price_per_unit)
        VALUES (%s, %s, %s)
    """
    cursor.execute(query, (product_name, uom_id, price_per_unit))
    connection.commit()
    cursor.close()
    return True

def update_product(connection, product_id, product_name, uom_id, price_per_unit):
    cursor = connection.cursor()
    query = """
        UPDATE products
        SET product_name = %s,
            uom_id = %s,
            price_per_unit = %s
        WHERE product_id = %s
    """
    cursor.execute(query, (product_name, uom_id, price_per_unit, product_id))
    connection.commit()
    cursor.close()
    return True


def delete_product(connection, product_id):
    cursor = connection.cursor()
    query = "DELETE FROM products WHERE product_id = %s"
    cursor.execute(query, (product_id,))
    connection.commit()
    cursor.close()
    return True
