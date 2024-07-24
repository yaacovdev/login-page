from flask import Blueprint, request, jsonify, redirect, url_for, session, current_app
from authlib.integrations.flask_client import OAuth
import requests
from app.utils.jwt_utils import create_jwt_token
from app.utils.google_utils import decode_google_token
from app.models import User

auth_bp = Blueprint("auth", __name__)

oauth = OAuth(current_app)
google = oauth.register(
    name="google",
    client_id=current_app.config["GOOGLE_CLIENT_ID"],
    client_secret=current_app.config["GOOGLE_CLIENT_SECRET"],
    authorize_url="https://accounts.google.com/o/oauth2/auth",
    authorize_params=None,
    access_token_url="https://accounts.google.com/o/oauth2/token",
    access_token_params=None,
    refresh_token_url=None,
    redirect_uri="http://localhost:5000/auth/google",
    client_kwargs={"scope": "email profile"},
    server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
)
facebook = oauth.register(
    name="facebook",
    client_id=current_app.config["FACEBOOK_CLIENT_ID"],
    client_secret=current_app.config["FACEBOOK_CLIENT_SECRET"],
    authorize_url="https://www.facebook.com/v10.0/dialog/oauth",
    authorize_params=None,
    access_token_url="https://graph.facebook.com/v10.0/oauth/access_token",
    access_token_params=None,
    refresh_token_url=None,
    redirect_uri="http://localhost:5000/auth/login/facebook",
    client_kwargs={"scope": "public_profile"},
)


@auth_bp.route("/auth/login/google")
def auth_google():

    redirect_uri = url_for("auth.authorize", _external=True)
    return google.authorize_redirect(redirect_uri, prompt="select_account")


@auth_bp.route("/oauth2callback")
def authorize():
    token = oauth.google.authorize_access_token()
    decoded_info = decode_google_token(token["id_token"])
    print(decoded_info)
    user_info = {
        "email": decoded_info["email"],
        "name": decoded_info["name"],
        "sub": decoded_info["user_id"],
    }

    users_collection = current_app.db.users
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


@auth_bp.route("/auth/login/facebook")
def auth_facebook():
    redirect_uri = url_for("auth.authorize_facebook", _external=True)
    return facebook.authorize_redirect(redirect_uri, prompt="select_account")


@auth_bp.route("/oauth2callback/facebook")
def authorize_facebook():
    token = oauth.facebook.authorize_access_token()
    resp = oauth.facebook.get("https://graph.facebook.com/me?fields=id,name,email", token=token)
    user_info = resp.json()
    print(user_info)

    # Connexion à MongoDB

    users_collection = current_app.db.users

    # Vérifiez si l'utilisateur existe déjà et insérez si ce n'est pas le cas
    user = users_collection.find_one({"email": user_info["email"]})
    if not user:
        users_collection.insert_one(
            {
                "email": user_info["email"],
                "name": user_info["name"],
                "facebook_id": user_info["id"],
            }
        )

    # Créez un token JWT pour l'utilisateur
    jwt_token = create_jwt_token(user_info["id"])

    return jsonify(token=jwt_token)


@auth_bp.route("/auth/logout")
def logout():
    if "token" in session:
        token = session["token"]["access_token"]
        requests.post(
            "https://accounts.google.com/o/oauth2/revoke",
            params={"token": token},
            headers={"content-type": "application/x-www-form-urlencoded"},
        )
    session.clear()
    return jsonify({"message": "Logout successful"})


@auth_bp.route("/auth/register", methods=["POST"])
def register():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    users_collection = current_app.db.users
    print(users_collection.find_one({"email": email}))

    if users_collection.find_one({"email": email}):
        return jsonify({"message": "User already exists"}), 209

    user_model = User(users_collection)
    user_model.insert(email, password)
    return jsonify({"message": "User registered successfully"}), 201


@auth_bp.route("/auth/login", methods=["POST"])
def login_email_password():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    users_collection = current_app.db.users
    user = users_collection.find_one({"email": email})
    user_model = User(users_collection)

    if user and user_model.check_password(user.get("password", ""), password):
        token = create_jwt_token(user["_id"])
        return jsonify({"message": "Login successful", "token": token}), 200

    return jsonify({"message": "Invalid email or password"}), 209
