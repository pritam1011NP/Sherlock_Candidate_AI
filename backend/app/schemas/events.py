from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class EventCreate(BaseModel):

    participant_id: str

    event_type: str

    event_value: Optional[str] = None


class EventResponse(BaseModel):

    id: int

    participant_id: str

    event_type: str

    event_value: Optional[str]

    timestamp: datetime

    class Config:
        from_attributes = True