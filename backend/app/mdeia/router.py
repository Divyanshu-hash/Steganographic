from fastapi import APIRouter, UploadFile, File
from fastapi.responses import FileResponse
from media.storage import save_file
from stego.text_image import encode_text
from stego.image_image import encode_image
from stego.audio_image import encode_audio

router = APIRouter(prefix="/media", tags=["Media"])

@router.post("/encode/text")
def text_to_image(image: UploadFile = File(...), text: str = ""):
    img_path = save_file(image)
    out = f"uploads/encoded_{image.filename}"
    encode_text(img_path, text, out)
    return {"download": f"/media/download/{out}"}

@router.post("/encode/image")
def image_to_image(carrier: UploadFile = File(...), hidden: UploadFile = File(...)):
    c = save_file(carrier)
    h = save_file(hidden)
    out = f"uploads/encoded_{carrier.filename}"
    encode_image(c, h, out)
    return {"download": f"/media/download/{out}"}

@router.post("/encode/audio")
def audio_to_image(image: UploadFile = File(...), audio: UploadFile = File(...)):
    img = save_file(image)
    aud = save_file(audio)
    out = f"uploads/encoded_{image.filename}"
    encode_audio(img, aud, out)
    return {"download": f"/media/download/{out}"}

@router.get("/download/{path}")
def download(path: str):
    return FileResponse(path, media_type="application/octet-stream", filename=path)
