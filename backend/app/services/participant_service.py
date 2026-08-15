from sqlalchemy.orm import Session

from app.models.participant import Participant
from app.schemas.participant import ParticipantCreate


def create_participant(db: Session, participant: ParticipantCreate):

    db_participant = Participant(
        participant_id=participant.participant_id,
        display_name=participant.display_name,
        email=participant.email,
        camera_on=participant.camera_on,
        microphone_on=participant.microphone_on,
    )

    db.add(db_participant)
    db.commit()
    db.refresh(db_participant)

    return db_participant


def get_all_participants(db: Session):
    return db.query(Participant).all()


def get_participant(db: Session, participant_id: int):
    return db.query(Participant).filter(
        Participant.id == participant_id
    ).first()


def delete_participant(db: Session, participant_id: int):

    participant = db.query(Participant).filter(
        Participant.id == participant_id
    ).first()

    if participant:
        db.delete(participant)
        db.commit()

    return participant