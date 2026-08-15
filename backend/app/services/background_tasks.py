from pathlib import Path
from sqlalchemy.orm import Session

from app.services.live_verification_service import verify_frame


async def process_verification(
    db: Session,
    meeting_id: str,
    candidate_path: Path,
    webcam_path: Path,
):
    await verify_frame(
        db=db,
        meeting_id=meeting_id,
        candidate_path=candidate_path,
        webcam_path=webcam_path,
    )