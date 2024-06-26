from flask import Blueprint, request, jsonify
from .upload import module
from utils.read_file import read_file
router = Blueprint("upload", __name__)

@router.route("/upload", methods = ["POST"])
def upload():

    user_id = request.form["userid"]
    file = request.files["file"]
    
    
    file_content = read_file(file, file.filename.split('.')[-1])
    
    print(file_content[:20])
    
    module.upload(user_id, file_content, ".".join(file.filename.split(".")[:-1]))
    
    return "",200
    
@router.route("/getfile", methods = ["GET"])
def getFile():
    result = module.getFile(request.args)
    return jsonify(result)

@router.route("/deleteFile", methods=['POST'])
def delete_file():
    module.delete_file(request.json['fileId'])
    return jsonify({"message": "File deleted successfully"}), 200

@router.route("/searchFile", methods=['POST'])
def search_file():
    result = module.searchFile(request.json)
    return jsonify(result)