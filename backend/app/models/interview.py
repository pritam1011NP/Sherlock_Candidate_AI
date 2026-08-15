from datetime import datetime

from sqlalchemy import Column
from sqlalchemy import DateTime
from sqlalchemy import Float
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Text

from app.database.database import Base


class InterviewSession(Base):

    __tablename__ = "interviews"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    meeting_id = Column(
        String,
        unique=True,
        nullable=False
    )

    candidate_name = Column(
        String,
        nullable=False
    )

    candidate_email = Column(
        String,
        nullable=False
    )

    status = Column(
        String,
        nullable=False,
        default="Pending"
    )

    confidence = Column(
        Float,
        nullable=False,
        default=0.0
    )

    failed_attempts = Column(
        Integer,
        nullable=False,
        default=0
    )

    verification_count = Column(
        Integer,
        nullable=False,
        default=0
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )

    technical_score = Column(
    Float,
    default=0,
    )

    communication_score = Column(
    Float,
    default=0,
    )

    confidence_score = Column(
    Float,
    default=0,
    )

    overall_score = Column(
    Float,
    default=0,
    )

    recommendation = Column(
    String,
    default="Pending",
    )

    ai_summary = Column(
    Text,
    )

    duration = Column(
    Integer,
    default=0,
    )