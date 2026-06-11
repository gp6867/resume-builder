from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import resume, cover_letter, ats, auth, export
from app.routes import google_auth
from app.database import init_db

app = FastAPI(title="AI Resume Builder API", version="1.0.0")

origins = [
    "https://resume-builder-qv5t-gygztry2p-kls-projects-453d419e.vercel.app",
    "https://resume-builder-qv5t.vercel.app",
    "https://*.vercel.app",
    "http://localhost:3000",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allow_headers=["*"],
    expose_headers=["*"],
)

@app.on_event("startup")
def startup():
    init_db()

app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])
app.include_router(google_auth.router, prefix="/api/auth/google", tags=["Google Auth"])
app.include_router(resume.router, prefix="/api/resume", tags=["Resume"])
app.include_router(cover_letter.router, prefix="/api/cover-letter", tags=["Cover Letter"])
app.include_router(ats.router, prefix="/api/ats", tags=["ATS"])
app.include_router(export.router, prefix="/api/export", tags=["Export"])

@app.get("/")
def root():
    return {"message": "AI Resume Builder API is running 🚀", "version": "1.0.0"}

@app.get("/health")
def health():
    return {"status": "healthy"}

@app.options("/{rest_of_path:path}")
async def preflight_handler():
    return {"message": "OK"}
