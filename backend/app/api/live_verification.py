from pathlib import Path
import shutil

from fastapi import (
    APIRouter,
    UploadFile,
    File,
    Form,
    Depends,
    HTTPException,
    status,
)
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.auth.jwt import permission_required
from app.services.live_verification_service import verify_frame
from app.validators.file_validator import (
    validate_upload,
    validate_image,
    generate_filename,
)

router = APIRouter(
    prefix="/live",
    tags=["Live Verification"],
)

TEMP_DIR = Path("temp")
TEMP_DIR.mkdir(parents=True, exist_ok=True)


@router.post(
    "/verify",
    status_code=status.HTTP_200_OK,
    summary="Verify Candidate Live Frame",
    description="""
Compare the registered candidate image with a live webcam frame.

Requirements

• JPG/JPEG/PNG only
• Maximum image size: 5 MB
• Exactly one face should be visible
• Images must not be corrupted
""",
)
async def live_verify(
    meeting_id: str = Form(...),
    candidate: UploadFile = File(...),
    webcam: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user=Depends(permission_required("live:verify")),
):

    if not meeting_id.strip():
        raise HTTPException(
            status_code=400,
            detail="Meeting ID cannot be empty.",
        )

    validate_upload(candidate)
    validate_upload(webcam)

    candidate_filename = generate_filename(candidate.filename)
    webcam_filename = generate_filename(webcam.filename)

    candidate_path = TEMP_DIR / candidate_filename
    webcam_path = TEMP_DIR / webcam_filename

    try:

        with open(candidate_path, "wb") as f:
            shutil.copyfileobj(candidate.file, f)

        with open(webcam_path, "wb") as f:
            shutil.copyfileobj(webcam.file, f)

        validate_image(candidate_path)
        validate_image(webcam_path)

        result = await verify_frame(
            db=db,
            meeting_id=meeting_id,
            candidate_path=candidate_path,
            webcam_path=webcam_path,
        )

        return result

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Verification failed: {str(e)}",
        )

    finally:
        candidate.file.close()
        webcam.file.close()

        candidate_path.unlink(missing_ok=True)
        webcam_path.unlink(missing_ok=True)