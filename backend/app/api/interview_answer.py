import os
import shutil
from uuid import uuid4

from fastapi import (
    APIRouter,
    UploadFile,
    File,
    Form,
    Depends,
)

from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.interview_answer import InterviewAnswer

from app.services.interview_ai_service import speech_to_text
from app.services.interview_evaluator import evaluate_answer

router = APIRouter(
    prefix="/interview-answers",
    tags=["Interview Answers"],
)

# --------------------------------
# Upload Folder
# --------------------------------

AUDIO_FOLDER = "uploads/interview_audio"

os.makedirs(
    AUDIO_FOLDER,
    exist_ok=True,
)

# --------------------------------
# Upload Answer
# --------------------------------

@router.post("/upload")
def upload_interview_answer(

    candidate_id: int = Form(...),

    question_number: int = Form(...),

    question: str = Form(...),

    audio: UploadFile = File(...),

    db: Session = Depends(get_db),

):

    # -----------------------------
    # Save Audio File
    # -----------------------------

    extension = os.path.splitext(
        audio.filename
    )[1]

    filename = f"{uuid4()}{extension}"

    filepath = os.path.join(
        AUDIO_FOLDER,
        filename,
    )

    with open(
        filepath,
        "wb",
    ) as buffer:

        shutil.copyfileobj(
            audio.file,
            buffer,
        )

    # -----------------------------
    # Speech To Text
    # -----------------------------

    transcript = speech_to_text(filepath)

    # -----------------------------
    # AI Evaluation
    # -----------------------------

    evaluation = evaluate_answer(

        question,

        transcript,

    )

    # -----------------------------
    # Save Database
    # -----------------------------

    answer = InterviewAnswer(

        candidate_id=candidate_id,

        question_number=question_number,

        question=question,

        audio_path=filepath,

        transcript=transcript,

        grammar_score=evaluation["grammar_score"],

        relevance_score=evaluation["relevance_score"],

        confidence_score=evaluation["confidence_score"],

        communication_score=evaluation["communication_score"],

        ai_score=evaluation["overall_score"],

        feedback=evaluation["feedback"],

    )

    db.add(answer)

    db.commit()

    db.refresh(answer)

    # -----------------------------
    # API Response
    # -----------------------------

    return {

        "message": "Answer uploaded successfully",

        "id": answer.id,

        "audio_path": answer.audio_path,

        "transcript": answer.transcript,

        "grammar_score": answer.grammar_score,

        "relevance_score": answer.relevance_score,

        "confidence_score": answer.confidence_score,

        "communication_score": answer.communication_score,

        "overall_score": answer.ai_score,

        "feedback": answer.feedback,

    }