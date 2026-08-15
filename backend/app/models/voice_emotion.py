from sqlalchemy import Column, Integer, Float, String, DateTime, ForeignKey
from sqlalchemy.sql import func

from app.database.database import Base


class VoiceEmotion(Base):

    __tablename__ = "voice_emotions"

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

    interview_answer_id = Column(
        Integer,
        ForeignKey("interview_answers.id"),
        nullable=False,
    )

    dominant_emotion = Column(
        String,
        default="Neutral",
    )

    confidence = Column(
        Float,
        default=0,
    )

    happy = Column(
        Float,
        default=0,
    )

    neutral = Column(
        Float,
        default=0,
    )

    sad = Column(
        Float,
        default=0,
    )

    angry = Column(
        Float,
        default=0,
    )

    fear = Column(
        Float,
        default=0,
    )

    disgust = Column(
        Float,
        default=0,
    )

    surprise = Column(
        Float,
        default=0,
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )