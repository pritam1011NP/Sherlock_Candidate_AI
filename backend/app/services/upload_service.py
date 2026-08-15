import asyncio
import shutil
from pathlib import Path

from fastapi import HTTPException
from deepface import DeepFace
from sqlalchemy.orm import Session

from app.face.config import (
    CANDIDATE_DIR,
    PARTICIPANT_DIR,
)
from app.services.event_service import resume_uploaded
from app.models.upload import Upload

from app.services.audit_service import log_action
from app.services.upload_record_service import create_upload

from app.validators.file_validator import (
    validate_upload,
    validate_image,
    generate_filename,
)


# -------------------------------------------------
# Save Image
# -------------------------------------------------

def save_image(file, folder: Path):

    validate_upload(file)

    filename = generate_filename(file.filename)

    filepath = folder / filename

    try:

        with open(filepath, "wb") as buffer:
            shutil.copyfileobj(
                file.file,
                buffer,
            )

        validate_image(filepath)

        return filepath, filename

    except Exception as e:

        if filepath.exists():
            filepath.unlink()

        raise HTTPException(
            status_code=400,
            detail=f"Unable to save image. {str(e)}",
        )


# -------------------------------------------------
# Face Validation
# -------------------------------------------------

def validate_face(image_path: Path):

    try:

        faces = DeepFace.extract_faces(
            img_path=str(image_path),
            detector_backend="retinaface",
            enforce_detection=True,
        )

        return len(faces) == 1

    except Exception:
        return False


# -------------------------------------------------
# Generate Face Embedding
# -------------------------------------------------

def generate_embedding(image_path: Path):

    try:

        embedding = DeepFace.represent(
            img_path=str(image_path),
            model_name="Facenet512",
            detector_backend="retinaface",
            enforce_detection=True,
        )

        return embedding

    except Exception:

        raise HTTPException(
            status_code=400,
            detail="Unable to generate face embedding.",
        )


# -------------------------------------------------
# Duplicate Detection (Placeholder)
# -------------------------------------------------

def check_duplicate_face(
    db: Session,
    embedding,
):
    """
    Future implementation.
    """
    return None


# -------------------------------------------------
# Generic Upload Pipeline
# -------------------------------------------------

def process_upload(
    db: Session,
    file,
    folder: Path,
    image_type: str,
    uploaded_by: str,
):

    filepath, filename = save_image(
        file=file,
        folder=folder,
    )

    try:

        if not validate_face(filepath):

            raise HTTPException(
                status_code=400,
                detail="Exactly one face must be present in the image.",
            )

        embedding = generate_embedding(filepath)

        duplicate = check_duplicate_face(
            db,
            embedding,
        )

        if duplicate is not None:

            raise HTTPException(
                status_code=409,
                detail="Duplicate face detected.",
            )

        create_upload(
            db=db,
            filename=filename,
            image_type=image_type,
            uploaded_by=uploaded_by,
        )

        log_action(
            db=db,
            username=uploaded_by,
            action=f"UPLOAD_{image_type.upper()}",
            details=filename,
        )

        # -----------------------------
        # Notify Dashboard (WebSocket)
        # -----------------------------
        try:
            loop = asyncio.get_running_loop()
            loop.create_task(
                resume_uploaded(filename)
            )
        except RuntimeError:
            pass

        return {
            "success": True,
            "filename": filename,
            "message": f"{image_type.capitalize()} uploaded successfully.",
        }

    except Exception:

        if filepath.exists():
            filepath.unlink()

        raise


# -------------------------------------------------
# Candidate Upload
# -------------------------------------------------

def save_candidate(
    db: Session,
    file,
    uploaded_by: str,
):

    return process_upload(
        db=db,
        file=file,
        folder=CANDIDATE_DIR,
        image_type="candidate",
        uploaded_by=uploaded_by,
    )


# -------------------------------------------------
# Participant Upload
# -------------------------------------------------

def save_participant(
    db: Session,
    file,
    uploaded_by: str,
):

    return process_upload(
        db=db,
        file=file,
        folder=PARTICIPANT_DIR,
        image_type="participant",
        uploaded_by=uploaded_by,
    )


# -------------------------------------------------
# Delete Upload
# -------------------------------------------------

def delete_upload(
    upload_id: int,
    db: Session,
):

    upload = (
        db.query(Upload)
        .filter(Upload.id == upload_id)
        .first()
    )

    if upload is None:
        return None

    if upload.image_type == "candidate":
        image_path = CANDIDATE_DIR / upload.filename
    else:
        image_path = PARTICIPANT_DIR / upload.filename

    if image_path.exists():
        image_path.unlink()

    log_action(
        db=db,
        username="system",
        action="DELETE_UPLOAD",
        details=upload.filename,
    )

    db.delete(upload)
    db.commit()



    return upload