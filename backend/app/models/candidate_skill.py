from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import ForeignKey

from sqlalchemy.orm import relationship

from app.database.database import Base


class CandidateSkill(Base):

    __tablename__ = "candidate_skills"

    id = Column(
        Integer,
        primary_key=True,
    )

    candidate_id = Column(
        Integer,
        ForeignKey("candidates.id"),
    )

    skill = Column(
        String(100),
    )

    candidate = relationship(
        "Candidate",
        back_populates="skills",
    )