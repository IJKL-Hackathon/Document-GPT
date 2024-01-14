import os
import pymongo
from .vectordb import vectordb
# Create database if it doesn't exist

class MONGO_DB:
    def __init__(self):
        self.client = pymongo.MongoClient(os.getenv("MONGO_STRING"))
        self.db = self.get_db(os.getenv("MONGO_DB"))
        self.collection = {
            "user": self.get_collection("user"),
            "file": self.get_collection("file")
        }
        self.vs = vectordb

    def get_db(self, db_name):
        db = self.client[db_name]
        if db_name not in self.client.list_database_names():
            # Create a database with 400 RU throughput that can be shared across
            # the DB's collections
            db.command({"customAction": "CreateDatabase", "offerThroughput": 400})
            print("Created db '{}' with shared throughput.\n".format(db_name))
            
        return db
    
    def get_collection(self, collection_name):
        collection = self.db[collection_name]
        if collection_name not in self.db.list_collection_names():
            # Creates a unsharded collection that uses the DBs shared throughput
            self.db.command(
                {"customAction": "CreateCollection", "collection": collection_name}
            )
            print("Created collection '{}'.\n".format(collection_name))
        
        return collection
    
    def get_file_by_userID(self, user_id):
        return self.collection["file"].find({"user_id": user_id})
    
    def get_file(self, *file_ids):
        cursor = self.collection["file"].find({"_id": {"$in": file_ids}})
        files = list(cursor)
        return files

    def insert_file(self, user_id, *files):
        
        inserted_ids = []
        for file in files:
            file["user_id"] = user_id
            result = self.collection["file"].insert_one(file)
            inserted_ids.append(result.inserted_ids)
        
        # self.vs.add_file(user_id, files, inserted_ids)
        
    def insert_user(self, user):
        self.collection["user"].insert_one(user)
    
    def delete_file(self, file_id):
        self.collection["file"].delete_one({"_id": file_id})
    
    def delete_user(self, user_id):
        self.collection["user"].delete_one({"_id": user_id})
        
    def get_user(self, jwt):
        return self.collection["user"].find_one({"jwt": jwt})

mongodb = MONGO_DB()

print("Connected MongoDB successful");