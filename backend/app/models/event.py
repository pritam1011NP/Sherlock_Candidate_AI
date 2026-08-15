from datetime import datetime

from sqlalchemy import Column, Integer, String, DateTime

from app.database.database import Base


class Event(Base):

    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)

    participant_id = Column(String, nullable=False)

    event_type = Column(String, nullable=False)

    event_value = Column(String, nullable=True)

    timestamp = Column(DateTime, default=datetime.utcnow)