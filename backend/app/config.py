import os
from pathlib import Path

from dotenv import load_dotenv

load_dotenv()


# -----------------------------------------------------
# Application
# -----------------------------------------------------

APP_NAME = os.getenv(
    "APP_NAME",
    "Sherlock Candidate AI",
)

HOST = os.getenv(
    "HOST",
    "127.0.0.1",
)

PORT = int(
    os.getenv(
        "PORT",
        8000,
    )
)

DEBUG = (
    os.getenv(
        "DEBUG",
        "False",
    ).lower()
    == "true"
)


# -----------------------------------------------------
# Database
# -----------------------------------------------------

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "sqlite:///./sherlock.db",
)


# -----------------------------------------------------
# JWT
# -----------------------------------------------------

SECRET_KEY = os.getenv(
    "SECRET_KEY",
    "CHANGE_ME",
)

ALGORITHM = os.getenv(
    "ALGORITHM",
    "HS256",
)

ACCESS_TOKEN_EXPIRE_MINUTES = int(
    os.getenv(
        "ACCESS_TOKEN_EXPIRE_MINUTES",
        60,
    )
)

REFRESH_TOKEN_EXPIRE_DAYS = int(
    os.getenv(
        "REFRESH_TOKEN_EXPIRE_DAYS",
        7,
    )
)


# -----------------------------------------------------
# Upload Settings
# -----------------------------------------------------

MAX_UPLOAD_SIZE = int(
    os.getenv(
        "MAX_UPLOAD_SIZE",
        5242880,
    )
)

ALLOWED_EXTENSIONS = (
    os.getenv(
        "ALLOWED_EXTENSIONS",
        ".jpg,.jpeg,.png",
    )
    .lower()
    .split(",")
)

UPLOAD_FOLDER = Path(
    os.getenv(
        "UPLOAD_FOLDER",
        "uploads",
    )
)

TEMP_FOLDER = Path(
    os.getenv(
        "TEMP_FOLDER",
        "temp",
    )
)


# -----------------------------------------------------
# Face Recognition
# -----------------------------------------------------

FACE_DETECTOR = os.getenv(
    "FACE_DETECTOR",
    "retinaface",
)

FACE_MODEL = os.getenv(
    "FACE_MODEL",
    "Facenet512",
)

MIN_CONFIDENCE = float(
    os.getenv(
        "MIN_CONFIDENCE",
        70,
    )
)

MAX_FAILED_ATTEMPTS = int(
    os.getenv(
        "MAX_FAILED_ATTEMPTS",
        3,
    )
)


# -----------------------------------------------------
# Interview
# -----------------------------------------------------

INTERVIEW_TIMEOUT_MINUTES = int(
    os.getenv(
        "INTERVIEW_TIMEOUT_MINUTES",
        60,
    )
)