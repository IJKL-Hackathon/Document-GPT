from database import mongodb, vectordb

class UPLOAD:
    def __init__(self):
        self.mongo = mongodb
        self.vs = vectordb

    def upload(self, user_id, file_content, title):
        self.mongo.insert_file(
            user_id, {"content": file_content, "title": title}
        )
    def delete_file(self, file_id):
        self.mongo.delete_file(file_id)

    def getFile(self, req):
        userId = req["userId"]
        cursor = self.mongo.get_file_by_userID(userId)
        files = list(cursor)
        
        for file in files:
            file["id"] = str(file["_id"])
            del file["_id"]
            del file["content"]
            del file["user_id"]
            
        return files

    def searchFile(self, req):
        
        user_id = req["userId"]
        query = req["query"]
        
        if not query:
            return self.getFile(req)
            
        results = self.vs.search(user_id, query)
        
        results = [i[0].metadata['mongo_id'] for i in results]
        
        files = self.mongo.get_file(*results)
        
        for file in files:
            file["id"] = str(file["_id"])
            del file["_id"]
            del file["content"]
            del file["user_id"]
            
        return files

module = UPLOAD()