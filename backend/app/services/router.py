from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import FileResponse
from app.services.storage import save_file
from app.stego.encoder import encode_bytes
from app.stego.decoder import decode_from_image
from app.services.utils import normalize_image, resize_carrier_for_payload
from app.services.utils import detect_file_type
import uuid
import os

router = APIRouter(prefix="/media", tags=["Media"])

@router.post("/encode/text")
def text_to_image(image: UploadFile = File(...), text: str = ""):
    img_path = save_file(image)
    img_path = normalize_image(img_path)

    out = f"uploads/encoded_text.png"
    encode_bytes(img_path, text.encode(), out)

    clean_path = out.replace("\\", "/")

    return {
        "success": True,
        "type": "TEXT",
        "download_url": f"/media/download/{clean_path}"
    }

@router.post("/encode/image")
def image_to_image(carrier: UploadFile = File(...), hidden: UploadFile = File(...)):
    carrier_path = normalize_image(save_file(carrier))
    hidden_path = save_file(hidden)

    with open(hidden_path, "rb") as f:
        data = f.read()

    carrier_ready = resize_carrier_for_payload(carrier_path, len(data) + 10)

    out = f"uploads/encoded_image.png"
    encode_bytes(carrier_ready, data, out)

    clean_path = out.replace("\\", "/")

    return {
        "success": True,
        "type": "IMAGE",
        "download_url": f"/media/download/{clean_path}"
    }


@router.post("/encode/audio")
def audio_to_image(image: UploadFile = File(...), audio: UploadFile = File(...)):
    carrier = normalize_image(save_file(image))
    audio_path = save_file(audio)

    with open(audio_path, "rb") as f:
        audio_bytes = f.read()

    carrier_ready = resize_carrier_for_payload(carrier, len(audio_bytes) + 10)

    out = f"uploads/encoded_audio.png"
    encode_bytes(carrier_ready, audio_bytes, out)

    clean_path = out.replace("\\", "/")


    return {
        "success": True,
        "type": "AUDIO",
        "download_url": f"/media/download/{clean_path}"
    }


@router.post("/decode")
def decode(image: UploadFile = File(...)):
    img_path = save_file(image)
    payload = decode_from_image(img_path)

    file_type, ext = detect_file_type(payload)

    if file_type == "text":
        return {
            "success": True,
            "type": "TEXT",
            "message": payload.decode(errors="ignore")
        }

    filename = f"decoded_{uuid.uuid4().hex}{ext}"
    out_path = os.path.join("uploads", filename)

    with open(out_path, "wb") as f:
        f.write(payload)

    clean_path = out_path.replace("\\", "/")


    return {
        "success": True,
        "type": file_type.upper(),
        "download_url": f"/media/download/{clean_path}"
    }


@router.get("/download/{file_path:path}")
def download(file_path: str):
    safe_path = file_path.replace("\\", "/")

    if not os.path.exists(safe_path):
        raise HTTPException(status_code=404, detail="File not found")

    return FileResponse(
        path=safe_path,
        media_type="application/octet-stream",
        filename=os.path.basename(safe_path)
    )
