from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.database.database import get_db

from app.services.confidence_service import (
    evaluate_candidates,
)

router = APIRouter(
    prefix="/confidence",
    tags=["AI Confidence"],
)


@router.get("/")
def confidence(
    db: Session = Depends(get_db),
):
    return evaluate_candidates(db)