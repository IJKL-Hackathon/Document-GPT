from flask import Blueprint, request

router = Blueprint("qa", __name__)

@router.route("/qa", methods = ["GET", "POST"])
def hello():
    return request.json