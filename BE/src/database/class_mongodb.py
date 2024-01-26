import os
import pymongo
from bson.objectid import ObjectId
# Create database if it doesn't exist
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.docstore.document import Document
from langchain_community.vectorstores.azuresearch import AzureSearch
from models import embeddings

from azure.search.documents.indexes.models import (
    ScoringProfile,
    SearchableField,
    SearchField,
    SearchFieldDataType,
    SimpleField,
    TextWeights,
)

fields = [
    SimpleField(
        name="id",
        type=SearchFieldDataType.String,
        key=True,
        filterable=True,
    ),
    SearchableField(
        name="content",
        type=SearchFieldDataType.String,
        searchable=True,
    ),
    SearchField(
        name="content_vector",
        type=SearchFieldDataType.Collection(SearchFieldDataType.Single),
        searchable=True,
        vector_search_dimensions=len(embeddings.embed_query("Text")),
        vector_search_configuration="default",
    ),
    SearchableField(
        name="metadata",
        type=SearchFieldDataType.String,
        searchable=True,
    ),
    # Additional field to store the title
    SearchableField(
        name="title",
        type=SearchFieldDataType.String,
        searchable=True,
    ),
    # Additional field for filtering on document source
    SimpleField(
        name="source",
        type=SearchFieldDataType.String,
        filterable=True,
    ),
    SimpleField(
        name="mongo_id",
        type=SearchFieldDataType.String,
        filterable=True,
    ),
]

class MONGGO_VECTOR_DB:
    def __init__(self):
        self.text_splitter = RecursiveCharacterTextSplitter.from_tiktoken_encoder(chunk_size=1000, chunk_overlap=200)
        self.vs = AzureSearch(
            azure_search_endpoint=os.getenv("AZURE_SEARCH_ENDPOINT"),
            azure_search_key=os.getenv("AZURE_SEARCH_API_KEY"),
            index_name=os.getenv("INDEX_NAME"),
            embedding_function=embeddings.embed_query,
            fields=fields,
        )
    
    def create_documents(self, user_id, files, file_ids):
        documents = []
        
        for file_id, file in zip(file_ids, files):
            document = Document(
                    page_content=file["content"],
                    metadata = {
                        "source": user_id,
                        "title": file["title"],
                        "mongo_id": str(file_id)
                    }
                )
            
            documents.append(document)
        
        docs = self.text_splitter.split_documents(documents)
        return docs
    
    def add_file(self, user_id, file, file_id):
        docs = self.create_documents(user_id, [file], [file_id])
        self.vs.add_documents(documents=docs)

class MONGO_DB:
    def __init__(self):
        self.client = pymongo.MongoClient(os.getenv("MONGO_STRING"))
        self.db = self.get_db(os.getenv("MONGO_DB"))
        self.collection = {
            "user": self.get_collection("user"),
            "file": self.get_collection("file"),
            "quizz": self.get_collection("quizz"),
        }
        self.vs = MONGGO_VECTOR_DB()
        
        
        print("Connected MongoDB successful")

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
    
    def get_quizz_by_userID(self, user_id):
        return self.collection["quizz"].find({"user_id": user_id})
    
    def get_file(self, *file_ids):
        obj_ids = [ObjectId(ids) for ids in file_ids]

        cursor = self.collection["file"].find({"_id": {"$in": obj_ids}})
        files = list(cursor)
        return files

    def get_quizz(self, *quizz_ids):
        obj_ids = [ObjectId(ids) for ids in quizz_ids]

        cursor = self.collection["quizz"].find({"_id": {"$in": obj_ids}})
        quizzes = list(cursor)
        return quizzes

    def insert_quizz(self, user_id, file_name, quizz):
        
        quizz["user_id"] = user_id
        quizz["file_name"] = file_name
        self.collection["quizz"].insert_one(quizz)
    
    def insert_file(self, user_id, file):
        
        file["user_id"] = user_id
        inserted_id = self.collection["file"].insert_one(file).inserted_id

        print(inserted_id)
        
        self.vs.add_file(user_id, file, inserted_id)
        
    def insert_user(self, user):
        self.collection["user"].insert_one(user)
    
    def delete_file(self, file_id):
        self.collection["file"].delete_one({"_id": file_id})
    
    def delete_user(self, user_id):
        self.collection["user"].delete_one({"_id": user_id})
        
    def get_user(self, jwt):
        return self.collection["user"].find_one({"jwt": jwt})

