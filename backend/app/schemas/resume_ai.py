from pydantic import BaseModel
from typing import List


class SkillItem(BaseModel):
    name: str
    score: int


class ResumeAnalysisResponse(BaseModel):
    candidate_name: str

    overall_score: int

    technical_score: int
    communication_score: int
    experience_score: int
    education_score: int

    strengths: List[str]
    weaknesses: List[str]

    detected_skills: List[str]
    missing_skills: List[str]

    recommended_position: str

    summary: str