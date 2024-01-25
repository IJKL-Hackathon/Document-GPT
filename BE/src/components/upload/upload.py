from database import mongodb

class UPLOAD:
    def __init__(self):
        self.mongo = mongodb

    def upload(self, user_id, file_content, title):
        self.mongo.insert_file(
            user_id, {"content": file_content, "title": title}
        )
    def delete_file(self, file_id):
        self.mongo.delete_file_by_id(file_id)

    def getFile(self, req):
        userId = req["userId"]
        cursor = self.mongo.get_file_by_userID(userId)
        files = list(cursor)
        
        for file in files:
            file["id"] = str(file["_id"])
            del file["_id"]
            
        return files

module = UPLOAD()