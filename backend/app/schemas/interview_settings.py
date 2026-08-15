from pydantic import BaseModel


class InterviewSettingsBase(BaseModel):

    provider: str
    model: str

    passing_score: float

    technical_evaluation: bool
    communication_evaluation: bool
    confidence_evaluation: bool
    behavior_analysis: bool
    emotion_detection: bool
    eye_contact_detection: bool

    difficulty: str

    enable_ai_recommendation: bool
    enable_ai_summary: bool

    face_verification: bool
    multiple_face_detection: bool
    tab_switch_detection: bool
    voice_monitoring: bool

    auto_score: bool
    auto_save: bool
    auto_generate_report: bool
    auto_notify: bool


class InterviewSettingsUpdate(InterviewSettingsBase):
    pass


class InterviewSettingsResponse(InterviewSettingsBase):

    id: int

    class Config:
        from_attributes = True