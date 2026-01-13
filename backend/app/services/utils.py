from PIL import Image
import os
import math

def normalize_image(input_path: str) -> str:
    img = Image.open(input_path).convert("RGB")

    base, _ = os.path.splitext(input_path)
    png_path = base + ".png"

    img.save(png_path, "PNG")
    return png_path

def detect_file_type(data: bytes):
    # PNG
    if data.startswith(b"\x89PNG"):
        return "image", ".png"

    # JPG
    if data.startswith(b"\xff\xd8"):
        return "image", ".jpg"

    # WAV
    if data.startswith(b"RIFF") and b"WAVE" in data[:12]:
        return "audio", ".wav"

    # MP3 (ID3 or LAME)
    if data.startswith(b"ID3") or b"LAME" in data[:50]:
        return "audio", ".mp3"

    return "text", None


def resize_carrier_for_payload(image_path: str, payload_size: int) -> str:
    img = Image.open(image_path).convert("RGB")
    width, height = img.size

    required_pixels = math.ceil((payload_size * 8) / 3)
    current_pixels = width * height

    if current_pixels >= required_pixels:
        return image_path

    scale = math.sqrt(required_pixels / current_pixels)
    new_size = (int(width * scale) + 1, int(height * scale) + 1)

    resized = img.resize(new_size, Image.BICUBIC)

    out_path = image_path.replace(".png", "_resized.png")
    resized.save(out_path)
    return out_path