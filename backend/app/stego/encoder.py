from PIL import Image
import struct

def encode_bytes(image_path: str, data_bytes: bytes, output: str):
    img = Image.open(image_path).convert("RGB")
    pixels = img.load()

    # 4 bytes = payload length
    length_prefix = struct.pack(">I", len(data_bytes))
    payload = b"STEGO|" + length_prefix + data_bytes

    binary = "".join(format(b, "08b") for b in payload)

    width, height = img.size
    capacity_bits = width * height * 3

    if len(binary) > capacity_bits:
        raise ValueError("Image too small for payload")

    idx = 0
    for y in range(height):
        for x in range(width):
            r, g, b = pixels[x, y]
            colors = [r, g, b]

            for c in range(3):
                if idx >= len(binary):
                    pixels[x, y] = tuple(colors)
                    img.save(output)
                    return

                colors[c] = (colors[c] & ~1) | int(binary[idx])
                idx += 1

            pixels[x, y] = tuple(colors)

    img.save(output)
