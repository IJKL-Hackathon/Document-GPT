import os
# from langchain_openai import AzureOpenAI
from langchain_openai import AzureChatOpenAI
from langchain_openai import AzureOpenAIEmbeddings
# from langchain.llms.openai import AzureOpenAI
from langchain.chat_models import AzureChatOpenAI as AzureChat
from langchain.globals import set_verbose, set_debug

set_debug(True)
set_verbose(True)

llm_model = AzureChat(
    deployment_name=os.getenv("GPT_DEPLOY"),
    model=os.getenv("GPT_MODEL"),
    temperature=0
)

# llm_model = AzureOpenAI(
#     deployment_name=os.getenv("GPT_DEPLOY"),
#     model_name=os.getenv("GPT_MODEL"),
#     temperature=0
# )

chat_model = AzureChatOpenAI(
    deployment_name=os.getenv("GPT_DEPLOY"),
    model_name=os.getenv("GPT_MODEL"),
    temperature=0
)

print("Created " + os.getenv("GPT_MODEL") + " successfully.")

embeddings = AzureOpenAIEmbeddings(
    deployment=os.getenv("ADA_DEPLOY"), 
    model=os.getenv("ADA_MODEL"),
    chunk_size=1
)

print("Created " + os.getenv("ADA_MODEL") + " successfully.")