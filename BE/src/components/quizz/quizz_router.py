from flask import Blueprint, request, jsonify
from .quizz import module
import json
import uuid

data = {}

router = Blueprint("quizz", __name__)

@router.route("/quizz", methods = ["POST"])
def quizz():
    return jsonify(json.loads(module.create_quizz(request.json)))

@router.route("/quizz/history", methods = ["GET"])
def history():
    return jsonify(module.get_quizz(request.args["userId"]))

@router.route("/quizz/test", methods = ["POST"])
def test():
    return jsonify(module.test_quizz(request.json["quizzIds"]))

@router.route("/quizz/link", methods = ["POST"])
def link():
    
    id = uuid.uuid4().hex
    
    while id in data:
        id = uuid.uuid4().hex
    
    data[id] = request.json["quizzIds"]
    
    return jsonify({'id':id})

@router.route("/quizz/share", methods = ["GET"])
def share():
    uuid = request.args["id"]
    return jsonify(module.test_quizz(data[uuid]))