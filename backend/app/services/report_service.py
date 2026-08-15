from sqlalchemy.orm import Session
from sqlalchemy import func, extract

from app.models.candidate import Candidate
from app.models.interview import InterviewSession


def get_reports_dashboard(db: Session):

    candidate_rows = (
        db.query(
            extract("month", Candidate.created_at).label("month"),
            func.count(Candidate.id)
        )
        .group_by(extract("month", Candidate.created_at))
        .order_by(extract("month", Candidate.created_at))
        .all()
    )

    interview_rows = (
        db.query(
            extract("month", InterviewSession.created_at).label("month"),
            func.count(InterviewSession.id)
        )
        .group_by(extract("month", InterviewSession.created_at))
        .order_by(extract("month", InterviewSession.created_at))
        .all()
    )

    months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ]

    candidate_growth = []

    for month, value in candidate_rows:

        candidate_growth.append(
            {
                "month": months[int(month) - 1],
                "value": value,
            }
        )

    interviews = []

    for month, value in interview_rows:

        interviews.append(
            {
                "month": months[int(month) - 1],
                "value": value,
            }
        )

    return {
        "candidate_growth": candidate_growth,
        "interviews": interviews,
    }