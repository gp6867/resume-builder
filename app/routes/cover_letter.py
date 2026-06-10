from fastapi import APIRouter, HTTPException
from app.services.ai_service import generate_cover_letter_ai

router = APIRouter()

@router.post("/generate")
def generate_cover_letter(data: dict):
    try:
        letter = generate_cover_letter_ai(data)
        return {"success": True, "cover_letter": letter}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
