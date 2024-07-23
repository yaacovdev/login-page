from pymongo.collection import Collection
from werkzeug.security import generate_password_hash, check_password_hash


class User:
    def __init__(self, collection: Collection):
        self.collection = collection

    def find_by_email(self, email: str):
        return self.collection.find_one({"email": email})

    def insert(self, email: str, password: str):
        hashed_password = generate_password_hash(password)
        return self.collection.insert_one({"email": email, "password": hashed_password})

    def check_password(self, hashed_password: str, password: str) -> bool:
        return check_password_hash(hashed_password, password)
