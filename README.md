# 🔐 Steganographic Encoder & Decoder  
### FastAPI + React Based Secure Media Steganography System

A **production-ready steganography application** that allows users to securely hide and extract **text, images, and audio files inside images** using **LSB (Least Significant Bit) steganography**.

The system supports authentication, media uploads, automatic carrier normalization, resizing, and safe binary decoding.

---

## 🚀 Features

### 🔑 Authentication
- User Registration & Login
- JWT-based authentication
- Secure password hashing

### 🖼️ Steganography Capabilities
- **Text → Image**
- **Image → Image**
- **Audio → Image (MP3 / WAV)**
- **Decode hidden data from image**

### 🧠 Smart Processing
- JPG/JPEG → PNG normalization (lossless safety)
- Automatic carrier resizing if payload is large
- Length-prefixed binary encoding (no data corruption)
- File-signature based decoding (text / image / audio)

### 📥 Download Support
- Decoded images/audio available via secure download URLs
- Cross-platform path handling (Windows/Linux)

### 🌐 Frontend Ready
- REST API designed for React
- CORS enabled
- Standardized JSON responses
- Health check endpoint

---

## 🛠️ Tech Stack

### Backend
- **FastAPI**
- **Python 3.10+**
- **Pillow (PIL)** – image processing
- **SQLAlchemy** – database ORM
- **JWT** – authentication
- **Uvicorn** – ASGI server

### Frontend
- **React (planned / integrated separately)**
- **Axios / Fetch API**

---

## 🧩 Project Architecture



---

## 🔬 How Steganography Works (Brief)

- Uses **LSB (Least Significant Bit)** method
- Each pixel stores **3 bits** (RGB channels)
- Payload is prefixed with **length bytes**
- Decoding reads exact payload size → no corruption
- Supports **binary-safe data** (images/audio)

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/yourusername/steganography-project.git
cd steganography-project/backend
```

### 2️⃣ Create Virtual Environment
```bash
python -m venv venv
source venv/bin/activate   # Linux / Mac
venv\Scripts\activate      # Windows
```

### 3️⃣ Install Dependencies
```bash
pip install -r requirements.txt
```

### 4️⃣ Run Backend Server
```bash
uvicorn app.main:app --reload
```

👨‍💻 Author
Divyanshu Giri
