import asyncio
from app.services.event_service import attendance_marked

from datetime import datetime

from sqlalchemy.orm import Session

from app.models.attendance import Attendance


def check_in(
    db: Session,
    candidate_id: int,
    match_score: float = 0,
):

    now = datetime.now()

    late = 0

    if now.hour >= 9:

        late = max(
            0,
            (now.hour - 9) * 60 + now.minute,
        )

    attendance = Attendance(

        candidate_id=candidate_id,

        check_in=now,

        verified=True,

        status="Present",

        match_score=match_score,

        late_minutes=late,

        created_at=now,

    )

    db.add(attendance)

    db.commit()

    db.refresh(attendance)
    try:

        loop = asyncio.get_running_loop()

        loop.create_task(

            attendance_marked(attendance)

        )

    except RuntimeError:

        pass
    return attendance


def check_out(
    db: Session,
    attendance: Attendance,
):

    attendance.check_out = datetime.now()

    if attendance.check_in:

        diff = attendance.check_out - attendance.check_in

        attendance.working_hours = round(
            diff.total_seconds() / 3600,
            2,
        )

    db.commit()

    db.refresh(attendance)

    return attendance
# --------------------------------------------------
# Get All Attendance
# --------------------------------------------------

def get_all(db: Session):

    return (
        db.query(Attendance)
        .order_by(Attendance.created_at.desc())
        .all()
    )

def get_today(db: Session):

    today = datetime.now().date()

    return (

        db.query(Attendance)

        .filter(
            Attendance.created_at >= datetime.combine(
                today,
                datetime.min.time(),
            )
        )

        .all()

    )


def get_stats(db: Session):

    records = get_today(db)

    present = len(records)

    late = len(
        [
            r
            for r in records
            if r.late_minutes > 0
        ]
    )

    verified = len(
        [
            r
            for r in records
            if r.verified
        ]
    )

    return {

        "present": present,

        "late": late,

        "verified": verified,

        "attendance_rate": 100 if present else 0,

    }