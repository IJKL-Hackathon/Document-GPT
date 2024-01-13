from flask import Blueprint

router = Blueprint("quizz", __name__)

@router.route("/quizz", methods = ["GET"])
def hello():
    return "Hello quizz"