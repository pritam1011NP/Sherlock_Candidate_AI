from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.database.database import get_db

from app.schemas.participant import (
    ParticipantCreate,
    ParticipantResponse,
)

from app.services.participant_service import (
    create_participant,
    get_all_participants,
    get_participant,
    delete_participant,
)

router = APIRouter(
    prefix="/participants",
    tags=["Participants"],
)


@router.post("/", response_model=ParticipantResponse)
def add_participant(
    participant: ParticipantCreate,
    db: Session = Depends(get_db),
):
    return create_participant(db, participant)


@router.get("/", response_model=list[ParticipantResponse])
def all_participants(
    db: Session = Depends(get_db),
):
    return get_all_participants(db)


@router.get("/{participant_id}", response_model=ParticipantResponse)
def single_participant(
    participant_id: int,
    db: Session = Depends(get_db),
):
    participant = get_participant(db, participant_id)

    if participant is None:
        raise HTTPException(
            status_code=404,
            detail="Participant not found",
        )

    return participant


@router.delete("/{participant_id}")
def remove_participant(
    participant_id: int,
    db: Session = Depends(get_db),
):
    participant = delete_participant(db, participant_id)

    if participant is None:
        raise HTTPException(
            status_code=404,
            detail="Participant not found",
        )

    return {
        "message": "Participant deleted successfully"
    }