from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
from app.config import SECRET_KEY, ALGORITHM

pwd_context = CryptContext(schemes=["bcrypt"])

def hash_password(password):
    return pwd_context.hash(password)

def verify_password(password, hashed):
    return pwd_context.verify(password, hashed)

def create_token(data, expires=30):
    payload = data.copy()
    payload["exp"] = datetime.utcnow() + timedelta(minutes=expires)
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
