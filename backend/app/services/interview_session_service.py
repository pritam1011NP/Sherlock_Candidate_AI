import uuid

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.upload import Upload
from app.models.interview_session import InterviewSession


def create_session(
    db: Session,
    candidate_upload_id: int,
):

    candidate = (
        db.query(Upload)
        .filter(
            Upload.id == candidate_upload_id,
            Upload.image_type == "candidate",
        )
        .first()
    )

    if candidate is None:
        raise HTTPException(
            status_code=404,
            detail="Candidate not found.",
        )

    session = InterviewSession(
        candidate_upload_id=candidate.id,
        session_token=str(uuid.uuid4()),
        status="running",
        confidence=100.0,
    )

    db.add(session)
    db.commit()
    db.refresh(session)

    return session