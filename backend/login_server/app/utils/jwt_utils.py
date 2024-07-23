import datetime
import jwt
import os

def create_jwt_token(user_id):
    payload = {
        "user_id": str(user_id),
        "exp": datetime.datetime.now(datetime.timezone.utc)
        + datetime.timedelta(seconds=86400),
    }
    return jwt.encode(payload, os.environ.get("JWT_SECRET"), algorithm="HS256")
