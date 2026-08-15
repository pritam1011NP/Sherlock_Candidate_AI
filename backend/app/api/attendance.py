from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db

from app.schemas.attendance import (
    AttendanceCreate,
    AttendanceResponse,
)

from app.services.attendance_service import (
    check_in,
    check_out,
    get_today,
    get_stats,
    get_all,
)

router = APIRouter(
    prefix="/attendance",
    tags=["Attendance"],
)


# --------------------------------------------------
# Get All Attendance Records
# --------------------------------------------------

@router.get(
    "/",
    response_model=list[AttendanceResponse],
)
def all_attendance(
    db: Session = Depends(get_db),
):
    return get_all(db)


# --------------------------------------------------
# Check In
# --------------------------------------------------

@router.post(
    "/checkin",
    response_model=AttendanceResponse,
)
def attendance_checkin(
    data: AttendanceCreate,
    db: Session = Depends(get_db),
):
    return check_in(
        db,
        data.candidate_id,
        data.match_score,
    )


# --------------------------------------------------
# Today's Attendance
# --------------------------------------------------

@router.get(
    "/today",
    response_model=list[AttendanceResponse],
)
def today_attendance(
    db: Session = Depends(get_db),
):
    return get_today(db)


# --------------------------------------------------
# Attendance Statistics
# --------------------------------------------------

@router.get("/stats")
def attendance_stats(
    db: Session = Depends(get_db),
):
    return get_stats(db)