from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db

from app.schemas.interview_settings import (
    InterviewSettingsResponse,
    InterviewSettingsUpdate,
)

from app.services.interview_settings_service import (
    get_interview_settings,
    update_interview_settings,
    reset_interview_settings,
)

router = APIRouter(
    prefix="/settings/interview",
    tags=["Interview Settings"],
)


@router.get(
    "/",
    response_model=InterviewSettingsResponse,
)
def get_settings(
    db: Session = Depends(get_db),
):
    return get_interview_settings(db)


@router.put(
    "/",
    response_model=InterviewSettingsResponse,
)
def update_settings(
    payload: InterviewSettingsUpdate,
    db: Session = Depends(get_db),
):
    return update_interview_settings(
        db,
        payload,
    )


@router.post(
    "/reset",
    response_model=InterviewSettingsResponse,
)
def reset_settings(
    db: Session = Depends(get_db),
):
    return reset_interview_settings(db)