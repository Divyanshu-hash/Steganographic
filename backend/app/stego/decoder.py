from PIL import Image
import struct

def decode_from_image(image_path: str):
    img = Image.open(image_path).convert("RGB")
    pixels = img.load()

    binary = ""
    width, height = img.size

    for y in range(height):
        for x in range(width):
            r, g, b = pixels[x, y]
            binary += str(r & 1)
            binary += str(g & 1)
            binary += str(b & 1)

    data = bytearray()
    for i in range(0, len(binary), 8):
        byte = binary[i:i+8]
        if len(byte) < 8:
            break
        data.append(int(byte, 2))

    decoded = bytes(data)

    if not decoded.startswith(b"STEGO|"):
        raise ValueError("No stego data")

    # Read payload length
    payload_len = struct.unpack(">I", decoded[6:10])[0]

    payload = decoded[10:10 + payload_len]
    return payload
