from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    Boolean,
)

from app.database.database import Base


class InterviewSettings(Base):

    __tablename__ = "interview_settings"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    # ------------------------------------------------
    # AI Configuration
    # ------------------------------------------------

    provider = Column(
        String,
        default="OpenAI",
    )

    model = Column(
        String,
        default="gpt-4.1",
    )

    # ------------------------------------------------
    # Passing Criteria
    # ------------------------------------------------

    passing_score = Column(
        Float,
        default=70,
    )

    # ------------------------------------------------
    # Evaluation Modules
    # ------------------------------------------------

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

    behavior_analysis = Column(
        Boolean,
        default=True,
    )

    emotion_detection = Column(
        Boolean,
        default=True,
    )

    eye_contact_detection = Column(
        Boolean,
        default=True,
    )

    # ------------------------------------------------
    # Difficulty
    # ------------------------------------------------

    difficulty = Column(
        String,
        default="Medium",
    )

    # ------------------------------------------------
    # Recommendation
    # ------------------------------------------------

    enable_ai_recommendation = Column(
        Boolean,
        default=True,
    )

    enable_ai_summary = Column(
        Boolean,
        default=True,
    )

    # ------------------------------------------------
    # Proctoring
    # ------------------------------------------------

    face_verification = Column(
        Boolean,
        default=True,
    )

    multiple_face_detection = Column(
        Boolean,
        default=True,
    )

    tab_switch_detection = Column(
        Boolean,
        default=True,
    )

    voice_monitoring = Column(
        Boolean,
        default=True,
    )

    # ------------------------------------------------
    # Automation
    # ------------------------------------------------

    auto_score = Column(
        Boolean,
        default=True,
    )

    auto_save = Column(
        Boolean,
        default=True,
    )

    auto_generate_report = Column(
        Boolean,
        default=True,
    )

    auto_notify = Column(
        Boolean,
        default=True,
    )