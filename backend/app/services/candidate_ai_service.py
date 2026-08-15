import random

from sqlalchemy.orm import Session

from app.models.candidate_ai import CandidateAI


def generate_ai_report(db: Session, candidate_id: int):

    report = CandidateAI(

        candidate_id=candidate_id,

        resume_score=random.randint(75,100),

        interview_score=random.randint(70,100),

        face_score=random.randint(85,100),

        skill_score=random.randint(70,100),

        experience_score=random.randint(65,100),

        education_score=random.randint(70,100),

        fraud_risk=random.randint(0,20),

    )

    report.overall_score = round(

        (

            report.resume_score +

            report.interview_score +

            report.face_score +

            report.skill_score +

            report.experience_score +

            report.education_score

        ) / 6,

        1,

    )

    db.add(report)

    db.commit()

    db.refresh(report)

    return report