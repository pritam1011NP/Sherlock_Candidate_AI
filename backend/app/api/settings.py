from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db

from app.services.settings_service import (
    system_info,
    health,
)

from app.schemas.settings import (
    SystemInfo,
    HealthResponse,
)

router = APIRouter(
    prefix="/settings",
    tags=["System"],
)


@router.get(
    "/system",
    response_model=SystemInfo,
)
def get_system_info(
    db: Session = Depends(get_db),
):
    return system_info(db)


@router.get(
    "/health",
    response_model=HealthResponse,
)
def health_check():
    return health()