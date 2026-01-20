# 🔐 StegaCrypt  
### Secure Steganographic Encoder & Decoder  

**FastAPI + React | Hide Data Inside Images Securely**

StegaCrypt is a full-stack steganography platform that allows authenticated users to securely hide and extract **text, images, and audio files** inside images using **LSB (Least Significant Bit)** steganography.

The project is designed with a **modern React frontend** and a **robust FastAPI backend**, supporting authentication, file uploads, encoding/decoding, and secure downloads.

---

## 🚀 Key Features

### 🔑 Authentication
- User Registration & Login  
- JWT-based authentication  
- Secure password hashing  
- Protected routes on frontend  

### 🖼️ Steganography Operations
- **Text → Image**
- **Image → Image**
- **Audio → Image** (MP3 / WAV / others)
- Decode hidden content from image  

### 🧠 Smart Processing
- Automatic image normalization (JPG → PNG)
- Carrier image resizing for large payloads
- Binary-safe encoding & decoding
- File-type detection during decoding  

### 📥 Download System
- Encoded & decoded files downloadable via API
- Cross-platform safe paths (Windows/Linux)

### 🌐 Frontend Ready API
- Clean REST API for React
- CORS enabled
- Consistent JSON responses
- `/health` endpoint for backend status

---

## 🛠️ Tech Stack

### Backend
- FastAPI
- Python 3.10+
- SQLAlchemy
- JWT Authentication
- Pillow (PIL) – Image processing
- Uvicorn – ASGI server

### Frontend
- React (Vite)
- Tailwind CSS
- Context API (Authentication handling)
- Fetch API
- Lucide Icons

---

## 🎥 Project Demo

## 📁 Project Structure
```bash
Steganographic/
│
├── backend/
│   ├── app/
│   │   ├── auth/
│   │   │   ├── router.py
│   │   │   ├── schemas.py
│   │   │   └── service.py
│   │   │
│   │   ├── services/
│   │   │   ├── router.py
│   │   │   ├── storage.py
│   │   │   └── utils.py
│   │   │
│   │   ├── stego/
│   │   │   ├── encoder.py
│   │   │   ├── decoder.py
│   │   │   └── utils.py
│   │   │
│   │   ├── config.py
│   │   ├── database.py
│   │   ├── models.py
│   │   ├── security.py
│   │   └── main.py
│   │
│   ├── uploads/
│   ├── venv/
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── SplashScreen.jsx
│   │   │
│   │   ├── contexts/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── public/
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── README.md
```

---

## 🔬 How Steganography Works (Simple Explanation)

- Uses **LSB (Least Significant Bit)** technique  
- Each pixel stores bits in RGB channels  
- Payload is prefixed with its length  
- Decoder reads exact payload size  
- Prevents corruption and supports binary data  

---

## ⚙️ Installation & Setup

### 🔹 Backend Setup

#### 1️⃣ Clone Repository
```bash
git clone https://github.com/yourusername/stegacrypt.git
cd stegacrypt/backend
```

#### 2️⃣ Create Virtual Environment
```bash
python -m venv venv
venv\Scripts\activate      # Windows
source venv/bin/activate  # Linux/Mac
```

#### 3️⃣ Install Dependencies
```bash
pip install -r requirements.txt
```

#### 4️⃣ Run Backend Server
```bash
uvicorn app.main:app --reload
```

###🔹 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## 🔗 API Endpoints Overview
### Health

  GET /health

### Auth

  POST /auth/register
  
  POST /auth/login

### Media

  POST /media/encode/text
  
  POST /media/encode/image
  
  POST /media/encode/audio
  
  POST /media/decode
  
  GET /media/download/{file_path}

## ✅ Current Status

- Backend working
- Frontend connected
- Authentication working
- Encoding & decoding working

### 🔜 Planned Features

- User history
- Profile & dashboard enhancements

## 👨‍💻 Author

Divyanshu Giri

## 📜 License

This project is licensed under the MIT License.
