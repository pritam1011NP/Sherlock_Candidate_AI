from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
)

from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.candidate import Candidate

from app.services.resume_ai_service import analyze_resume
from app.services.ai_scoring_service import generate_ai_result

router = APIRouter(
    prefix="/resume-analysis",
    tags=["Resume Analysis"],
)


@router.get("/{candidate_id}")
def analyze_candidate_resume(
    candidate_id: int,
    db: Session = Depends(get_db),
):

    candidate = (
        db.query(Candidate)
        .filter(Candidate.id == candidate_id)
        .first()
    )

    if not candidate:
        raise HTTPException(
            status_code=404,
            detail="Candidate not found.",
        )

    analysis = analyze_resume(
        candidate.resume_path,
    )

    ai_result = generate_ai_result(
        analysis,
    )

    return {

        "candidate_id": candidate.id,

        "candidate_name": candidate.full_name,

        "email": analysis["email"],

        "phone": analysis["phone"],

        # IMPORTANT
        "resume_path": candidate.resume_path,

        "photo_path": candidate.photo_path,

        "skills": analysis["skills"],

        "education": analysis["education"],

        "experience": analysis["experience"],

        "projects": analysis["projects"],

        "certifications": analysis["certifications"],

        "resume_text": analysis["resume_text"],

        "overall_score": ai_result["overall_score"],

        "recommendation": ai_result["recommendation"],

        "confidence": ai_result["confidence"],

        "strengths": ai_result["strengths"],

        "weaknesses": ai_result["weaknesses"],

        "suggested_role": ai_result["suggested_role"],
        "status": candidate.status,

    }