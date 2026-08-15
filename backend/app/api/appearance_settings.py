from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db

from app.schemas.appearance_settings import (
    AppearanceSettingsResponse,
    AppearanceSettingsUpdate,
)

from app.services.appearance_settings_service import (
    get_settings,
    update_settings,
    reset_settings,
)

router = APIRouter(
    prefix="/appearance-settings",
    tags=["Appearance Settings"],
)


@router.get(
    "/",
    response_model=AppearanceSettingsResponse,
    summary="Get appearance settings",
)
def read_settings(
    db: Session = Depends(get_db),
):
    return get_settings(db)


@router.put(
    "/",
    response_model=AppearanceSettingsResponse,
    summary="Update appearance settings",
)
def save_settings(
    payload: AppearanceSettingsUpdate,
    db: Session = Depends(get_db),
):
    return update_settings(
        db=db,
        payload=payload,
    )


@router.post(
    "/reset",
    response_model=AppearanceSettingsResponse,
    summary="Reset appearance settings",
)
def reset(
    db: Session = Depends(get_db),
):
    return reset_settings(db)