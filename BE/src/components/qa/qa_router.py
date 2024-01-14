from flask import Blueprint, request, jsonify
from .qa import module

router = Blueprint("qa", __name__)

USER_CHATBOT = {}

@router.route("/qa", methods = ["POST"])
def qa():
    return jsonify({"answer": module.qa(request.json)})
