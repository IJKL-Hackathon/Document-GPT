from flask import Blueprint, request, jsonify
from .quizz import module
import json


router = Blueprint("quizz", __name__)

@router.route("/quizz", methods = ["POST"])
def quizz():
    return jsonify(json.loads(module.quizz(request.json)))
