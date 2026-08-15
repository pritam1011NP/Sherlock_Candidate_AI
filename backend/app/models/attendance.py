from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    Float,
    DateTime,
    ForeignKey,
)

from sqlalchemy.orm import relationship

from app.database.database import Base


class Attendance(Base):
    __tablename__ = "attendance"

    id = Column(Integer, primary_key=True, index=True)

    candidate_id = Column(
        Integer,
        ForeignKey("candidates.id", ondelete="CASCADE"),
        nullable=False,
    )

    check_in = Column(DateTime, nullable=True)

    check_out = Column(DateTime, nullable=True)

    working_hours = Column(Float, default=0)

    status = Column(
        String,
        default="Present",
    )

    verified = Column(
        Boolean,
        default=False,
    )

    match_score = Column(
        Float,
        default=0,
    )

    late_minutes = Column(
        Integer,
        default=0,
    )

    created_at = Column(
        DateTime,
    )

    candidate = relationship(
        "Candidate",
        back_populates="attendance",
    )