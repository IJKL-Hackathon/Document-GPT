import uvicorn
from fastapi import FastAPI
from dotenv import load_dotenv
import os

load_dotenv()
app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

if __name__ == '__main__':
	uvicorn.run(
        app, 
        port=int(os.getenv("PORT")), 
        host="0.0.0.0"
    )