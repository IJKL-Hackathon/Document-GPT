import os
from langchain_openai import AzureOpenAI
from langchain_openai import AzureChatOpenAI

print(os.getenv("GPT_DEPLOY"))

llm = AzureOpenAI(
    deployment_name=os.getenv("GPT_DEPLOY"),
    model_name=os.getenv("GPT_MODEL"),
)

chat_model = AzureChatOpenAI(
    deployment_name=os.getenv("GPT_DEPLOY"),
    model_name=os.getenv("GPT_MODEL"),
)