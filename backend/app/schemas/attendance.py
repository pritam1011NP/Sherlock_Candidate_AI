from datetime import datetime

from pydantic import BaseModel


class AttendanceCreate(BaseModel):

    candidate_id: int

    match_score: float = 0


class AttendanceResponse(BaseModel):

    id: int

    candidate_id: int

    check_in: datetime | None

    check_out: datetime | None

    working_hours: float

    status: str

    verified: bool

    match_score: float

    late_minutes: int

    created_at: datetime | None

    class Config:

        from_attributes = True