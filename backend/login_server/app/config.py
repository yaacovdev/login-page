import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY", "your_secret_key")
    MONGO_URI = os.environ.get("MONGO_URI", "mongodb://localhost:27017/login_server")
    JWT_SECRET = os.environ.get("JWT_SECRET")
    GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID")
    GOOGLE_CLIENT_SECRET = os.environ.get("GOOGLE_CLIENT_SECRET")
    FACEBOOK_CLIENT_ID = os.environ.get("FACEBOOK_CLIENT_ID")
    FACEBOOK_CLIENT_SECRET = os.environ.get("FACEBOOK_CLIENT_SECRET")
    JWT_ALGORITHM = "HS256"
    JWT_EXP_DELTA_SECONDS = 86400
