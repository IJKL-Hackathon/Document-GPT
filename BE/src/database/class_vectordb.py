import os
from langchain_community.vectorstores.azuresearch import AzureSearch

from models import embeddings, chat_model

from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.docstore.document import Document
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from langchain_core.prompts import PromptTemplate
from bson.objectid import ObjectId
from azure.search.documents.indexes.models import (
    ScoringProfile,
    SearchableField,
    SearchField,
    SearchFieldDataType,
    SimpleField,
    TextWeights,
)

from .class_mongodb import MONGO_DB

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

template = """Use the following pieces of context to answer the question at the end.
If you don't know the answer, just say that you don't know, don't try to make up an answer.
Use three sentences maximum and keep the answer as concise as possible.
Always say answer in Vietnamese.
---------
{content}
---------
Question: {question}

Helpful Answer:"""

class VECTOR_DB:
    def __init__(self):
        self.text_splitter = RecursiveCharacterTextSplitter.from_tiktoken_encoder(chunk_size=1000, chunk_overlap=200)
        self.vs = AzureSearch(
            azure_search_endpoint=os.getenv("AZURE_SEARCH_ENDPOINT"),
            azure_search_key=os.getenv("AZURE_SEARCH_API_KEY"),
            index_name=os.getenv("INDEX_NAME"),
            embedding_function=embeddings.embed_query,
            fields=fields,
        )
        self.prompt = PromptTemplate.from_template(template)
        self.mongo = MONGO_DB()
        
        
        print("Connected VectorDB successful")
    
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
    
    def create_filter(self, user_id, file_ids = []):
        filter_condition = "source eq '" + user_id + "'"

        if not isinstance(file_ids, list):
            file_ids = [file_ids]
        
        if file_ids:
            # If file_ids is not empty, add the condition for _id in file_ids
            file_id_condition = " or ".join(["mongo_id eq '" + file_id + "'" for file_id in file_ids])
            filter_condition += " and (" + file_id_condition + ")"
        
        print(filter_condition)
        
        return filter_condition
    
    def search(self, user_id, query, file_ids = []):
        return self.vs.similarity_search_with_relevance_scores(
            query=query,
            filters = self.create_filter(user_id, file_ids),
            score_threshold=0.80,
        )
    
    def get_retriever(self, user_id, file_ids = []):
        return self.vs.as_retriever(
            search_type="similarity_score_threshold",
            search_kwargs={
                'score_threshold': 0.80,
                'filters': self.create_filter(user_id, file_ids),
            }
            
        )
    
    def format_docs(self, docs):
        result = "\n\n".join(doc.page_content for doc in docs)
        return result
    
    def create_rag_chain(self):
        return (
            {"content": RunnablePassthrough(), "question": RunnablePassthrough()}
            | self.prompt
            | chat_model
            | StrOutputParser()
        )
        
    def question(self, user_id, query, file_ids = []):
        if not isinstance(file_ids, list):
            file_ids = [file_ids]
        
        result = self.mongo.get_file(*file_ids)[0]
        
        result =  self.create_rag_chain().invoke(
            {"question": query,
            "content": result['content'],}
        )
        return result