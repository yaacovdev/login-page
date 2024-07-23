import datetime
import os
from flask import Flask, jsonify, redirect, request, url_for, session
from authlib.integrations.flask_client import OAuth
from flask_cors import CORS
from pymongo import MongoClient
import bcrypt
import jwt
from google.oauth2 import id_token
from google.auth.transport import requests


JWT_ALGORITHM = "HS256"
JWT_EXP_DELTA_SECONDS = 86400


def create_jwt_token(user_id):
    payload = {
        "user_id": str(user_id),
        "exp": datetime.datetime.now(datetime.UTC)
        + datetime.timedelta(seconds=JWT_EXP_DELTA_SECONDS),
    }
    return jwt.encode(payload, os.environ.get("JWT_SECRET"), algorithm=JWT_ALGORITHM)


app = Flask(__name__)
app.secret_key = "your_secret_key"
oauth = OAuth(app)
CORS(app)

client: MongoClient = MongoClient("mongodb://localhost:27017/")
db = client.login_server
users_collection = db.users

google = oauth.register(
    name="google",
    client_id=os.environ.get("GOOGLE_CLIENT_ID"),
    client_secret=os.environ.get("GOOGLE_CLIENT_SECRET"),
    authorize_url="https://accounts.google.com/o/oauth2/auth",
    authorize_params=None,
    access_token_url="https://accounts.google.com/o/oauth2/token",
    access_token_params=None,
    refresh_token_url=None,
    redirect_uri="http://localhost:5000/auth/google",
    client_kwargs={"scope": "email profile"},
    server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
)


def decode_google_token(token):
    try:
        CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID")

        idinfo = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)

        user_id = idinfo["sub"]
        email = idinfo["email"]
        name = idinfo.get("name", "")

        return {
            "user_id": user_id,
            "email": email,
            "name": name,
        }
    except ValueError:
        return jsonify({"message": "Invalid token"}), 400


@app.route("/auth/login/google")
def auth_google():
    redirect_uri = url_for("authorize", _external=True)
    return google.authorize_redirect(redirect_uri, prompt="select_account")


@app.route("/oauth2callback")
def authorize():
    token = oauth.google.authorize_access_token()
    decoded_info = decode_google_token(token["id_token"])
    user_info = {
        "email": decoded_info["email"],
        "name": decoded_info["name"],
        "sub": decoded_info["user_id"],
    }

    existing_user = users_collection.find_one({"email": user_info["email"]})

    if not existing_user:
        users_collection.insert_one(
            {
                "sub": user_info["sub"],
                "email": user_info["email"],
                "name": user_info["name"],
            }
        )
    else:
        users_collection.update_one(
            {"email": user_info["email"]}, {"$set": {"google_id": user_info["sub"]}}
        )

    return f"""
    <script>
        window.opener.postMessage({{JWT: JSON.stringify('{token['access_token']}')}}, 'http://localhost:3000');
        window.close();
    </script>
    """


@app.route("/auth/logout")
def logout():
    if "token" in session:
        token = session["token"]["access_token"]
        requests.post(
            "https://accounts.google.com/o/oauth2/revoke",
            params={"token": token},
            headers={"content-type": "application/x-www-form-urlencoded"},
        )
    session.clear()
    return redirect("http://localhost:3000")


@app.route("/auth/register", methods=["POST"])
def register():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if users_collection.find_one({"email": email}):
        return jsonify({"message": "User already exists"}), 400

    hashed_password = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
    users_collection.insert_one({"email": email, "password": hashed_password})
    return jsonify({"message": "User registered successfully"}), 201


@app.route("/auth/login", methods=["POST"])
def login_email_password():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    user = users_collection.find_one({"email": email})
    if user and bcrypt.checkpw(password.encode("utf-8"), user["password"]):
        token = create_jwt_token(user["_id"])
        return jsonify({"message": "Login successful", "token": token}), 200

    return jsonify({"message": "Invalid email or password"}), 401


if __name__ == "__main__":
    app.run(debug=True)
