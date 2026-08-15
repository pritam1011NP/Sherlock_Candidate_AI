from sqlalchemy.orm import Session
from app.models.notification import Notification


def create_notification(
    db: Session,
    title: str,
    message: str,
):

    notification = Notification(
        title=title,
        message=message,
        is_read=False,
    )

    db.add(notification)
    db.commit()
    db.refresh(notification)

    return notification


def get_notifications(db: Session):

    return (
        db.query(Notification)
        .order_by(Notification.created_at.desc())
        .all()
    )


def mark_as_read(
    db: Session,
    notification_id: int,
):

    notification = (
        db.query(Notification)
        .filter(Notification.id == notification_id)
        .first()
    )

    if notification:

        notification.is_read = True
        db.commit()

    return notification