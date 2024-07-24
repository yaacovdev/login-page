from datetime import timedelta
from flask import Flask
from authlib.integrations.flask_client import OAuth
from flask_cors import CORS
from .config import Config
from .database import init_db


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    app.config['SECRET_KEY'] = 'votre_cle_secrete'  # Assurez-vous que cette clé est sécurisée
    app.config['SESSION_COOKIE_SECURE'] = False  # Utilisez True en production
    app.config['SESSION_COOKIE_HTTPONLY'] = True
    app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'  # ou 'Strict' en fonction de vos besoins
    app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=5)

    CORS(app)
    oauth = OAuth(app)

    init_db(app)

    with app.app_context():
        from .routes.auth_routes import auth_bp
        app.register_blueprint(auth_bp)

    return app


app = create_app()
oauth = OAuth(app)
