from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from app.database.database import get_db

from app.models.candidate_ai import CandidateAI

from app.schemas.candidate_ai import CandidateAIResponse


router = APIRouter(
    prefix="/candidate-ai",
    tags=["Candidate AI"],
)


@router.get(
    "/{candidate_id}",
    response_model=CandidateAIResponse,
)

def get_ai(candidate_id: int, db: Session = Depends(get_db)):

    return (

        db.query(CandidateAI)

        .filter(CandidateAI.candidate_id == candidate_id)

        .first()

    )