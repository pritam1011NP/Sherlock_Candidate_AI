from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db

from app.auth.jwt import permission_required

from app.schemas.ai_settings import (
    AISettingsResponse,
    AISettingsUpdate,
)

from app.services.ai_settings_service import (
    get_ai_settings,
    update_ai_settings,
    reset_ai_settings,
)

router = APIRouter(
    prefix="/ai/settings",
    tags=["AI Settings"],
)


# ---------------------------------------
# Get AI Settings
# ---------------------------------------

@router.get(
    "/",
    response_model=AISettingsResponse,
)
def get_settings(
    db: Session = Depends(get_db),
    current_user=Depends(
        permission_required("settings:view")
    ),
):
    return get_ai_settings(db)


# ---------------------------------------
# Update AI Settings
# ---------------------------------------

@router.put(
    "/",
    response_model=AISettingsResponse,
)
def update_settings(
    data: AISettingsUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(
        permission_required("settings:edit")
    ),
):
    return update_ai_settings(
        db,
        data,
    )


# ---------------------------------------
# Reset AI Settings
# ---------------------------------------

@router.post(
    "/reset",
    response_model=AISettingsResponse,
)
def reset_settings(
    db: Session = Depends(get_db),
    current_user=Depends(
        permission_required("settings:edit")
    ),
):
    return reset_ai_settings(db)