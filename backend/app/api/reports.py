from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db

from app.schemas.report import ReportsDashboardResponse

from app.services.report_service import (
    get_reports_dashboard,
)

router = APIRouter(
    prefix="/reports",
    tags=["Reports"],
)


@router.get(
    "/dashboard",
    response_model=ReportsDashboardResponse,
)
def dashboard(
    db: Session = Depends(get_db),
):

    return get_reports_dashboard(db)