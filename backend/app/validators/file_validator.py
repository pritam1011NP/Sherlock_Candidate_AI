from pathlib import Path
from uuid import uuid4

from PIL import Image
from fastapi import HTTPException, UploadFile

from app.config import (
    ALLOWED_EXTENSIONS,
    MAX_UPLOAD_SIZE,
)

# -------------------------------------------------
# Configuration
# -------------------------------------------------

ALLOWED_EXTENSIONS = {
    ext.lower()
    for ext in ALLOWED_EXTENSIONS
}

ALLOWED_CONTENT_TYPES = {
    "image/jpeg",
    "image/jpg",
    "image/png",
}


# -------------------------------------------------
# File Extension Validation
# -------------------------------------------------

def validate_extension(filename: str):

    extension = Path(filename).suffix.lower()

    if extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail="Only JPG, JPEG and PNG images are allowed.",
        )


# -------------------------------------------------
# MIME Type Validation
# -------------------------------------------------

def validate_content_type(file: UploadFile):

    if file.content_type is None:
        raise HTTPException(
            status_code=400,
            detail="Unable to determine image type.",
        )

    if file.content_type.lower() not in ALLOWED_CONTENT_TYPES:
        raise HTTPException(
            status_code=400,
            detail="Only JPG, JPEG and PNG images are allowed.",
        )


# -------------------------------------------------
# File Size Validation
# -------------------------------------------------

def validate_size(file: UploadFile):

    file.file.seek(0, 2)
    size = file.file.tell()
    file.file.seek(0)

    if size == 0:
        raise HTTPException(
            status_code=400,
            detail="Uploaded file is empty.",
        )

    if size > MAX_UPLOAD_SIZE:
        raise HTTPException(
            status_code=400,
            detail="Image size exceeds 5 MB.",
        )


# -------------------------------------------------
# Image Integrity Validation
# -------------------------------------------------

def validate_image(path: Path):

    try:

        with Image.open(path) as image:
            image.verify()

    except Exception:

        if path.exists():
            path.unlink()

        raise HTTPException(
            status_code=400,
            detail="Uploaded image is corrupted.",
        )


# -------------------------------------------------
# Generate Safe Filename
# -------------------------------------------------

def generate_filename(filename: str):

    extension = Path(filename).suffix.lower()

    return f"{uuid4().hex}{extension}"


# -------------------------------------------------
# Complete Upload Validation
# -------------------------------------------------

def validate_upload(file: UploadFile):

    if file.filename is None or file.filename.strip() == "":
        raise HTTPException(
            status_code=400,
            detail="Filename is missing.",
        )

    validate_extension(file.filename)
    validate_content_type(file)
    validate_size(file)