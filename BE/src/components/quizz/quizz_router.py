from flask import Blueprint, request
from .quizz import module

router = Blueprint("quizz", __name__)

@router.route("/quizz", methods = ["GET"])
def quizz():
    return module.quizz(request.json)
