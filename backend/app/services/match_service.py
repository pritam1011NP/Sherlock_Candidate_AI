import asyncio

from sqlalchemy.orm import Session

from app.face.config import (
    CANDIDATE_DIR,
    PARTICIPANT_DIR,
)
from app.face.matcher import compare

from app.models.match import Match
from app.services.audit_service import log_action
from app.services.event_service import face_matched


def match_faces(
    db: Session,
    candidate_filename: str,
    participant_filename: str,
):
    candidate_path = CANDIDATE_DIR / candidate_filename
    participant_path = PARTICIPANT_DIR / participant_filename

    # Check candidate image
    if not candidate_path.exists():
        return {
            "success": False,
            "similarity": 0.0,
            "matched": False,
            "distance": None,
            "message": "Candidate image not found."
        }

    # Check participant image
    if not participant_path.exists():
        return {
            "success": False,
            "similarity": 0.0,
            "matched": False,
            "distance": None,
            "message": "Participant image not found."
        }

    # Compare faces
    result = compare(
        candidate_path,
        participant_path,
    )

    # Save match history
    match = Match(
        candidate_filename=candidate_filename,
        participant_filename=participant_filename,
        similarity=result["similarity"],
        matched=result["verified"],
    )

    db.add(match)
    db.commit()
    db.refresh(match)

    # ------------------------------------
    # Notify Dashboard
    # ------------------------------------
    try:
        loop = asyncio.get_running_loop()
        loop.create_task(
            face_matched(
                match.id,
                result["verified"],
                result["similarity"],
            )
        )
    except RuntimeError:
        pass

    # Audit log
    log_action(
        db=db,
        username="admin",
        action="FACE_MATCH",
        details=(
            f"{candidate_filename} vs "
            f"{participant_filename} | "
            f"Similarity={result['similarity']:.2f} | "
            f"Matched={result['verified']}"
        ),
    )

    return {
        "success": True,
        "match_id": match.id,
        "similarity": result["similarity"],
        "matched": result["verified"],
        "distance": result["distance"],
        "message": (
            "Faces matched successfully."
            if result["verified"]
            else "Faces do not match."
        ),
    }