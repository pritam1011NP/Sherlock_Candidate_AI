from fastapi import APIRouter, Depends, HTTPException

from sqlalchemy.orm import Session

from app.database.database import get_db

from app.auth.jwt import permission_required
from app.models.candidate import Candidate
from app.schemas.interview import InterviewQuestionsResponse
from app.services.interview_service import generate_interview_questions
from app.services.resume_ai_service import analyze_resume
from app.schemas.interview import (
    InterviewCreate,
    InterviewResponse,
)

from app.services.interview_service import (
    create_interview,
    get_interview,
)

router = APIRouter(
    prefix="/interview",
    tags=["Interview"],
)


# ----------------------------------------
# Create Interview
# ----------------------------------------

@router.post(
    "/",
    response_model=InterviewResponse,
)
def add_interview(
    interview: InterviewCreate,
    db: Session = Depends(get_db),
    current_user=Depends(
        permission_required("interview:create")
    ),
):

    return create_interview(
        db=db,
        interview=interview,
    )


# ----------------------------------------
# View Interview
# ----------------------------------------

@router.get(
    "/",
    response_model=InterviewResponse,
)
def read_interview(
    db: Session = Depends(get_db),
    current_user=Depends(
        permission_required("interview:view")
    ),
):

    return get_interview(db)

# ---------------------------------------------------------
# AI Interview Questions
# ---------------------------------------------------------

@router.get(
    "/questions/{candidate_id}",
    response_model=InterviewQuestionsResponse,
)
def get_interview_questions(
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
        candidate.resume_path
    )

    questions = generate_interview_questions(
        candidate
    )

    return {

        "candidate_id": candidate.id,

        "candidate_name": candidate.full_name,

        "role": candidate.position,

        "total_questions": len(questions),

        "questions": questions,

    }