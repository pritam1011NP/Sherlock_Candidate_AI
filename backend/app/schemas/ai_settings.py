from typing import Optional

from pydantic import BaseModel


# -----------------------------------------
# Base Schema
# -----------------------------------------

class AISettingsBase(BaseModel):

    # Provider

    provider: str = "OpenAI"
    model: str = "gpt-5.5"
    api_key: Optional[str] = None

    temperature: float = 0.2
    max_tokens: int = 4096

    # Resume AI

    enable_resume_parser: bool = True
    enable_skill_extraction: bool = True
    enable_experience_analysis: bool = True
    enable_education_analysis: bool = True

    resume_threshold: int = 70

    # Matching

    enable_matching: bool = True
    matching_threshold: int = 80
    similarity_algorithm: str = "Cosine Similarity"
    maximum_matches: int = 10

    # Interview

    enable_interview_ai: bool = True

    technical_evaluation: bool = True
    communication_evaluation: bool = True
    confidence_evaluation: bool = True

    recommendation_enabled: bool = True
    summary_enabled: bool = True

    passing_score: int = 75

    # Face

    enable_face_verification: bool = True
    face_threshold: int = 85
    max_verification_attempts: int = 3

    # Prompts

    system_prompt: Optional[str] = None
    resume_prompt: Optional[str] = None
    interview_prompt: Optional[str] = None
    matching_prompt: Optional[str] = None

    # Logging

    store_prompts: bool = True
    store_ai_responses: bool = True
    store_scores: bool = True


# -----------------------------------------
# Update
# -----------------------------------------

class AISettingsUpdate(AISettingsBase):
    pass


# -----------------------------------------
# Response
# -----------------------------------------

class AISettingsResponse(AISettingsBase):

    id: int

    class Config:
        from_attributes = True