from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.database.database import get_db

from app.models.candidate_skill import CandidateSkill

router = APIRouter(

    prefix="/candidate-skills",

    tags=["Candidate Skills"],

)


@router.get("/{candidate_id}")

def get_skills(

    candidate_id: int,

    db: Session = Depends(get_db),

):

    return (

        db.query(CandidateSkill)

        .filter(

            CandidateSkill.candidate_id == candidate_id

        )

        .all()

    )