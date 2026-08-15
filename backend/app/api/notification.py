from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db

from app.services.notification_service import (
    create_notification,
    get_notifications,
    mark_as_read,
)

router = APIRouter(
    prefix="/notifications",
    tags=["Notifications"],
)


@router.get("/")
def all_notifications(
    db: Session = Depends(get_db),
):
    return get_notifications(db)


@router.post("/")
def add_notification(
    title: str,
    message: str,
    db: Session = Depends(get_db),
):
    return create_notification(
        db,
        title,
        message,
    )


@router.put("/{notification_id}")
def read_notification(
    notification_id: int,
    db: Session = Depends(get_db),
):
    return mark_as_read(
        db,
        notification_id,
    )