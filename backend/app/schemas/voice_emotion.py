from pydantic import BaseModel


class VoiceEmotionCreate(BaseModel):

    candidate_id: int

    interview_answer_id: int

    dominant_emotion: str

    confidence: float

    happy: float

    neutral: float

    sad: float

    angry: float

    fear: float

    disgust: float

    surprise: float


class VoiceEmotionResponse(VoiceEmotionCreate):

    id: int

    class Config:

        from_attributes = True