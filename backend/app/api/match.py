from pathlib import Path
import shutil

from fastapi import APIRouter, Depends, File, UploadFile
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.face.matcher import compare
from app.models.match import Match

router = APIRouter(
    prefix="/match",
    tags=["Face Matching"],
)

TEMP_DIR = Path("temp")
TEMP_DIR.mkdir(exist_ok=True)


@router.post("/")
async def match_faces(
    candidate: UploadFile = File(...),
    participant: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    candidate_path = TEMP_DIR / candidate.filename
    participant_path = TEMP_DIR / participant.filename

    try:
        # Save uploaded files
        with open(candidate_path, "wb") as buffer:
            shutil.copyfileobj(candidate.file, buffer)

        with open(participant_path, "wb") as buffer:
            shutil.copyfileobj(participant.file, buffer)

        # Compare faces
        result = compare(candidate_path, participant_path)

        # Save match to database
        match = Match(
            candidate_filename=candidate.filename,
            participant_filename=participant.filename,
            similarity=result["similarity"],
            matched=result["verified"],
        )

        db.add(match)
        db.commit()
        db.refresh(match)

        return {
            "success": True,
            "match_id": match.id,
            "candidate_filename": match.candidate_filename,
            "participant_filename": match.participant_filename,
            "similarity": match.similarity,
            "matched": match.matched,
            "distance": result["distance"],
            "message": (
                "Faces matched successfully."
                if match.matched
                else "Faces do not match."
            ),
        }

    except Exception as e:
        db.rollback()
        return {
            "success": False,
            "message": str(e),
        }

    finally:
        if candidate_path.exists():
            candidate_path.unlink()

        if participant_path.exists():
            participant_path.unlink()