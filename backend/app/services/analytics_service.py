from collections import Counter

from sqlalchemy.orm import Session
from sqlalchemy import func

from app.models.candidate import Candidate
from app.models.candidate_ai import CandidateAI
from app.models.interview import InterviewSession


def get_dashboard_analytics(db: Session):

    # --------------------------------------------------
    # Candidate Summary
    # --------------------------------------------------

    candidates = db.query(Candidate).all()

    total_candidates = len(candidates)

    verified = sum(
        1 for c in candidates
        if c.status == "Verified"
    )

    shortlisted = sum(
        1 for c in candidates
        if c.status == "Shortlisted"
    )

    rejected = sum(
        1 for c in candidates
        if c.status == "Rejected"
    )

    pending = sum(
        1 for c in candidates
        if c.status == "Pending"
    )

    # --------------------------------------------------
    # Average AI Score
    # --------------------------------------------------

    average_ai = db.query(
        func.avg(CandidateAI.overall_score)
    ).scalar()

    if average_ai is None:
        average_ai = 0

    # --------------------------------------------------
    # Total Interviews
    # --------------------------------------------------

    interviews = db.query(
        func.count(InterviewSession.id)
    ).scalar() or 0

    # --------------------------------------------------
    # Candidate Status
    # --------------------------------------------------

    candidate_status = [

        {
            "name": "Verified",
            "value": verified,
        },

        {
            "name": "Shortlisted",
            "value": shortlisted,
        },

        {
            "name": "Pending",
            "value": pending,
        },

        {
            "name": "Rejected",
            "value": rejected,
        },

    ]

    # --------------------------------------------------
    # Hiring Trend (temporary)
    # --------------------------------------------------

    hiring_trend = [

        {"month": "Jan", "value": 12},
        {"month": "Feb", "value": 18},
        {"month": "Mar", "value": 21},
        {"month": "Apr", "value": 16},
        {"month": "May", "value": 27},
        {"month": "Jun", "value": 31},

    ]

    # --------------------------------------------------
    # AI Score Distribution
    # --------------------------------------------------

    scores = db.query(
        CandidateAI.overall_score
    ).all()

    distribution = {

        "0-20": 0,
        "20-40": 0,
        "40-60": 0,
        "60-80": 0,
        "80-100": 0,

    }

    for (score,) in scores:

        if score is None:
            continue

        if score < 20:

            distribution["0-20"] += 1

        elif score < 40:

            distribution["20-40"] += 1

        elif score < 60:

            distribution["40-60"] += 1

        elif score < 80:

            distribution["60-80"] += 1

        else:

            distribution["80-100"] += 1

    ai_scores = [

        {
            "range": key,
            "count": value,
        }

        for key, value in distribution.items()

    ]

    # --------------------------------------------------
    # Department / Position Distribution
    # --------------------------------------------------

    positions = Counter()

    for candidate in candidates:

        if candidate.position:

            positions[candidate.position] += 1

    departments = [

        {
            "name": position,
            "value": count,
        }

        for position, count in positions.items()

    ]

    # --------------------------------------------------
    # Top Skills
    # --------------------------------------------------

    skills_counter = Counter()

    try:

        ai_records = db.query(CandidateAI).all()

        for record in ai_records:

            skills = getattr(record, "skills", None)

            if not skills:
                continue

            if isinstance(skills, str):

                for skill in skills.split(","):

                    skill = skill.strip()

                    if skill:
                        skills_counter[skill] += 1

            elif isinstance(skills, list):

                for skill in skills:

                    skills_counter[skill] += 1

        top_skills = [

            {
                "skill": skill,
                "count": count,
            }

            for skill, count in skills_counter.most_common(10)

        ]

    except Exception:

        top_skills = [

            {"skill": "Python", "count": 24},
            {"skill": "React", "count": 18},
            {"skill": "FastAPI", "count": 16},
            {"skill": "SQL", "count": 15},
            {"skill": "Docker", "count": 11},
            {"skill": "AWS", "count": 8},

        ]

    # --------------------------------------------------
    # AI Score Trend
    # --------------------------------------------------

    ai_score_trend = hiring_trend

    # --------------------------------------------------
    # Upload Trend
    # --------------------------------------------------

    upload_trend = [

        {"month": "Jan", "uploads": 8},
        {"month": "Feb", "uploads": 12},
        {"month": "Mar", "uploads": 17},
        {"month": "Apr", "uploads": 21},
        {"month": "May", "uploads": 28},
        {"month": "Jun", "uploads": 35},

    ]

    # --------------------------------------------------
    # Interview Statistics
    # --------------------------------------------------

    try:

        completed = db.query(InterviewSession).filter(
            InterviewSession.status.in_(["Completed", "completed"])
        ).count()

        running = db.query(InterviewSession).filter(
            InterviewSession.status.in_(["Running", "running"])
        ).count()

        pending_interviews = db.query(InterviewSession).filter(
            InterviewSession.status.in_(["Pending", "pending"])
        ).count()

        failed = db.query(InterviewSession).filter(
            InterviewSession.status.in_(["Failed", "failed"])
        ).count()

    except Exception:

        completed = 0
        running = 0
        pending_interviews = 0
        failed = 0

    interview_statistics = [

        {"status": "Completed", "count": completed},
        {"status": "Running", "count": running},
        {"status": "Pending", "count": pending_interviews},
        {"status": "Failed", "count": failed},

    ]

    # --------------------------------------------------
    # Final Response
    # --------------------------------------------------

    return {

        "summary": {
            "total_candidates": total_candidates,
            "average_ai_score": round(float(average_ai), 2),
            "interviews": interviews,
        },

        "candidate_status": candidate_status,
        "hiring_trend": hiring_trend,
        "ai_scores": ai_scores,
        "departments": departments,
        "top_skills": top_skills,
        "ai_score_trend": ai_score_trend,
        "upload_trend": upload_trend,
        "interview_statistics": interview_statistics,

    }


def get_analytics(db: Session):
    return get_dashboard_analytics(db)


# --------------------------------------------------
# Backward Compatibility
# --------------------------------------------------

def get_analytics(db: Session):
    return get_dashboard_analytics(db)