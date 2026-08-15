from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    DateTime,
    ForeignKey,
)

from sqlalchemy.sql import func

from app.database.database import Base


class InterviewSession(Base):

    __tablename__ = "interview_sessions"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    candidate_upload_id = Column(
        Integer,
        ForeignKey("uploads.id"),
        nullable=False,
    )

    session_token = Column(
        String,
        unique=True,
        nullable=False,
    )

    status = Column(
        String,
        default="running",
    )

    confidence = Column(
        Float,
        default=100.0,
    )

    started_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )

    ended_at = Column(
        DateTime(timezone=True),
        nullable=True,
    )
    created_at = Column(
        DateTime(timezone=True),
        nullable=True,
    )