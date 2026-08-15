from datetime import datetime

from fastapi import APIRouter

router = APIRouter(
    prefix="/health",
    tags=["Health"],
)


@router.get("/")
def health_check():
    return {
        "status": "healthy",
        "service": "Sherlock Candidate AI",
        "timestamp": datetime.utcnow().isoformat(),
    }