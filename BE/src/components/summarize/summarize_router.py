from flask import Blueprint

router = Blueprint("summarize", __name__)

@router.route("/summarize", methods = ["GET"])
def hello():
    return "Hello summarize"