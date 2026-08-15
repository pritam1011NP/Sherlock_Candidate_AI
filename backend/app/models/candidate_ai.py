from sqlalchemy import Column, Integer, Float, ForeignKey
from sqlalchemy.orm import relationship

from app.database.database import Base


class CandidateAI(Base):

    __tablename__ = "candidate_ai"

    id = Column(Integer, primary_key=True, index=True)

    candidate_id = Column(
        Integer,
        ForeignKey("candidates.id", ondelete="CASCADE"),
        unique=True,
    )

    overall_score = Column(Float, default=0)

    resume_score = Column(Float, default=0)

    interview_score = Column(Float, default=0)

    face_score = Column(Float, default=0)

    skill_score = Column(Float, default=0)

    experience_score = Column(Float, default=0)

    education_score = Column(Float, default=0)

    fraud_risk = Column(Float, default=0)

    candidate = relationship(
        "Candidate",
        back_populates="ai_result",
    )