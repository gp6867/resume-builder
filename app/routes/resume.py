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

        # Free plan limit check
        if user_id:
            user = db.query(User).filter(User.id == user_id).first()
            if user and user.plan == "free":
                resume_count = db.query(Resume).filter(Resume.user_id == user_id).count()
                if resume_count >= 1:
                    raise HTTPException(
                        status_code=403,
                        detail="Free plan limit reached. Please upgrade to Pro for unlimited resumes."
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
