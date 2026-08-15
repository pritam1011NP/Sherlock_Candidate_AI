from app.websocket.connection_manager import manager
from sqlalchemy.orm import Session

from app.models.event import Event
from app.schemas.events import EventCreate

def create_event(db: Session, event: EventCreate):

    db_event = Event(
        participant_id=event.participant_id,
        event_type=event.event_type,
        status=event.status,
        details=event.details,
    )

    db.add(db_event)
    db.commit()
    db.refresh(db_event)

    return db_event

def get_events(db: Session):

    return (
        db.query(Event)
        .order_by(Event.id.desc())
        .all()
    )

def get_events_by_participant(
    db: Session,
    participant_id: str,
):

    return (
        db.query(Event)
        .filter(Event.participant_id == participant_id)
        .order_by(Event.id.desc())
        .all()
    )

    

async def resume_uploaded(filename: str):

    await manager.broadcast({

        "event": "resume_uploaded",

        "filename": filename,

    })


async def candidate_created(candidate):

    await manager.broadcast({

        "event": "candidate_created",

        "id": candidate.id,

        "name": candidate.full_name,

    })


async def candidate_hired(candidate):

    await manager.broadcast({

        "event": "candidate_hired",

        "id": candidate.id,

        "name": candidate.full_name,

    })


async def interview_completed(interview_id: int, candidate_name: str):

    await manager.broadcast({
        "event": "interview_completed",
        "interview_id": interview_id,
        "candidate": candidate_name,
    })


async def face_matched(match_id: int, matched: bool, similarity: float):

    await manager.broadcast({
        "event": "face_matched",
        "match_id": match_id,
        "matched": matched,
        "similarity": similarity,
    })


async def match_created(match):

    await manager.broadcast({

        "event": "match_created",

        "matched": match.matched,

        "similarity": match.similarity,

    }),

async def attendance_marked(attendance):

    await manager.broadcast({

        "event": "attendance_marked",

        "id": attendance.id,

        "candidate_id": attendance.candidate_id,

        "candidate_name": getattr(attendance, "candidate_name", ""),

        "status": attendance.status,

        "verified": attendance.verified,

        "match_score": attendance.match_score,

        "check_in": attendance.check_in.isoformat(),

    })