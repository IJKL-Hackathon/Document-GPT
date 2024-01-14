from flask import Blueprint, request
from .upload import module
from utils.read_file import read_file
router = Blueprint("upload", __name__)

@router.route("/upload", methods = ["POST"])
def upload():
    file = request.files['file']
    file_content = read_file(file, file.filename.split('.')[-1])
    
    print(file_content[:20])
    
    return module.upload(file_content)