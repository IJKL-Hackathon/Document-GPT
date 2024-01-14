from flask import Blueprint, request
from .upload import module
from utils.read_file import read_file
router = Blueprint("upload", __name__)

@router.route("/upload", methods = ["POST"])
def upload():
    data = request.get_json()
    
    user_id = data["userid"]
    file = data["fileupload"]
    
    file_content = read_file(file, file.filename.split('.')[-1])
    
    print(file_content[:20])
    
    return module.upload(user_id, file_content, ".".join(file.filename.split(".")[:-1]))

@router.route("/getfile", methods = ["GET"])
def getFile():
    return module.getFile(request.json)