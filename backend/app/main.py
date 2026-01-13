from fastapi import FastAPI
from app.database import Base, engine
from app.auth.router import router as auth_router
from app.media.router import router as media_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Secure Steganography Platform")

app.include_router(auth_router)
app.include_router(media_router)
