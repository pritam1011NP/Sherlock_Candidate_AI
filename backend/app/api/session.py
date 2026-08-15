from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db

from app.schemas.interview_session import (
    InterviewSessionResponse,
)

from app.services.interview_session_service import (
    create_session,
)

router = APIRouter(
    prefix="/session",
    tags=["Interview Session"],
)


@router.post(
    "/start",
    response_model=InterviewSessionResponse,
)
def start_session(
    candidate_upload_id: int,
    db: Session = Depends(get_db),
):
    return create_session(
        db=db,
        candidate_upload_id=candidate_upload_id,
    )