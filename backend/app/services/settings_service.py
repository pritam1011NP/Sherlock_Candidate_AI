import platform

from sqlalchemy.orm import Session

from app.models.upload import Upload
from app.models.match import Match
from app.models.interview import InterviewSession


def system_info(db: Session):

    return {
        "app_name": "Sherlock Candidate AI",
        "version": "1.0.0",
        "python_version": platform.python_version(),
        "database": "SQLite",
        "uploads": db.query(Upload).count(),
        "matches": db.query(Match).count(),
        "interviews": db.query(InterviewSession).count(),
    }


def health():

    return {
        "status": "Healthy",
        "database": "Connected",
    }