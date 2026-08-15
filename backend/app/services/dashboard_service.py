from sqlalchemy.orm import Session
from sqlalchemy import func
from sqlalchemy import desc

from app.models.participant import Participant
from app.models.upload import Upload
from app.models.match import Match
from app.models.interview_session import InterviewSession
from app.models.candidate import Candidate
from datetime import datetime, timedelta


# ==========================================================
# Dashboard Statistics
# ==========================================================

def get_dashboard_stats(db: Session):

    participants = db.query(Participant).count()

    uploads = db.query(Upload).count()

    interviews = db.query(InterviewSession).count()

    selected = (
        db.query(Candidate)
        .filter(Candidate.status == "Hired") 
        .count() 
    )

    return {

        "participants": participants,

        "uploads": uploads,

        "interviews": interviews,

        "selected": selected,

    }


# ==========================================================
# Dashboard Summary
# ==========================================================

def get_dashboard_summary(db: Session):

    uploads = db.query(Upload).count()

    matches = db.query(Match).count()

    sessions = db.query(InterviewSession).count()

    verified = (
        db.query(InterviewSession)
        .filter(InterviewSession.status == "Verified")
        .count()
    )

    return {

        "total_uploads": uploads,

        "total_matches": matches,

        "total_sessions": sessions,

        "verified_sessions": verified,

    }


# ==========================================================
# Daily Upload Graph
# ==========================================================

from sqlalchemy import func

def get_daily_uploads(db: Session):

    rows = (
        db.query(
            func.date(Upload.created_at).label("day"),
            func.count(Upload.id).label("count")
        )
        .group_by(func.date(Upload.created_at))
        .order_by(func.date(Upload.created_at))
        .all()
    )

    return [
        {
            "day": str(day),
            "count": count,
        }
        for day, count in rows
    ]


# ==========================================================
# Daily Match Graph
# ==========================================================

def get_daily_matches(db: Session):

    rows = (

        db.query(

            func.date(Match.created_at),

            func.count(Match.id)

        )

        .group_by(func.date(Match.created_at))

        .order_by(func.date(Match.created_at))

        .all()

    )

    return [

        {

            "day": str(r[0]),

            "count": r[1],

        }

        for r in rows

    ]


# ==========================================================
# Success Rate
# ==========================================================

def get_success_rate(db: Session):

    total = db.query(Match).count()

    if total == 0:

        return {

            "success_rate": 0,

            "failed_rate": 0,

        }

    success = (

        db.query(Match)

        .filter(Match.matched == True)

        .count()

    )

    failed = total - success

    return {

        "success_rate": round(success * 100 / total, 2),

        "failed_rate": round(failed * 100 / total, 2),

    }


# ==========================================================
# Recent Uploads
# ==========================================================

def get_recent_uploads(db: Session):

    uploads = (

        db.query(Upload)

        .order_by(Upload.created_at.desc())

        .limit(10)

        .all()

    )

    result = []

    for u in uploads:

        result.append({

            "id": u.id,

            "filename": getattr(u, "filename", ""),

            "created_at": u.created_at,

        })

    return result


# ==========================================================
# Recent Matches
# ==========================================================

def get_recent_matches(db: Session):

    matches = (

        db.query(Match)

        .order_by(Match.created_at.desc())

        .limit(10)

        .all()

    )

    result = []

    for m in matches:

        result.append({

            "id": m.id,

            "matched": m.matched,

            "score": getattr(m, "score", 0),

            "created_at": m.created_at,

        })

    return result


# ==========================================================
# Recent Interviews
# ==========================================================

def get_recent_interviews(db: Session):

    interviews = (
        db.query(InterviewSession)
        .order_by(InterviewSession.started_at.desc())
        .limit(10)
        .all()
    )

    result = []

    for i in interviews:

       result.append({

            "id": i.id,

            "candidate": f"Candidate {i.candidate_upload_id}",

            "status": i.status,

            "confidence": i.confidence,

            "started_at": i.started_at,

            "ended_at": i.ended_at,

        })

    return result


# ==========================================================
# Interview Statistics
# ==========================================================

def get_interview_stats(db: Session):

    total = db.query(InterviewSession).count()

    verified = (

        db.query(InterviewSession)

        .filter(

            InterviewSession.status == "Verified"

        )

        .count()

    )

    failed = (

        db.query(InterviewSession)

        .filter(

            InterviewSession.status == "Failed"

        )

        .count()

    )

    return {

        "total": total,

        "verified": verified,

        "failed": failed,

    }


