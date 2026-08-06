from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.database import get_db, User
from jose import jwt
from datetime import datetime, timedelta
import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

router = APIRouter()

GMAIL_USER = os.getenv("GMAIL_USER", "")
GMAIL_PASSWORD = os.getenv("GMAIL_APP_PASSWORD", "")
FRONTEND_URL = os.getenv("FRONTEND_URL", "https://resumex-ai.com")
SECRET = "change-this-secret"

def send_email(to_email: str, subject: str, html_body: str):
    msg = MIMEMultipart()
    msg['From'] = GMAIL_USER
    msg['To'] = to_email
    msg['Subject'] = subject
    msg.attach(MIMEText(html_body, 'html'))
    
    context = ssl.create_default_context()
    with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as server:
        server.login(GMAIL_USER, GMAIL_PASSWORD)
        server.sendmail(GMAIL_USER, to_email, msg.as_string())

@router.post("/forgot-password")
def forgot_password(data: dict, db: Session = Depends(get_db)):
    email = data.get("email", "")
    
    user = db.query(User).filter(User.email == email).first()
    if not user:
        return {"message": "If email exists, reset link has been sent"}
    
    token = jwt.encode(
        {"sub": user.id, "email": email, "exp": datetime.utcnow() + timedelta(hours=1)},
        SECRET
    )
    
    reset_url = f"{FRONTEND_URL}/reset-password?token={token}"
    
    try:
        html_body = f"""
        <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: #0a0a0f; padding: 40px; border-radius: 12px; text-align: center;">
                <h1 style="color: #6c63ff;">✦ ResumeX AI</h1>
                <h2 style="color: #e8e8f0;">Reset Your Password</h2>
                <p style="color: #888899;">Click the button below to reset your password. This link expires in 1 hour.</p>
                <a href="{reset_url}" style="background: #6c63ff; color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block; margin: 20px 0;">
                    Reset Password
                </a>
                <p style="color: #888899; font-size: 12px;">If you did not request this, please ignore this email.</p>
            </div>
        </body>
        </html>
        """
        send_email(email, "Reset Your ResumeX AI Password", html_body)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Email sending failed: {str(e)}")
    
    return {"message": "If email exists, reset link has been sent"}


@router.post("/reset-password")
def reset_password(data: dict, db: Session = Depends(get_db)):
    token = data.get("token", "")
    new_password = data.get("password", "")
    
    if not token or not new_password:
        raise HTTPException(status_code=400, detail="Token and password required")
    
    try:
        payload = jwt.decode(token, SECRET, algorithms=["HS256"])
        user_id = payload.get("sub")
    except:
        raise HTTPException(status_code=400, detail="Invalid or expired token")
    
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    import bcrypt
    user.password = bcrypt.hashpw(new_password[:72].encode(), bcrypt.gensalt()).decode()
    db.commit()
    
    return {"message": "Password reset successfully"}
