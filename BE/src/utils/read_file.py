import docx2txt
import fitz

def read_file(file, extension):
    if extension == "docx":
        return docx2txt.process(file)
    elif extension == "pdf":
        with fitz.open(stream=file.read(), filetype="pdf")as pdf_document:
            content = ""
            for page_number in range(pdf_document.page_count):
                page = pdf_document[page_number]
                content += page.get_text("text")
        
        return content
    else:
        return file.read().decode("utf-8")