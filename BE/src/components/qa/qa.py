from database import mongodb, vectordb
class CHATBOT:
    def __init__(self):
        self.mongo = mongodb
        self.vs = vectordb

    def qa(self, req):
        return self.vs.question(req["userId"], req["query"], req["fileId"])
    
module = CHATBOT()