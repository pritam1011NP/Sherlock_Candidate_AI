from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.database.database import get_db

from app.schemas.events import EventCreate
from app.schemas.events import EventResponse

from app.services.event_service import create_event
from app.services.event_service import get_events
from app.services.event_service import get_events_by_participant


router = APIRouter(
    prefix="/events",
    tags=["Interview Events"],
)


@router.post("/", response_model=EventResponse)
def add_event(
    event: EventCreate,
    db: Session = Depends(get_db),
):

    return create_event(db, event)


@router.get("/", response_model=list[EventResponse])
def all_events(
    db: Session = Depends(get_db),
):

    return get_events(db)


@router.get("/{participant_id}",
            response_model=list[EventResponse])
def participant_events(
    participant_id: str,
    db: Session = Depends(get_db),
):

    return get_events_by_participant(
        db,
        participant_id,
    )