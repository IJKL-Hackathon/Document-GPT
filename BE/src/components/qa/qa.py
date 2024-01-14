from database import mongodb, vectordb
from langchain.memory import ConversationSummaryMemory
from models import chat_model
from langchain.chains import ConversationalRetrievalChain
class CHATBOT:
    def __init__(self, user_id, file_ids):
        self.mongo = mongodb
        self.vs = vectordb
        self.memory = ConversationSummaryMemory(
            llm=chat_model, memory_key="chat_history", return_messages=True
        )
        self.qa_chain = self.create_qa(user_id, file_ids)
    
    def create_qa(self, user_id, file_ids = []):
        qa_chain = ConversationalRetrievalChain.from_llm(
            chat_model, 
            retriever=self.vs.get_retriever(user_id, file_ids), 
            memory=self.memory
        )
        
        return qa_chain

    def qa(self, req):
        query = req["query"]
        return self.qa_chain(query)['answer']