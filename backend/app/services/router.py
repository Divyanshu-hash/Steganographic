from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import FileResponse
from app.media.storage import save_file
from app.stego.encoder import encode_bytes
from app.stego.decoder import decode_from_image
from app.media.utils import normalize_image, resize_carrier_for_payload
from app.media.utils import detect_file_type
import uuid
import os

router = APIRouter(prefix="/media", tags=["Media"])

@router.post("/encode/text")
def text_to_image(image: UploadFile = File(...), text: str = ""):
    img_path = save_file(image)

    # 🔥 JPEG → PNG conversion
    if img_path.lower().endswith((".jpg", ".jpeg")):
        img_path = normalize_image(img_path)

    out = f"uploads/encoded_{os.path.basename(img_path)}"
    encode_bytes(img_path, text.encode(), out)

    return {"download": f"/media/download/{out}"}

@router.post("/encode/image")
def image_to_image(
    carrier: UploadFile = File(...),
    hidden: UploadFile = File(...)
):
    # 1️⃣ Save uploaded files
    carrier_path = save_file(carrier)
    hidden_path = save_file(hidden)

    # 2️⃣ Normalize carrier (JPG/JPEG → PNG)
    carrier_png = normalize_image(carrier_path)

    # 3️⃣ Read hidden image bytes
    with open(hidden_path, "rb") as f:
        hidden_bytes = f.read()

    # 4️⃣ Resize carrier if payload is too large
    carrier_ready = resize_carrier_for_payload(
        carrier_png,
        payload_size=len(hidden_bytes) + 10  # + header safety
    )

    # 5️⃣ Output path (always PNG)
    base_name = os.path.splitext(os.path.basename(carrier.filename))[0]
    out = f"uploads/encoded_{base_name}.png"

    # 6️⃣ Encode
    encode_bytes(carrier_ready, hidden_bytes, out)

    return {
        "download": f"/media/download/{out}"
    }

@router.post("/encode/audio")
def audio_to_image(
    image: UploadFile = File(...),
    audio: UploadFile = File(...)
):
    # 1️⃣ Save uploaded files
    image_path = save_file(image)
    audio_path = save_file(audio)

    # 2️⃣ Normalize carrier (JPG/JPEG → PNG)
    carrier_png = normalize_image(image_path)

    # 3️⃣ Read audio bytes
    with open(audio_path, "rb") as f:
        audio_bytes = f.read()

    # 4️⃣ Resize carrier if needed (audio is usually large)
    carrier_ready = resize_carrier_for_payload(
        carrier_png,
        payload_size=len(audio_bytes) + 10  # header safety
    )

    # 5️⃣ Output path (always PNG)
    base_name = os.path.splitext(os.path.basename(image.filename))[0]
    out = f"uploads/encoded_{base_name}.png"

    # 6️⃣ Encode
    encode_bytes(carrier_ready, audio_bytes, out)

    return {
        "download": f"/media/download/{out}"
    }

@router.post("/decode")
def decode(image: UploadFile = File(...)):
    img_path = save_file(image)

    payload = decode_from_image(img_path)
    file_type, ext = detect_file_type(payload)

    # TEXT
    if file_type == "text":
        return {
            "type": "TEXT",
            "message": payload.decode(errors="ignore")
        }

    # IMAGE / AUDIO → SAVE FILE
    filename = f"decoded_{uuid.uuid4().hex}{ext}"
    out_path = os.path.join("uploads", filename)

    with open(out_path, "wb") as f:
        f.write(payload)

    url_path = out_path.replace("\\", "/")

    return {
        "type": file_type.upper(),
        "download": f"/media/download/{url_path}"
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
