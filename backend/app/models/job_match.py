from sqlalchemy import Column, Integer, Float, Text, ForeignKey
from sqlalchemy.orm import relationship

from app.database.database import Base


class JobMatch(Base):

    __tablename__ = "job_matches"

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

    match_score = Column(
        Float,
        default=0,
    )

    matching_skills = Column(
        Text,
    )

    missing_skills = Column(
        Text,
    )

    recommendation = Column(
        Text,
    )

    candidate = relationship(
        "Candidate",
        back_populates="job_match",
    )