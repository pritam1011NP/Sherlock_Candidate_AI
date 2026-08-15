from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
)

from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.database.database import Base


class Candidate(Base):

    __tablename__ = "candidates"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    full_name = Column(
        String(200),
        nullable=False,
    )

    email = Column(
        String(200),
        unique=True,
        nullable=False,
    )

    phone = Column(
        String(30),
    )

    position = Column(
        String(150),
    )

    address = Column(
        String(500),
    )

    status = Column(
        String(50),
        default="Pending",
        nullable=False,
    )

    resume_path = Column(
        String(500),
    )

    photo_path = Column(
        String(500),
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )

    answers = relationship(
    "InterviewAnswer",
    back_populates="candidate",
    cascade="all, delete",
    )

    attendance = relationship(
    "Attendance",
    back_populates="candidate",
    cascade="all, delete-orphan",
    )

    ai_result = relationship(
    "CandidateAI",
    back_populates="candidate",
    uselist=False,
    cascade="all, delete-orphan",
    )

    skills = relationship(

    "CandidateSkill",

    back_populates="candidate",

    cascade="all,delete",

    )
    job_match = relationship(
    "JobMatch",
    uselist=False,
    back_populates="candidate",
    cascade="all, delete-orphan",
    )