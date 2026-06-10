from fastapi import APIRouter, Request
from fastapi.responses import RedirectResponse
import httpx
import os
import uuid
from jose import jwt
from datetime import datetime, timedelta
from app.database import get_db, User
from sqlalchemy.orm import Session
from fastapi import Depends
import json

router = APIRouter()

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID", "your_google_client_id")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET", "your_google_client_secret")
GOOGLE_REDIRECT_URI = os.getenv("GOOGLE_REDIRECT_URI", "http://localhost:8000/api/auth/google/callback")
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")
SECRET = "change-this-secret"


@router.get("/login")
def google_login():
    google_auth_url = (
        "https://accounts.google.com/o/oauth2/v2/auth"
        f"?client_id={GOOGLE_CLIENT_ID}"
        f"&redirect_uri={GOOGLE_REDIRECT_URI}"
        "&response_type=code"
        "&scope=openid email profile"
        "&access_type=offline"
    )
    return RedirectResponse(url=google_auth_url)


@router.get("/callback")
async def google_callback(code: str, db: Session = Depends(get_db)):
    # Google se token lo
    async with httpx.AsyncClient() as client:
        token_res = await client.post(
            "https://oauth2.googleapis.com/token",
            data={
                "code": code,
                "client_id": GOOGLE_CLIENT_ID,
                "client_secret": GOOGLE_CLIENT_SECRET,
                "redirect_uri": GOOGLE_REDIRECT_URI,
                "grant_type": "authorization_code",
            }
        )
        token_data = token_res.json()

        # User info lo
        user_res = await client.get(
            "https://www.googleapis.com/oauth2/v2/userinfo",
            headers={"Authorization": f"Bearer {token_data['access_token']}"}
        )
        google_user = user_res.json()

    email = google_user.get("email")
    name = google_user.get("name", "")

    # User check karo ya banao
    user = db.query(User).filter(User.email == email).first()
    if not user:
        user = User(
            id=str(uuid.uuid4()),
            name=name,
            email=email,
            password="google_oauth",
            plan="free"
        )
        db.add(user)
        db.commit()

    # JWT token banao
    token = jwt.encode(
        {"sub": user.id, "email": email, "exp": datetime.utcnow() + timedelta(days=30)},
        SECRET
    )

    user_data = json.dumps({"id": user.id, "name": user.name, "email": email, "plan": user.plan})

    # Frontend pe redirect karo token ke saath
    return RedirectResponse(
        url=f"{FRONTEND_URL}/auth/callback?token={token}&user={user_data}"
    )
