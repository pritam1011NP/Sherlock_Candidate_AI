from datetime import datetime

from pydantic import BaseModel, ConfigDict


class UploadResponse(BaseModel):

    success: bool

    filename: str

    message: str


class UploadRecord(BaseModel):

    id: int

    filename: str

    image_type: str

    image_hash: str | None = None

    embedding_path: str | None = None

    face_quality: float

    verified: bool

    uploaded_by: str | None = None

    created_at: datetime

    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )