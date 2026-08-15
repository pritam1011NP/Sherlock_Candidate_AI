from pydantic import BaseModel
from typing import List


class InterviewAnswerResult(BaseModel):

    id: int

    question_number: int

    question: str

    transcript: str

    grammar_score: int

    relevance_score: int

    confidence_score: int

    communication_score: int

    ai_score: int

    feedback: str

    class Config:
        from_attributes = True


class InterviewResultResponse(BaseModel):

    candidate_id: int

    candidate_name: str

    overall_score: int

    recommendation: str

    answers: List[InterviewAnswerResult]

    class Config:
        from_attributes = True