from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db

from app.models.candidate import Candidate
from app.models.interview_answer import InterviewAnswer

from app.schemas.interview_result import (
    InterviewResultResponse,
    InterviewAnswerResult,
)

router = APIRouter(
    prefix="/interview",
    tags=["Interview Results"],
)


@router.get(
    "/result/{candidate_id}",
    response_model=InterviewResultResponse,
)
def get_interview_result(
    candidate_id: int,
    db: Session = Depends(get_db),
):

    candidate = (
        db.query(Candidate)
        .filter(Candidate.id == candidate_id)
        .first()
    )

    if not candidate:

        raise HTTPException(
            status_code=404,
            detail="Candidate not found.",
        )

    answers = (
        db.query(InterviewAnswer)
        .filter(
            InterviewAnswer.candidate_id == candidate_id
        )
        .order_by(
            InterviewAnswer.question_number
        )
        .all()
    )

    if not answers:

        raise HTTPException(
            status_code=404,
            detail="No interview answers found.",
        )

    total_score = sum(
        answer.ai_score
        for answer in answers
    )

    overall_score = round(
        total_score / len(answers)
    )

    if overall_score >= 80:

        recommendation = "Hire"

    elif overall_score >= 60:

        recommendation = "Maybe"

    else:

        recommendation = "Reject"

    return InterviewResultResponse(

        candidate_id=candidate.id,

        candidate_name=candidate.full_name,

        overall_score=overall_score,

        recommendation=recommendation,

       answers=[

    InterviewAnswerResult(

        id=answer.id,

        question_number=answer.question_number,

        question=answer.question,

        transcript=answer.transcript,

        grammar_score=answer.grammar_score,

        relevance_score=answer.relevance_score,

        confidence_score=answer.confidence_score,

        communication_score=answer.communication_score,

        ai_score=answer.ai_score,

        feedback=answer.feedback,

    )

    for answer in answers

]

    )