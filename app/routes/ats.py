from fastapi import APIRouter, HTTPException
from app.services.ai_service import calculate_ats_score

router = APIRouter()

@router.post("/score")
def get_ats_score(data: dict):
    resume_text = data.get("resume_text", "")
    job_desc = data.get("job_description", "")
    if not resume_text.strip():
        raise HTTPException(status_code=400, detail="Resume text cannot be empty")
    try:
        result = calculate_ats_score(resume_text, job_desc)
        return {"success": True, **result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
