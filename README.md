# 🚀 AI Resume Builder — Backend

Python FastAPI se bana hua powerful resume builder backend.

## 📁 Project Structure

```
ai-resume-backend/
├── app/
│   ├── main.py              ← FastAPI app entry point
│   ├── config.py            ← Environment variables
│   ├── models/
│   │   └── schemas.py       ← Request/Response models
│   ├── routes/
│   │   ├── auth.py          ← Register/Login APIs
│   │   ├── resume.py        ← Resume generation APIs
│   │   ├── cover_letter.py  ← Cover letter APIs
│   │   ├── ats.py           ← ATS score APIs
│   │   └── export.py        ← PDF export APIs
│   ├── services/
│   │   ├── ai_service.py    ← Claude AI integration
│   │   ├── auth_service.py  ← JWT token handling
│   │   └── pdf_service.py   ← PDF generation
│   └── utils/
│       └── dependencies.py  ← Auth middleware
├── requirements.txt
├── .env.example
├── setup.sh
└── README.md
```

## ⚡ Quick Setup (Linux/Mac)

```bash
# 1. Folder mein jao
cd ai-resume-backend

# 2. Setup script run karo
chmod +x setup.sh
./setup.sh

# 3. .env file mein apni keys daalo
nano .env

# 4. Server start karo
source venv/bin/activate
uvicorn app.main:app --reload --port 8000
```

## ⚡ Manual Setup

```bash
# Virtual environment
python3 -m venv venv
source venv/bin/activate        # Linux/Mac
# venv\Scripts\activate         # Windows

# Install dependencies
pip install -r requirements.txt

# .env file banao
cp .env.example .env
# .env mein apni API keys daalo

# Server start karo
uvicorn app.main:app --reload --port 8000
```

## 🔑 API Keys Kahan Se Milegi?

| Key | Website | Free? |
|-----|---------|-------|
| `ANTHROPIC_API_KEY` | https://console.anthropic.com | ✅ Free credits |
| `SUPABASE_URL` + `SUPABASE_KEY` | https://supabase.com | ✅ Free tier |
| `JWT_SECRET` | Koi bhi random string | ✅ Khud likho |

## 📖 API Endpoints

Server start hone ke baad: **http://localhost:8000/docs**

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Naya account banao |
| POST | `/api/auth/login` | Login karo |
| POST | `/api/resume/generate` | AI se resume banao |
| GET  | `/api/resume/templates` | Templates list |
| POST | `/api/cover-letter/generate` | Cover letter banao |
| POST | `/api/ats/score` | ATS score check karo |
| POST | `/api/export/pdf` | PDF download karo |
| POST | `/api/export/preview` | HTML preview |

## 🧪 API Test Karo (curl)

```bash
# Resume generate karo
curl -X POST http://localhost:8000/api/resume/generate \
  -H "Content-Type: application/json" \
  -d '{
    "full_name": "Rahul Sharma",
    "email": "rahul@email.com",
    "phone": "+91-9876543210",
    "location": "Mumbai, India",
    "job_title": "Software Engineer",
    "years_experience": 3,
    "skills": ["Python", "FastAPI", "React", "PostgreSQL"],
    "work_experience": [
      {
        "job_title": "Junior Developer",
        "company": "Tech Corp",
        "location": "Mumbai",
        "start_date": "2021",
        "end_date": "Present",
        "description": "Built web applications"
      }
    ],
    "education": [
      {
        "degree": "B.Tech Computer Science",
        "institution": "IIT Mumbai",
        "location": "Mumbai",
        "start_date": "2017",
        "end_date": "2021",
        "gpa": "8.5"
      }
    ]
  }'
```

## 🔧 Production Deploy (Railway)

```bash
# Railway CLI install karo
npm install -g @railway/cli

# Login karo
railway login

# Deploy karo
railway up
```

## 📝 Notes

- **API key nahi hai?** — Mock data se kaam karega, real AI baad mein add karo
- **WeasyPrint nahi hai?** — HTML file download hogi PDF ki jagah
- **Supabase nahi hai?** — In-memory storage use hogi (server restart pe data jaayega)
