from pathlib import Path

from sqlalchemy.orm import Session

from app.models.upload import Upload
from app.face.config import (
    CANDIDATE_DIR,
    PARTICIPANT_DIR,
)


# -------------------------------------------------
# Create Upload Record
# -------------------------------------------------

def create_upload(
    db: Session,
    filename: str,
    image_type: str,
    image_hash: str | None = None,
    embedding_path: str | None = None,
    face_quality: float = 0.0,
    verified: bool = False,
    uploaded_by: str | None = None,
):

    upload = Upload(
        filename=filename,
        image_type=image_type,
        image_hash=image_hash,
        embedding_path=embedding_path,
        face_quality=face_quality,
        verified=verified,
        uploaded_by=uploaded_by,
    )

    db.add(upload)
    db.commit()
    db.refresh(upload)

    return upload


# -------------------------------------------------
# Get All Uploads
# -------------------------------------------------

def get_uploads(
    db: Session,
):

    return (
        db.query(Upload)
        .order_by(
            Upload.created_at.desc()
        )
        .all()
    )


# -------------------------------------------------
# Get Single Upload
# -------------------------------------------------

def get_upload(
    upload_id: int,
    db: Session,
):

    return (
        db.query(Upload)
        .filter(
            Upload.id == upload_id
        )
        .first()
    )


# -------------------------------------------------
# Mark Upload Verified
# -------------------------------------------------

def verify_upload(
    upload_id: int,
    db: Session,
):

    upload = get_upload(
        upload_id,
        db,
    )

    if upload is None:
        return None

    upload.verified = True

    db.commit()
    db.refresh(upload)

    return upload


# -------------------------------------------------
# Update Face Quality
# -------------------------------------------------

def update_face_quality(
    upload_id: int,
    quality: float,
    db: Session,
):

    upload = get_upload(
        upload_id,
        db,
    )

    if upload is None:
        return None

    upload.face_quality = quality

    db.commit()
    db.refresh(upload)

    return upload


# -------------------------------------------------
# Update Embedding
# -------------------------------------------------

def update_embedding(
    upload_id: int,
    embedding_path: str,
    image_hash: str,
    db: Session,
):

    upload = get_upload(
        upload_id,
        db,
    )

    if upload is None:
        return None

    upload.embedding_path = embedding_path
    upload.image_hash = image_hash

    db.commit()
    db.refresh(upload)

    return upload


# -------------------------------------------------
# Delete Upload
# -------------------------------------------------

def delete_upload(
    upload_id: int,
    db: Session,
):

    upload = (
        db.query(Upload)
        .filter(
            Upload.id == upload_id
        )
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

    if upload.embedding_path:

        embedding_file = Path(
            upload.embedding_path
        )

        if embedding_file.exists():
            embedding_file.unlink()

    db.delete(upload)
    db.commit()

    return upload