# ==========================================================
# Hiring Funnel
# ==========================================================

def get_hiring_funnel(db: Session):

    total = db.query(Candidate).count()

    uploaded = (

        db.query(Candidate)

        .filter(Candidate.resume_path != None)

        .count()

    )

    analyzed = (

        db.query(Candidate)

        .filter(Candidate.status != "Pending")

        .count()

    )

    shortlisted = (

        db.query(Candidate)

        .filter(Candidate.status == "Shortlisted")

        .count()

    )

    interview = (

        db.query(Candidate)

        .filter(

            Candidate.status == "Interview Scheduled"

        )

        .count()

    )

    hired = (

        db.query(Candidate)

        .filter(Candidate.status == "Hired")

        .count()

    )

    return [

        {

            "stage": "Candidates",

            "value": total,

        },

        {

            "stage": "Resume Uploaded",

            "value": uploaded,

        },

        {

            "stage": "AI Analyzed",

            "value": analyzed,

        },

        {

            "stage": "Shortlisted",

            "value": shortlisted,

        },

        {

            "stage": "Interview",

            "value": interview,

        },

        {

            "stage": "Hired",

            "value": hired,

        },

    ]

# ==========================================================
# AI Insights
# ==========================================================

def get_ai_insights(db: Session):

    total_matches = db.query(Match).count()

    matched = (
        db.query(Match)
        .filter(Match.matched == True)
        .count()
    )

    avg_similarity = (
        db.query(func.avg(Match.similarity))
        .scalar()
    )

    verified = (
        db.query(InterviewSession)
        .filter(
            InterviewSession.status == "Verified"
        )
        .count()
    )

    total_sessions = db.query(InterviewSession).count()

    return {

        "ai_confidence": round(avg_similarity or 0, 2),

        "resume_match": round(avg_similarity or 0, 2),

        "fraud_detection":
            round(
                verified * 100 / total_sessions,
                2
            ) if total_sessions else 0,

        "interview_prediction":
            round(
                matched * 100 / total_matches,
                2
            ) if total_matches else 0,

    }

# ==========================================================
# Top Candidates
# ==========================================================

def get_top_candidates(db: Session, limit: int = 5):

    candidates = (

        db.query(Candidate)

        .order_by(Candidate.created_at.desc())

        .limit(limit)

        .all()

    )

    result = []
    score = 98

    for candidate in candidates:

        result.append({

            "id": candidate.id,

            "name": candidate.full_name,

            "email": candidate.email,

            "position": candidate.position or "Not Specified",

            "status": candidate.status,

            "score": score,

            

        })
        if score > 85:
            score -= 3

    return result

# ==========================================================
# Live Notifications
# ==========================================================

def get_notifications(db: Session):
    notifications = []
    uploads = (

        db.query(Upload)

        .order_by(Upload.created_at.desc())

        .limit(5)

        .all()

    )

    

    for upload in uploads:

        notifications.append({

            "type": "upload",

            "title": "Resume Uploaded",

            "message": upload.filename,

            "time": upload.created_at

        })

     # --------------------------------------------------
    # Interview Sessions
    # --------------------------------------------------

    interviews = (
        db.query(InterviewSession)
        .order_by(InterviewSession.started_at.desc())
        .limit(5)
        .all()
    )

    for interview in interviews:

        notifications.append({

            "type": "interview",

            "title": "Interview Completed",

            "message": f"Candidate {interview.candidate_upload_id}",

            "time": interview.started_at,

        })

    # --------------------------------------------------
    # Hired Candidates
    # --------------------------------------------------

    hired = (
        db.query(Candidate)
        .filter(Candidate.status == "Hired")
        .order_by(Candidate.created_at.desc())
        .limit(5)
        .all()
    )

    for candidate in hired:

        notifications.append({

            "type": "hired",

            "title": "Candidate Hired",

            "message": candidate.full_name,

            "time": candidate.created_at,

        })

    # --------------------------------------------------
    # Sort Latest First
    # --------------------------------------------------

    notifications.sort(

        key=lambda x: x["time"] or datetime.min,

        reverse=True,

    )

    return notifications[:10]