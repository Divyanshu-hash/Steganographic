import os
from app.config import UPLOAD_DIR

os.makedirs(UPLOAD_DIR, exist_ok=True)

def save_file(file):
    path = f"{UPLOAD_DIR}/{file.filename}"
    with open(path, "wb") as f:
        f.write(file.file.read())
    return path
