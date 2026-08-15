from pydantic import BaseModel
from typing import Optional


class ParticipantCreate(BaseModel):
    participant_id: str
    display_name: str
    email: Optional[str] = None
    camera_on: bool = False
    microphone_on: bool = False


class ParticipantResponse(BaseModel):
    id: int
    participant_id: str
    display_name: str
    email: Optional[str]
    camera_on: bool
    microphone_on: bool
    speaking_duration: float
    confidence: float

    class Config:
        from_attributes = True