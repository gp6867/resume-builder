from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
import uuid
from app.database import get_db, User

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET = "change-this-secret"


@router.post("/register")
def register(data: dict, db: Session = Depends(get_db)):
    email = data.get("email")
    name = data.get("name", "")
    password = data.get("password", "")

    if not email or not password or not name:
        raise HTTPException(status_code=400, detail="All fields are required")

    existing = db.query(User).filter(User.email == email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    user_id = str(uuid.uuid4())
    user = User(
        id=user_id,
        name=name,
        email=email,
        password=pwd_context.hash(password),
        plan="free"
    )
    db.add(user)
    db.commit()

    token = jwt.encode({"sub": user_id, "email": email, "exp": datetime.utcnow()+timedelta(days=30)}, SECRET)
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {"id": user_id, "name": name, "email": email, "plan": "free"}
    }


@router.post("/login")
def login(data: dict, db: Session = Depends(get_db)):
    email = data.get("email")
    password = data.get("password", "")

    user = db.query(User).filter(User.email == email).first()
    if not user or not pwd_context.verify(password, user.password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = jwt.encode({"sub": user.id, "email": email, "exp": datetime.utcnow()+timedelta(days=30)}, SECRET)
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {"id": user.id, "name": user.name, "email": email, "plan": user.plan}
    }


@router.get("/me")
def get_me(db: Session = Depends(get_db)):
    return {"message": "Use Bearer token"}
