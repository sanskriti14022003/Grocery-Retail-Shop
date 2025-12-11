import mysql.connector

connection = None

def get_sql_connection():
    global connection
    if connection is None:
        connection = mysql.connector.connect(
    host="127.0.0.1",
    user="root",
    password="S@n8839496570",
    database="gs",
    port=3306,
    auth_plugin='mysql_native_password'
)
    return connection
