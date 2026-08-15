from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func

from app.database.database import Base

class ProctorEvent(Base):

    __tablename__ = "proctor_events"

    id = Column(Integer, primary_key=True)

    candidate_id = Column(Integer)

    event = Column(String)

    created_at = Column(
        DateTime,
        server_default=func.now(),
    )