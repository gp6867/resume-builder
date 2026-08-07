from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.routes import resume, cover_letter, ats, auth, export
from app.routes import google_auth, payment, contact, forgot_password, referral
from app.database import init_db

app = FastAPI(title="AI Resume Builder API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup():
    init_db()

@app.options("/{path:path}")
async def options_handler(path: str, request: Request):
    return JSONResponse(
        content={"message": "OK"},
        headers={
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "*",
        }
    )

app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])
app.include_router(google_auth.router, prefix="/api/auth/google", tags=["Google Auth"])
app.include_router(resume.router, prefix="/api/resume", tags=["Resume"])
app.include_router(cover_letter.router, prefix="/api/cover-letter", tags=["Cover Letter"])
app.include_router(ats.router, prefix="/api/ats", tags=["ATS"])
app.include_router(export.router, prefix="/api/export", tags=["Export"])
app.include_router(payment.router, prefix="/api/payment", tags=["Payment"])
app.include_router(contact.router, prefix="/api/contact", tags=["Contact"])
app.include_router(forgot_password.router, prefix="/api", tags=["Password Reset"])
app.include_router(referral.router, prefix="/api/referral", tags=["Referral"])

@app.get("/")
def root():
    return {"message": "AI Resume Builder API is running 🚀", "version": "1.0.0"}

@app.get("/health")
def health():
    return {"status": "healthy"}
