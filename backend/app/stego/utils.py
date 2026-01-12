def to_binary(data):
    return ''.join(format(byte, '08b') for byte in data)
