from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from sqlalchemy import Column, String, Integer, DateTime
from app.database import get_db, User, Base
from datetime import datetime
import uuid
import random
import string

router = APIRouter()


def generate_referral_code():
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=8))


class Referral(Base):
    __tablename__ = "referrals"
    __table_args__ = {'extend_existing': True}
    id = Column(String, primary_key=True)
    referrer_id = Column(String, nullable=False)
    referred_email = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)


class UserExtra(Base):
    __tablename__ = "user_extra"
    __table_args__ = {'extend_existing': True}
    user_id = Column(String, primary_key=True)
    referral_code = Column(String, unique=True, nullable=False)
    extra_resumes = Column(Integer, default=0)
    total_referred = Column(Integer, default=0)


@router.post("/get-referral-code")
def get_referral_code(data: dict, db: Session = Depends(get_db)):
    user_id = data.get("user_id")
    if not user_id:
        raise HTTPException(status_code=400, detail="User ID required")

    user_extra = db.query(UserExtra).filter(UserExtra.user_id == user_id).first()

    if not user_extra:
        code = generate_referral_code()
        user_extra = UserExtra(
            user_id=user_id,
            referral_code=code,
            extra_resumes=0,
            total_referred=0
        )
        db.add(user_extra)
        db.commit()

    return {
        "referral_code": user_extra.referral_code,
        "total_referred": user_extra.total_referred,
        "extra_resumes": user_extra.extra_resumes,
        "referral_url": f"https://resumex-ai.com/signup?ref={user_extra.referral_code}"
    }


@router.get("/stats/{user_id}")
def get_referral_stats(user_id: str, db: Session = Depends(get_db)):
    user_extra = db.query(UserExtra).filter(UserExtra.user_id == user_id).first()
    if not user_extra:
        return {
            "total_referred": 0,
            "extra_resumes": 0,
            "needed": 7,
            "referral_url": ""
        }

    needed = max(0, 7 - (user_extra.total_referred % 7))

    return {
        "total_referred": user_extra.total_referred,
        "extra_resumes": user_extra.extra_resumes,
        "needed": needed,
        "referral_url": f"https://resumex-ai.com/signup?ref={user_extra.referral_code}"
    }
