from sqlalchemy.orm import Session
from models import User
from security import hash_password, verify_password, create_token

def register_user(db: Session, email, password):
    user = User(email=email, password=hash_password(password))
    db.add(user)
    db.commit()
    return user

def login_user(db: Session, email, password):
    user = db.query(User).filter(User.email == email).first()
    if not user or not verify_password(password, user.password):
        return None
    return create_token({"sub": user.email})
