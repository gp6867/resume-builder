from fastapi import APIRouter, Request, Depends
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
import httpx
import os
import uuid
import json
import random
import string
from jose import jwt
from datetime import datetime, timedelta
from app.database import get_db, User

router = APIRouter()

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID", "")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET", "")
GOOGLE_REDIRECT_URI = os.getenv("GOOGLE_REDIRECT_URI", "")
FRONTEND_URL = os.getenv("FRONTEND_URL", "https://resumex-ai.com")
SECRET = "change-this-secret"


def generate_referral_code():
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=8))


@router.get("/login")
def google_login(ref: str = ""):
    google_auth_url = (
        "https://accounts.google.com/o/oauth2/v2/auth"
        f"?client_id={GOOGLE_CLIENT_ID}"
        f"&redirect_uri={GOOGLE_REDIRECT_URI}"
        "&response_type=code"
        "&scope=openid email profile"
        "&access_type=offline"
        f"&state={ref}"
    )
    return RedirectResponse(url=google_auth_url)


@router.get("/callback")
async def google_callback(code: str, state: str = "", db: Session = Depends(get_db)):
    from app.routes.referral import UserExtra, Referral

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

        user_res = await client.get(
            "https://www.googleapis.com/oauth2/v2/userinfo",
            headers={"Authorization": f"Bearer {token_data['access_token']}"}
        )
        google_user = user_res.json()

    email = google_user.get("email")
    name = google_user.get("name", "")
    is_new_user = False

    user = db.query(User).filter(User.email == email).first()
    if not user:
        is_new_user = True
        user = User(
            id=str(uuid.uuid4()),
            name=name,
            email=email,
            password="google_oauth",
            plan="free"
        )
        db.add(user)

        # New user ka referral code banao
        new_user_extra = UserExtra(
            user_id=user.id,
            referral_code=generate_referral_code(),
            extra_resumes=0,
            total_referred=0
        )
        db.add(new_user_extra)

        # Referral process karo
        ref_code = state
        if ref_code and is_new_user:
            referrer_extra = db.query(UserExtra).filter(UserExtra.referral_code == ref_code).first()
            if referrer_extra:
                referral = Referral(
                    id=str(uuid.uuid4()),
                    referrer_id=referrer_extra.user_id,
                    referred_email=email,
                    created_at=datetime.utcnow()
                )
                db.add(referral)
                referrer_extra.total_referred += 1
                if referrer_extra.total_referred % 7 == 0:
                    referrer_extra.extra_resumes += 1

        db.commit()

    token = jwt.encode(
        {"sub": user.id, "email": email, "exp": datetime.utcnow() + timedelta(days=30)},
        SECRET
    )

    user_data = json.dumps({"id": user.id, "name": user.name, "email": email, "plan": user.plan})
    return RedirectResponse(
        url=f"{FRONTEND_URL}/auth/callback?token={token}&user={user_data}"
    )
