from sqlalchemy.orm import Session

from app.ai.confidence_engine import calculate_confidence

from app.models.event import Event
from app.models.interview import InterviewSession
from app.models.participant import Participant


def evaluate_candidates(db: Session):

    interview = db.query(
        InterviewSession
    ).first()

    if interview is None:
        return {
            "message": "No interview session found."
        }

    participants = db.query(
        Participant
    ).all()

    results = []

    for participant in participants:

        events = (
            db.query(Event)
            .filter(
                Event.participant_id ==
                participant.participant_id
            )
            .all()
        )

        confidence, reasons = calculate_confidence(
            participant,
            interview,
            events,
        )

        participant.confidence = confidence

        db.commit()

        results.append(
            {
                "participant_id": participant.participant_id,
                "display_name": participant.display_name,
                "confidence": confidence,
                "reasons": reasons,
            }
        )

    results.sort(
        key=lambda x: x["confidence"],
        reverse=True,
    )

    return results