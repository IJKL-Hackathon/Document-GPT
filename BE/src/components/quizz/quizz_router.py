from flask import Blueprint, request, jsonify
from .quizz import module
import json
import uuid
from database import mongodb

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
    
    while not mongodb.check_share_id_valid(id):
        id = uuid.uuid4().hex
    
    mongodb.insert_share(id, request.json["quizzIds"])
    
    return jsonify({'id':id})

@router.route("/quizz/share", methods = ["GET"])
def share():
    id = request.args["id"]
    return jsonify(module.test_quizz_id(id))