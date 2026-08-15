from typing import List

from fastapi import (
    APIRouter,
    UploadFile,
    File,
    Form,
    Depends,
    HTTPException,
    status,
)
from app.schemas.candidate_status import CandidateStatusUpdate
from sqlalchemy.orm import Session

from app.database.database import get_db

from app.models.candidate import Candidate

from app.schemas.candidate import CandidateResponse

from app.services.candidate_service import (
    create_candidate,
    save_uploaded_file,
    PHOTO_DIR,
    RESUME_DIR,
)

router = APIRouter(
    prefix="/candidates",
    tags=["Candidates"],
)


# =========================================================
# Create Candidate
# =========================================================

@router.post(
    "",
    response_model=CandidateResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_candidate_api(
    full_name: str = Form(...),
    email: str = Form(...),
    phone: str = Form(...),
    position: str = Form(...),
    address: str = Form(...),
    resume: UploadFile = File(...),
    photo: UploadFile = File(...),
    db: Session = Depends(get_db),
):

    existing = (
        db.query(Candidate)
        .filter(Candidate.email == email)
        .first()
    )

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Candidate already exists.",
        )

    candidate = create_candidate(
        db=db,
        full_name=full_name,
        email=email,
        phone=phone,
        position=position,
        address=address,
        resume=resume,
        photo=photo,
    )

    return candidate


# =========================================================
# Get All Candidates
# =========================================================

@router.get(
    "",
    response_model=List[CandidateResponse],
)
def get_candidates(
    db: Session = Depends(get_db),
):

    return (
        db.query(Candidate)
        .order_by(Candidate.id.desc())
        .all()
    )


# =========================================================
# Get Candidate By ID
# =========================================================

@router.get(
    "/{candidate_id}",
    response_model=CandidateResponse,
)
def get_candidate(
    candidate_id: int,
    db: Session = Depends(get_db),
):

    candidate = (
        db.query(Candidate)
        .filter(Candidate.id == candidate_id)
        .first()
    )

    if not candidate:
        raise HTTPException(
            status_code=404,
            detail="Candidate not found.",
        )

    return candidate


# =========================================================
# Update Candidate
# =========================================================

@router.put(
    "/{candidate_id}",
    response_model=CandidateResponse,
)
def update_candidate_api(
    candidate_id: int,

    full_name: str = Form(...),
    email: str = Form(...),
    phone: str = Form(...),
    position: str = Form(...),
    address: str = Form(...),

    resume: UploadFile | None = File(None),
    photo: UploadFile | None = File(None),

    db: Session = Depends(get_db),
):

    candidate = (
        db.query(Candidate)
        .filter(Candidate.id == candidate_id)
        .first()
    )

    if candidate is None:
        raise HTTPException(
            status_code=404,
            detail="Candidate not found.",
        )

    duplicate = (
        db.query(Candidate)
        .filter(
            Candidate.email == email,
            Candidate.id != candidate_id,
        )
        .first()
    )

    if duplicate:
        raise HTTPException(
            status_code=400,
            detail="Email already exists.",
        )

    candidate.full_name = full_name
    candidate.email = email
    candidate.phone = phone
    candidate.position = position
    candidate.address = address

    if resume is not None:

        candidate.resume_path = save_uploaded_file(
            resume,
            RESUME_DIR,
        )

    if photo is not None:

        candidate.photo_path = save_uploaded_file(
            photo,
            PHOTO_DIR,
        )

    db.commit()
    db.refresh(candidate)

    return candidate


# =========================================================
# Delete Candidate
# =========================================================

@router.delete(
    "/{candidate_id}",
)
def delete_candidate(
    candidate_id: int,
    db: Session = Depends(get_db),
):

    candidate = (
        db.query(Candidate)
        .filter(Candidate.id == candidate_id)
        .first()
    )

    if candidate is None:
        raise HTTPException(
            status_code=404,
            detail="Candidate not found.",
        )

    db.delete(candidate)
    db.commit()

    return {
        "message": "Candidate deleted successfully."
    }

##### Candidate Status

@router.put("/{candidate_id}/status")
def update_candidate_status(

    candidate_id: int,

    data: CandidateStatusUpdate,

    db: Session = Depends(get_db),

):

    candidate = (

        db.query(Candidate)

        .filter(Candidate.id == candidate_id)

        .first()

    )

    if not candidate:

        raise HTTPException(

            status_code=404,

            detail="Candidate not found"

        )

    candidate.status = data.status

    db.commit()

    db.refresh(candidate)

    return {

        "message": "Status updated",

        "status": candidate.status,

    }