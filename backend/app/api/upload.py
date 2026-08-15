from fastapi import (
    APIRouter,
    UploadFile,
    File,
    Depends,
    HTTPException,
    status,
    Request,
)

from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.upload import UploadResponse
from app.services.upload_service import (
    save_candidate,
    save_participant,
)
from app.auth.jwt import permission_required
from app.core.rate_limit import limiter

router = APIRouter(
    prefix="/upload",
    tags=["Upload"],
)


# ---------------------------------------------------------
# Upload Candidate
# ---------------------------------------------------------

@router.post(
    "/candidate",
    response_model=UploadResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Upload Candidate Image",
    description="""
Upload a candidate image.

Requirements

• JPG / JPEG / PNG only

• Maximum file size: 5 MB

• Exactly one face

• Duplicate images are rejected

• Corrupted images are rejected
""",
)
@limiter.limit("20/minute")
def upload_candidate(
    request: Request,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user=Depends(
        permission_required("upload:create")
    ),
):

    if not file.filename or file.filename.strip() == "":
        raise HTTPException(
            status_code=400,
            detail="Filename is missing.",
        )

    return save_candidate(
        db=db,
        file=file,
        uploaded_by=current_user["username"],
    )


# ---------------------------------------------------------
# Upload Participant
# ---------------------------------------------------------

@router.post(
    "/participant",
    response_model=UploadResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Upload Participant Image",
    description="""
Upload a participant image.

Requirements

• JPG / JPEG / PNG only

• Maximum file size: 5 MB

• Exactly one face

• Duplicate images are rejected

• Corrupted images are rejected
""",
)
@limiter.limit("20/minute")
def upload_participant(
    request: Request,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user=Depends(
        permission_required("upload:create")
    ),
):

    if not file.filename or file.filename.strip() == "":
        raise HTTPException(
            status_code=400,
            detail="Filename is missing.",
        )

    return save_participant(
        db=db,
        file=file,
        uploaded_by=current_user["username"],
    )