from flask import Blueprint, request
from utils.preprocessing import tien_xu_li
from components import qa, quizz, summarize, upload
from database import mongodb

api = Blueprint("api", __name__)
url_prefix = '/api'

@api.before_request
def preprocessing():
    if not request.is_json:
        return
    
    if not request.method == "POST":
        return
    
    if "query" in request.json:
        request.json["query"] = tien_xu_li(request.json["query"])

api.register_blueprint(qa.router, url_prefix=url_prefix)
api.register_blueprint(quizz.router, url_prefix=url_prefix)
api.register_blueprint(summarize.router, url_prefix=url_prefix)
api.register_blueprint(upload.router, url_prefix=url_prefix)

import jwt

@api.route("/api/register", methods = ["POST"])
def register():
    
    form = request.get_json()
    
    fullname = form["signupFullname"]
    email = form["signupEmail"]
    password = form["signupPassword"]
    
    key = "secret"
    encoded = jwt.encode({
            "email": email,
            "password": password
        }, key, algorithm="HS256")
    
    mongodb.insert_user({
        "fullname": fullname,
        "email": email,
        "password": password,
        "jwt": encoded
    })
    
    return {"jwt": encoded}

@api.route("/api/users/profile", methods = ["GET"])
def profile():
    
    auth_header = request.headers.get('Authorization')
    token = auth_header.split(" ")[1]
    
    user = mongodb.get_user(token)
    user["id"] = str(user["_id"])
    
    del user["_id"]
    
    return user

@api.route("/api/login", methods = ["POST"])
def login():
    
    form = request.get_json()
    
    email = form["loginEmail"]
    password = form["loginPassword"]
    
    key = "secret"
    encoded = jwt.encode({
            "email": email,
            "password": password
        }, key, algorithm="HS256")
    
    user = mongodb.get_user(encoded)
    
    if user:
        return {"jwt": encoded}
    
    return 400
    