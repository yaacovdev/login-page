from flask import Flask
from authlib.integrations.flask_client import OAuth
from flask_cors import CORS
from .config import Config
from .database import init_db


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app)
    oauth = OAuth(app)

    init_db(app)

    with app.app_context():
        from .routes.auth_routes import auth_bp
        app.register_blueprint(auth_bp)

    return app


app = create_app()
oauth = OAuth(app)
