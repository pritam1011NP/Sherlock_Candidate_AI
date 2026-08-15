from sqlalchemy.orm import Session

from app.models.notification_settings import NotificationSettings


def get_notification_settings(db: Session):

    settings = db.query(NotificationSettings).first()

    if not settings:

        settings = NotificationSettings()

        db.add(settings)

        db.commit()

        db.refresh(settings)

    return settings


def update_notification_settings(db: Session, data):

    settings = get_notification_settings(db)

    for key, value in data.dict().items():

        setattr(settings, key, value)

    db.commit()

    db.refresh(settings)

    return settings


def reset_notification_settings(db: Session):

    settings = get_notification_settings(db)

    settings.email_notifications = True
    settings.sms_notifications = False
    settings.push_notifications = True

    settings.candidate_uploaded = True
    settings.interview_completed = True
    settings.candidate_shortlisted = True
    settings.candidate_rejected = False

    settings.weekly_report = True
    settings.monthly_report = True

    settings.security_alerts = True

    db.commit()

    db.refresh(settings)

    return settings