from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.auth.schemas import Register, Login
from app.auth.service import register_user, login_user
from app.database import SessionLocal

router = APIRouter(prefix="/auth", tags=["Auth"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/register")
def register(data: Register, db: Session = Depends(get_db)):
    return register_user(db, data.email, data.password)

@router.post("/login")
def login(data: Login, db: Session = Depends(get_db)):
    token = login_user(db, data.email, data.password)
    if not token:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"access_token": token}
