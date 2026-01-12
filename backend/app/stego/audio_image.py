def encode_audio(image, audio, output):
    with open(audio, "rb") as f:
        data = f.read()
    encode_text(image, data.decode(errors="ignore"), output)
