from pathlib import Path
import uuid


def get_extension(filename: str) -> str:
    return Path(filename).suffix.lower()


def unique_filename(filename: str) -> str:
    ext = get_extension(filename)
    return f"{uuid.uuid4().hex}{ext}"