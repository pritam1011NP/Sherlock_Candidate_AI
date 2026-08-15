from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.auth.jwt import permission_required

from app.services.dashboard_service import (
    get_dashboard_stats,
    get_dashboard_summary,
    get_daily_uploads,
    get_daily_matches,
    get_success_rate,
    get_recent_uploads,
    get_recent_matches,
    get_recent_interviews,
    get_ai_insights,
    get_top_candidates,
    get_interview_stats,
    get_hiring_funnel,
    get_notifications,

)

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"],
)


# =====================================================
# Dashboard Home
# =====================================================

@router.get("/")
def dashboard_home(
    db: Session = Depends(get_db),
):
    try:

        return {

            "summary": get_dashboard_summary(db),

            "stats": get_dashboard_stats(db),

            "daily_uploads": get_daily_uploads(db),

            "daily_matches": get_daily_matches(db),

            "success_rate": get_success_rate(db),

            "recent_uploads": get_recent_uploads(db),

            "recent_matches": get_recent_matches(db),

            "recent_interviews": get_recent_interviews(db),

            "interview_stats": get_interview_stats(db),

            "hiring_funnel": get_hiring_funnel(db),

        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


# =====================================================
# Statistics Cards
# =====================================================

from app.auth.jwt import get_current_user

@router.get("/stats")
def dashboard_stats(
    db: Session = Depends(get_db),
):
    return get_dashboard_stats(db)


# =====================================================
# Dashboard Summary
# =====================================================

@router.get("/summary")
def dashboard_summary(
    db: Session = Depends(get_db),
):

    return get_dashboard_summary(db)


# =====================================================
# Upload Chart
# =====================================================

@router.get("/daily_uploads")
def dashboard_daily_uploads(
    db: Session = Depends(get_db),
):

    return get_daily_uploads(db)


# =====================================================
# Match Chart
# =====================================================

@router.get("/daily_matches")
def dashboard_daily_matches(
    db: Session = Depends(get_db),
):

    return get_daily_matches(db)


# =====================================================
# Success Rate
# =====================================================

@router.get("/success_rate")
def dashboard_success_rate(
    db: Session = Depends(get_db),
):

    return get_success_rate(db)


# =====================================================
# Recent Uploads
# =====================================================

@router.get("/recent_uploads")
def dashboard_recent_uploads(
    db: Session = Depends(get_db),
):

    return get_recent_uploads(db)


# =====================================================
# Recent Matches
# =====================================================

@router.get("/recent_matches")
def dashboard_recent_matches(
    db: Session = Depends(get_db),
):

    return get_recent_matches(db)


# =====================================================
# Recent Interviews
# =====================================================

@router.get("/recent_interviews")
def dashboard_recent_interviews(
    db: Session = Depends(get_db),
):

    return get_recent_interviews(db)


# =====================================================
# Interview Statistics
# =====================================================

@router.get("/interview_stats")
def dashboard_interview_stats(
    db: Session = Depends(get_db),
):

    return get_interview_stats(db)


# =====================================================
# Hiring Funnel
# =====================================================

@router.get("/hiring_funnel")
def dashboard_hiring_funnel(
    db: Session = Depends(get_db),
):

    return get_hiring_funnel(db)


@router.get("/ai-insights")
def ai_insights(db: Session = Depends(get_db)):
    return get_ai_insights(db)

@router.get("/top-candidates")
def top_candidates(db: Session = Depends(get_db)):
    return get_top_candidates(db)


@router.get("/notifications")
def notifications(db: Session = Depends(get_db)):
    return get_notifications(db)