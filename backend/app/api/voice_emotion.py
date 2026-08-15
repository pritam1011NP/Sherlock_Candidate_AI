from fastapi import APIRouter

from app.services.emotion_service import analyze_voice

router = APIRouter(
    prefix="/voice-emotion",
    tags=["Voice Emotion"],
)


@router.post("/analyze")
def analyze():

    result = analyze_voice("demo.wav")

    return result