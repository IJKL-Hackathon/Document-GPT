from langchain.chains import MapReduceDocumentsChain, ReduceDocumentsChain
from models import llm_model
from langchain.prompts import PromptTemplate
from langchain.chains.combine_documents.stuff import StuffDocumentsChain
from langchain.chains.llm import LLMChain
from database import vectordb, mongodb

# Map
map_template = """The following is a set of documents
{docs}
Based on this list of docs, please identify the main themes
Always say answer in Vietnamese.
Helpful Answer:"""

reduce_template = """The following is set of summaries:
{docs}
Take these and distill it into a final, consolidated summary of the main themes. 
Always say answer in Vietnamese.
Helpful Answer:"""
class SUMMARIZE:
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

    def summarize(self, req):
        
        user_id = req["user_id"]
        file_ids = req["file_ids"]

        files = self.mongo.get_file(*file_ids)
        docs = self.vs.create_documents(user_id, files, file_ids)
        return self.map_reduce_chain.run(docs)

module = SUMMARIZE()