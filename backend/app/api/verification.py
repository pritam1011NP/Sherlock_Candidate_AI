from fastapi import APIRouter, UploadFile, File
from app.face.matcher import compare
import shutil
from pathlib import Path

router = APIRouter(
    prefix="/verification",
    tags=["Verification"],
)

TEMP_DIR = Path("temp")
TEMP_DIR.mkdir(exist_ok=True)


@router.post("/")
async def verify(
    candidate: UploadFile = File(...),
    webcam: UploadFile = File(...),
):
    candidate_path = TEMP_DIR / candidate.filename
    webcam_path = TEMP_DIR / webcam.filename

    try:
        with open(candidate_path, "wb") as f:
            shutil.copyfileobj(candidate.file, f)

        with open(webcam_path, "wb") as f:
            shutil.copyfileobj(webcam.file, f)

        return compare(candidate_path, webcam_path)

    finally:
        if candidate_path.exists():
            candidate_path.unlink()

        if webcam_path.exists():
            webcam_path.unlink()