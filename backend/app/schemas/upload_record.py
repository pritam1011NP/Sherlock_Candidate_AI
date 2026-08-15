from datetime import datetime

from pydantic import BaseModel


class UploadRecord(BaseModel):

    id: int
    filename: str
    image_type: str
    created_at: datetime

    class Config:
        from_attributes = True