from dotenv import load_dotenv
import os
load_dotenv()

import models
from database import vectordb, mongodb

from flask import Flask
from flask_cors import CORS
import routers

app = Flask(__name__)
CORS(app)

app.register_blueprint(routers.api)

if __name__ == '__main__':
    app.run(
        host="0.0.0.0", 
        port=int(os.environ.get("PORT", 8080)),
        debug=True
    )