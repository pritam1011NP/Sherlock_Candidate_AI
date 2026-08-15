from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.database.database import get_db

from app.schemas.notification_settings_schema import (
    NotificationSettingsResponse,
    NotificationSettingsUpdate,
)

from app.services.notification_settings_service import (
    get_notification_settings,
    update_notification_settings,
    reset_notification_settings,
)

router = APIRouter(
    prefix="/notification-settings",
    tags=["Notification Settings"],
)


@router.get(
    "/",
    response_model=NotificationSettingsResponse,
)
def read_settings(db: Session = Depends(get_db)):

    return get_notification_settings(db)


@router.put(
    "/",
    response_model=NotificationSettingsResponse,
)
def save_settings(
    data: NotificationSettingsUpdate,
    db: Session = Depends(get_db),
):

    return update_notification_settings(db, data)


@router.post(
    "/reset",
    response_model=NotificationSettingsResponse,
)
def restore_defaults(db: Session = Depends(get_db)):

    return reset_notification_settings(db)