from sqlalchemy import Boolean
from sqlalchemy import Column
from sqlalchemy import Float
from sqlalchemy import Integer
from sqlalchemy import String

from app.database.database import Base


class Participant(Base):

    __tablename__ = "participants"

    id = Column(Integer, primary_key=True, index=True)

    participant_id = Column(String, unique=True)

    display_name = Column(String)

    email = Column(String)

    camera_on = Column(Boolean, default=False)

    microphone_on = Column(Boolean, default=False)

    speaking_duration = Column(Float, default=0)

    confidence = Column(Float, default=0)