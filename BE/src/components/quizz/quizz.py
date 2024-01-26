from langchain.chains import MapReduceDocumentsChain, ReduceDocumentsChain
from models import llm_model
from langchain.prompts import PromptTemplate
from langchain.chains.combine_documents.stuff import StuffDocumentsChain
from langchain.chains.llm import LLMChain
from database import vectordb, mongodb

import json


# Map
map_template = """The following is a set of documents
{docs}
Based on this list of docs, please identify the main themes
Always say answer in Vietnamese
Helpful Answer:"""

reduce_template = """The following is set of summaries:
{docs}
Give me at least 5 multiple choice questions related to the topic above. The questions should be at an mid level. Return your answer entirely in the form of a JSON object. The JSON object should have a key named "questions" which is an array of the questions. Each quiz question should include the choices, the answer, and a brief explanation of why the answer is correct. Don't include anything other than the JSON. The JSON properties of each question should be "query" (which is the question), "choices", "answer", and "explanation". The choices shouldn't have any ordinal value like A, B, C, D or a number like 1, 2, 3, 4. The answer should be the 0-indexed number of the correct choice.
Each questions, choices, answers must be unique and can not be duplicated in the quiz.
Always say answer in Vietnamese
Helpful Answer:"""
class QUIZZ:
    def __init__(self):
        self.text_splitter = vectordb.text_splitter
        self.vs = vectordb
        self.mongo = mongodb
        
        self.map_prompt = PromptTemplate.from_template(map_template)
        self.map_chain = LLMChain(llm=llm_model, prompt=self.map_prompt)

        self.reduce_prompt = PromptTemplate.from_template(reduce_template)
        self.reduce_chain = LLMChain(llm=llm_model, prompt=self.reduce_prompt)

        self.combine_documents_chain = StuffDocumentsChain(
            llm_chain=self.reduce_chain, document_variable_name="docs"
        )

        reduce_documents_chain = ReduceDocumentsChain(
            combine_documents_chain=self.combine_documents_chain,
            collapse_documents_chain=self.combine_documents_chain,
            token_max=4000,
        )

        self.map_reduce_chain = MapReduceDocumentsChain(
            llm_chain=self.map_chain,
            reduce_documents_chain=reduce_documents_chain,
            document_variable_name="docs",
            return_intermediate_steps=False,
        )

    def create_quizz(self, req):
        
        user_id = req["userId"]
        file_ids = req["fileId"]

        if not isinstance(file_ids, list):
            file_ids = [file_ids]
    
        files = self.mongo.get_file(*file_ids)
        docs = self.vs.create_documents(user_id, files, file_ids)
        result = self.map_reduce_chain.run(docs)
        
        self.mongo.insert_quizz(user_id, files[0]["title"], json.loads(result))
        
        return result

    def get_quizz(self, userid):
        results = self.mongo.get_quizz_by_userID(userid)
        results = list(results)
        
        print(len(results))
        
        quizzes = {
            "history": []
        }
        for quizz in results:
            quizzes["history"].append(
                {
                    "questions": quizz["questions"],
                    "timestamp": quizz["_id"].generation_time,
                    "name": quizz["file_name"]
                }
            )
        
        print(quizzes)
        
        return quizzes

    def test_quizz(self, quizzIds):
        quizzes = self.mongo.get_quizz(*quizzIds)
        quizz = {
            "questions": []
        }
        
        for q in quizzes:
            quizz["questions"].extend(q["questions"])
        
        return quizz

module = QUIZZ()