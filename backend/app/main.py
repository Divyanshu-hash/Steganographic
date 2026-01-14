from fastapi import FastAPI
from app.database import Base, engine
from app.auth.router import router as auth_router
from app.services.router import router as media_router
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Secure Steganography Platform")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {
        "status": "ok",
        "service": "Steganography API"
    }

app.include_router(auth_router)
app.include_router(media_router)
