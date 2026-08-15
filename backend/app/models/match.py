from datetime import datetime

from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    Float,
    Integer,
    String,
)

from app.database.database import Base


class Match(Base):

    __tablename__ = "matches"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    candidate_filename = Column(
        String,
        nullable=False
    )

    participant_filename = Column(
        String,
        nullable=False
    )

    similarity = Column(
        Float,
        nullable=False
    )

    matched = Column(
        Boolean,
        nullable=False,
        default=False
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )