from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.services.ai_service import generate_resume_ai
from app.database import get_db, Resume, User
import uuid
import json

router = APIRouter()


@router.post("/generate")
def generate_resume(data: dict, db: Session = Depends(get_db)):
    try:
        user_id = data.get("user_id")

        if user_id:
            from app.routes.referral import UserExtra
            user = db.query(User).filter(User.id == user_id).first()
            user_extra = db.query(UserExtra).filter(UserExtra.user_id == user_id).first()

            extra_resumes = user_extra.extra_resumes if user_extra else 0
            resume_count = db.query(Resume).filter(Resume.user_id == user_id).count()
            allowed = 1 + extra_resumes

            if user and user.plan == "free" and resume_count >= allowed:
                raise HTTPException(
                    status_code=403,
                    detail=f"Free plan limit reached. You have used {resume_count}/{allowed} resumes. Refer 7 friends for 1 more free resume or upgrade to Pro."
                )

        result = generate_resume_ai(data)

        if user_id:
            resume_id = str(uuid.uuid4())
            resume_record = Resume(
                id=resume_id,
                user_id=user_id,
                title=f"{data.get('job_title', 'Resume')} — {data.get('full_name', '')}",
                data=json.dumps({
                    **result,
                    "full_name": data.get("full_name"),
                    "email": data.get("email"),
                    "phone": data.get("phone"),
                    "location": data.get("location")
                })
            )
            db.add(resume_record)
            db.commit()
            result["resume_id"] = resume_id

        return {"success": True, "resume": result}

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/my-resumes/{user_id}")
def get_my_resumes(user_id: str, db: Session = Depends(get_db)):
    resumes = db.query(Resume).filter(Resume.user_id == user_id).order_by(Resume.created_at.desc()).all()
    return {
        "resumes": [
            {
                "id": r.id,
                "title": r.title,
                "created_at": r.created_at.strftime("%B %d, %Y")
            }
            for r in resumes
        ]
    }


@router.delete("/delete/{resume_id}")
def delete_resume(resume_id: str, db: Session = Depends(get_db)):
    resume = db.query(Resume).filter(Resume.id == resume_id).first()
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
    db.delete(resume)
    db.commit()
    return {"success": True}


@router.get("/templates")
def get_templates():
    return {"templates": [
        {"id": "modern", "name": "Modern"},
        {"id": "classic", "name": "Classic"},
        {"id": "minimal", "name": "Minimal"},
        {"id": "creative", "name": "Creative"},
    ]}
