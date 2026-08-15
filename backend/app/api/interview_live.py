from fastapi import APIRouter

router = APIRouter(
    prefix="/interview",
    tags=["Interview"],
)


@router.get("/live-status")
def live_status():

    return {

        "camera": "Connected",

        "microphone": "Listening",

        "face": "Verified",

        "emotion": "Confident",

        "confidence": 92,

    }