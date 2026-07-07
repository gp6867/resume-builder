from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from jose import jwt
from datetime import datetime, timedelta
import uuid
import bcrypt
from app.database import get_db, User

router = APIRouter()
SECRET = "change-this-secret"

def hash_password(password: str) -> str:
    pwd_bytes = password[:72].encode('utf-8')
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(pwd_bytes, salt).decode('utf-8')

def verify_password(password: str, hashed: str) -> bool:
    pwd_bytes = password[:72].encode('utf-8')
    return bcrypt.checkpw(pwd_bytes, hashed.encode('utf-8'))

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
        password=hash_password(password),
        plan="free"
    )
    db.add(user)
    db.commit()

    token = jwt.encode(
        {"sub": user_id, "email": email, "exp": datetime.utcnow()+timedelta(days=30)},
        SECRET
    )
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
    if not user or not verify_password(password, user.password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = jwt.encode(
        {"sub": user.id, "email": email, "exp": datetime.utcnow()+timedelta(days=30)},
        SECRET
    )
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {"id": user.id, "name": user.name, "email": email, "plan": user.plan}
    }
