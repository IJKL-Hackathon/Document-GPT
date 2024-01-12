import os
from dotenv import load_dotenv
load_dotenv()

from langchain_openai import AzureOpenAI

from langchain.callbacks import get_openai_callback
from langchain_openai import AzureChatOpenAI
from langchain.schema import HumanMessage
from langchain_core.output_parsers import StrOutputParser

llm = AzureOpenAI(
    deployment_name=os.getenv("GPT_DEPLOY"),
    model_name=os.getenv("GPT_MODEL"),
)

print(llm)

model = AzureChatOpenAI(
    deployment_name=os.getenv("GPT_DEPLOY"),
    model_name=os.getenv("GPT_MODEL"),
)

print(model)
output_parser = StrOutputParser()
chain = model | output_parser

result = chain.invoke("Translate this sentence from English to Vietnamese. I love programming")
print(result)

