def encode_image(carrier, hidden, output):
    with open(hidden, "rb") as f:
        data = f.read()
    encode_text(carrier, data.decode(errors="ignore"), output)
