from google.oauth2 import id_token
from google.auth.transport import requests
from flask import current_app

def decode_google_token(token):
    try:
        CLIENT_ID = current_app.config["GOOGLE_CLIENT_ID"]

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
        return {"message": "Invalid token"}
