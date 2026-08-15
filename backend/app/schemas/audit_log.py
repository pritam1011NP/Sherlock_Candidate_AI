from datetime import datetime

from pydantic import BaseModel


class AuditLogResponse(BaseModel):

    id: int
    username: str
    action: str
    details: str | None
    created_at: datetime

    class Config:
        from_attributes = True