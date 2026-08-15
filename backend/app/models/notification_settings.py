from sqlalchemy import (
    Column,
    Integer,
    Boolean,
)

from app.database.database import Base


class NotificationSettings(Base):

    __tablename__ = "notification_settings"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    email_notifications = Column(
        Boolean,
        default=True,
    )

    sms_notifications = Column(
        Boolean,
        default=False,
    )

    push_notifications = Column(
        Boolean,
        default=True,
    )

    candidate_uploaded = Column(
        Boolean,
        default=True,
    )

    interview_completed = Column(
        Boolean,
        default=True,
    )

    candidate_shortlisted = Column(
        Boolean,
        default=True,
    )

    candidate_rejected = Column(
        Boolean,
        default=False,
    )

    weekly_report = Column(
        Boolean,
        default=True,
    )

    monthly_report = Column(
        Boolean,
        default=True,
    )

    security_alerts = Column(
        Boolean,
        default=True,
    )