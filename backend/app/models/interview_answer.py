from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    ForeignKey,
    DateTime,
)

from sqlalchemy.sql import func

from sqlalchemy.orm import relationship

from app.database.database import Base


class InterviewAnswer(Base):

    __tablename__ = "interview_answers"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    candidate_id = Column(
        Integer,
        ForeignKey("candidates.id"),
        nullable=False,
    )

    question_number = Column(
        Integer,
        nullable=False,
    )

    question = Column(
        String(1000),
        nullable=False,
    )

    audio_path = Column(
        String(500),
        nullable=False,
    )

    transcript = Column(
        String(5000),
        default="",
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

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )

    candidate = relationship(
        "Candidate",
        back_populates="answers",
    )

    feedback = Column(

    String(3000),

    default="",

    )

    recommendation = Column(

    String(100),

    default="",

    )