from pydantic import BaseModel, Field, EmailStr, field_validator
from typing import List


class InterviewCreate(BaseModel):
    meeting_id: str = Field(
        min_length=4,
        max_length=50,
        description="Unique meeting ID",
        examples=["MEET-2026-001"],
    )

    candidate_name: str = Field(
        min_length=2,
        max_length=100,
        description="Candidate full name",
        examples=["John Doe"],
    )

    candidate_email: EmailStr = Field(
        description="Candidate email address",
        examples=["john@example.com"],
    )

    @field_validator("meeting_id")
    @classmethod
    def validate_meeting_id(cls, value: str):
        value = value.strip()

        if not value:
            raise ValueError("Meeting ID cannot be empty.")

        return value

    @field_validator("candidate_name")
    @classmethod
    def validate_candidate_name(cls, value: str):
        value = value.strip()

        if not value:
            raise ValueError("Candidate name cannot be empty.")

        return value


class InterviewResponse(BaseModel):

    id: int

    meeting_id: str

    candidate_name: str

    candidate_email: EmailStr

    status: str

    confidence: float

    technical_score: float

    communication_score: float

    confidence_score: float

    overall_score: float

    recommendation: str

    ai_summary: str | None = None

    duration: int

    failed_attempts: int

    verification_count: int

    class Config:
        from_attributes = True

# ---------------------------------------------------------
# AI Interview Question Schemas
# ---------------------------------------------------------

class InterviewQuestion(BaseModel):
    question: str
    skill: str
    difficulty: str


class InterviewQuestionsResponse(BaseModel):
    candidate_id: int
    candidate_name: str
    role: str
    total_questions: int
    questions: List[InterviewQuestion]