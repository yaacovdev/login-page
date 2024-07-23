from pymongo import MongoClient


def init_db(app):
    client = MongoClient(app.config["MONGO_URI"])
    app.db = client.get_default_database()
