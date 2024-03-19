from flask import g, current_app
import mysql.connector
from config import DB_NAME, DB_USR, DB_PASS, DB_HOST

def obtener_db():
    if 'db' not in g:
        DATABASE = {
            'host': DB_HOST,
            'user': DB_USR,
            'password': DB_PASS,
            'database': DB_NAME
        }
        g.db = mysql.connector.connect(**DATABASE)
    
    return g.db

def cerrar_db(exception):
    db = g.pop('db', None)
    if db is not None:
        db.close()
