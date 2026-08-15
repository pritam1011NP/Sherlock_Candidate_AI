from datetime import datetime

from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    Boolean,
    Text,
    DateTime,
)

from app.database.database import Base


class AISettings(Base):

    __tablename__ = "ai_settings"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    # -------------------------------------
    # AI Provider
    # -------------------------------------

    provider = Column(
        String,
        default="OpenAI",
        nullable=False,
    )

    model = Column(
        String,
        default="gpt-5.5",
        nullable=False,
    )

    api_key = Column(
        Text,
        nullable=True,
    )

    temperature = Column(
        Float,
        default=0.2,
    )

    max_tokens = Column(
        Integer,
        default=4096,
    )

    # -------------------------------------
    # Resume AI
    # -------------------------------------

    enable_resume_parser = Column(
        Boolean,
        default=True,
    )

    enable_skill_extraction = Column(
        Boolean,
        default=True,
    )

    enable_experience_analysis = Column(
        Boolean,
        default=True,
    )

    enable_education_analysis = Column(
        Boolean,
        default=True,
    )

    resume_threshold = Column(
        Integer,
        default=70,
    )

    # -------------------------------------
    # Candidate Matching
    # -------------------------------------

    enable_matching = Column(
        Boolean,
        default=True,
    )

    matching_threshold = Column(
        Integer,
        default=80,
    )

    similarity_algorithm = Column(
        String,
        default="Cosine Similarity",
    )

    maximum_matches = Column(
        Integer,
        default=10,
    )

    # -------------------------------------
    # Interview AI
    # -------------------------------------

    enable_interview_ai = Column(
        Boolean,
        default=True,
    )

    technical_evaluation = Column(
        Boolean,
        default=True,
    )

    communication_evaluation = Column(
        Boolean,
        default=True,
    )

    confidence_evaluation = Column(
        Boolean,
        default=True,
    )

    recommendation_enabled = Column(
        Boolean,
        default=True,
    )

    summary_enabled = Column(
        Boolean,
        default=True,
    )

    passing_score = Column(
        Integer,
        default=75,
    )

    # -------------------------------------
    # Face Verification
    # -------------------------------------

    enable_face_verification = Column(
        Boolean,
        default=True,
    )

    face_threshold = Column(
        Integer,
        default=85,
    )

    max_verification_attempts = Column(
        Integer,
        default=3,
    )

    # -------------------------------------
    # Prompt Configuration
    # -------------------------------------

    system_prompt = Column(
        Text,
        nullable=True,
    )

    resume_prompt = Column(
        Text,
        nullable=True,
    )

    interview_prompt = Column(
        Text,
        nullable=True,
    )

    matching_prompt = Column(
        Text,
        nullable=True,
    )

    # -------------------------------------
    # Logging
    # -------------------------------------

    store_prompts = Column(
        Boolean,
        default=True,
    )

    store_ai_responses = Column(
        Boolean,
        default=True,
    )

    store_scores = Column(
        Boolean,
        default=True,
    )

    # -------------------------------------
    # Timestamps
    # -------------------------------------

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
    )

    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
    )