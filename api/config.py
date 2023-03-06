from flask import Flask, request, jsonify, g
from flask_cors import CORS
import pymysql.cursors
import json
import sys
from dotenv import dotenv_values

app = Flask(__name__)
CORS(app)

env = dotenv_values("/run/secrets/flask.env")
if env is None:
    print("This is run without docker")
    sys.exit(1)

mysql_host = env["FLASK_MYSQL_HOST"]
mysql_port = env["FLASK_MYSQL_PORT"]

if mysql_port is None:
    print("No FLASK_MYSQL_PORT env variable set")
else:
    mysql_port = int(mysql_port)

mysql_user = env["FLASK_MYSQL_USER"];
mysql_user_password = open("/run/secrets/mysql_user_password").readline().rstrip()

mysql_database = env["FLASK_MYSQL_DATABASE"]



def connect_db():
    #conv = converters.conversions.copy()
    #conv[246]=float
    return pymysql.connect(
        host=mysql_host,
        port=mysql_port,
        user=mysql_user,
        password=mysql_user_password,
        db=mysql_database,
        autocommit=True,
        charset='utf8mb4',
        #conv=conv,
        cursorclass=pymysql.cursors.DictCursor
    )

def get_db():
    '''Opens a new database connection per request.'''        
    if not hasattr(g, 'db'):
        g.db = connect_db()
    return g.db    

@app.teardown_appcontext
def close_db(error):
    '''Closes the database connection at the end of request.'''    
    if hasattr(g, 'db'):
        g.db.close()    


