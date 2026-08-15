from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.services.dashboard_service import (
    get_success_rate,
    get_daily_matches,
    get_daily_uploads,
)
from app.services.analytics_service import get_dashboard_analytics

router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"],
)

@router.get("/")
def analytics(
    db: Session = Depends(get_db),
):
    return get_dashboard_analytics(db)


@router.get("/success-rate")
def success_rate(
    db: Session = Depends(get_db),
):
    return get_success_rate(db)


@router.get("/daily-uploads")
def daily_uploads(
    db: Session = Depends(get_db),
):
    return get_daily_uploads(db)


@router.get("/daily-matches")
def daily_matches(
    db: Session = Depends(get_db),
):
    return get_daily_matches(db)