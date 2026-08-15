from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import desc

from app.database.database import get_db
from app.models.candidate import Candidate
from app.models.interview_answer import InterviewAnswer

router = APIRouter(
    prefix="/ranking",
    tags=["AI Candidate Ranking"],
)


@router.get("/")
def get_candidate_ranking(db: Session = Depends(get_db)):

    candidates = db.query(Candidate).all()

    ranking = []

    for candidate in candidates:

        answers = (
            db.query(InterviewAnswer)
            .filter(
                InterviewAnswer.candidate_id == candidate.id
            )
            .all()
        )

        if answers:

            interview_score = round(
                sum(a.ai_score for a in answers) / len(answers),
                2,
            )

        else:

            interview_score = 0

        resume_score = getattr(candidate, "resume_score", 80)

        proctor_score = getattr(candidate, "proctor_score", 100)

        ai_score = round(
            (
                interview_score * 0.6
                + resume_score * 0.25
                + proctor_score * 0.15
            ),
            2,
        )

        if ai_score >= 85:
            recommendation = "Hire"
        elif ai_score >= 70:
            recommendation = "Consider"
        else:
            recommendation = "Reject"

        ranking.append(
            {
                "candidate_id": candidate.id,
                "name": candidate.full_name,
                "role": candidate.role,
                "resume_score": resume_score,
                "interview_score": interview_score,
                "proctor_score": proctor_score,
                "ai_score": ai_score,
                "recommendation": recommendation,
            }
        )

    ranking = sorted(
        ranking,
        key=lambda x: x["ai_score"],
        reverse=True,
    )

    return ranking