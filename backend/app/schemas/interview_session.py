from datetime import datetime

from pydantic import BaseModel, ConfigDict


class InterviewSessionResponse(BaseModel):

    model_config = ConfigDict(from_attributes=True)

    id: int

    candidate_upload_id: int

    session_token: str

    status: str

    confidence: float

    started_at: datetime

    ended_at: datetime | None = None