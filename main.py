from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import resume, cover_letter, ats, auth, export

app = FastAPI(
    title="AI Resume Builder API",
    description="Backend API for AI Resume Builder SaaS",
    version="1.0.0"
)

# CORS — Next.js frontend ke liye
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://your-frontend.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes register karo
app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])
app.include_router(resume.router, prefix="/api/resume", tags=["Resume"])
app.include_router(cover_letter.router, prefix="/api/cover-letter", tags=["Cover Letter"])
app.include_router(ats.router, prefix="/api/ats", tags=["ATS"])
app.include_router(export.router, prefix="/api/export", tags=["Export"])


@app.get("/")
def root():
    return {"message": "AI Resume Builder API is running 🚀", "version": "1.0.0"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}
