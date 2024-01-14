from flask import Blueprint, request, jsonify
from .summarize import module

router = Blueprint("summarize", __name__)

@router.route("/summarize", methods = ["POST"])
def summarize():    
    return jsonify({"answer": module.summarize(request.json)})