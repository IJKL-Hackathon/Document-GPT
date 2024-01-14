from database import mongodb

class UPLOAD:
    def __init__(self):
        self.mongo = mongodb

    def upload(self, user_id, file_content, title):
        self.mongo.insert_file(
            user_id, {"content": file_content, "title": title}
        )

    def getFile(self, req):
        userId = req["userId"]
        files = self.mongo.get_file_by_userID(userId)
        return files

module = UPLOAD()