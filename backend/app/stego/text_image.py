from PIL import Image
from stego.utils import to_binary

def encode_text(image_path, text, output):
    img = Image.open(image_path).convert("RGB")
    binary = to_binary(text.encode()) + "1111111111111110"
    pixels = img.load()

    idx = 0
    for y in range(img.height):
        for x in range(img.width):
            if idx >= len(binary):
                img.save(output)
                return
            r, g, b = pixels[x, y]
            r = (r & ~1) | int(binary[idx])
            idx += 1
            pixels[x, y] = (r, g, b)
