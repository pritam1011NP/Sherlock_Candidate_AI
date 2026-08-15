from pydantic import BaseModel


class CandidateAIResponse(BaseModel):

    overall_score: float

    resume_score: float

    interview_score: float

    face_score: float

    skill_score: float

    experience_score: float

    education_score: float

    fraud_risk: float

    class Config:

        from_attributes = True