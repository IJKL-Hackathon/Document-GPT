from flask import Blueprint, request
from .summarize import module

router = Blueprint("summarize", __name__)

@router.route("/summarize", methods = ["POST"])
def summarize():
    return module.summarize(request.json)