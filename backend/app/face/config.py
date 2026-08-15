from pathlib import Path

# backend/app/face
FACE_DIR = Path(__file__).resolve().parent

# backend/app
APP_DIR = FACE_DIR.parent

# backend
BASE_DIR = APP_DIR.parent

# Upload folders
UPLOAD_DIR = APP_DIR / "uploads"

CANDIDATE_DIR = UPLOAD_DIR / "candidate"
PARTICIPANT_DIR = UPLOAD_DIR / "participants"
EMBEDDING_DIR = UPLOAD_DIR / "embeddings"

for folder in [
    UPLOAD_DIR,
    CANDIDATE_DIR,
    PARTICIPANT_DIR,
    EMBEDDING_DIR
]:
    folder.mkdir(parents=True, exist_ok=True)

CASCADE_PATH = FACE_DIR / "haarcascade_frontalface_default.xml"