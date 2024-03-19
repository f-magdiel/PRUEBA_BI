from werkzeug.security import generate_password_hash, check_password_hash
from flask import Flask
from config import PORT
from routes.routes_usuarios import usuarios
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.register_blueprint(usuarios, url_prefix="/api")

if __name__ == '__main__':
    app.run(debug=True, port=PORT, host='0.0.0.0')