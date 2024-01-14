from flask import Blueprint, request
from .qa import CHATBOT

router = Blueprint("qa", __name__)

USER_CHATBOT = {}

@router.route("/qa", methods = ["GET", "POST"])
def qa():
    
    user_id = request.json["user_id"]
    
    if user_id not in USER_CHATBOT:
        USER_CHATBOT[user_id] = CHATBOT(user_id, request.json["file_ids"])
    
    return USER_CHATBOT[user_id].qa(request.json)
