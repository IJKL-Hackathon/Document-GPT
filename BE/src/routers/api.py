from flask import Blueprint, request
from utils.preprocessing import tien_xu_li
from components import qa, quizz, summarize, upload

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
    elif "file" in request.json:
        for k, v in request.json["file"].items():
            request.json["file"][k] = tien_xu_li(v)

api.register_blueprint(qa.router, url_prefix=url_prefix)
api.register_blueprint(quizz.router, url_prefix=url_prefix)
api.register_blueprint(summarize.router, url_prefix=url_prefix)
api.register_blueprint(upload.router, url_prefix=url_prefix)