import os
import shutil
from uuid import uuid4

from fastapi import UploadFile
from sqlalchemy.orm import Session

from app.models.interview_answer import InterviewAnswer
from app.ai.whisper_service import speech_to_text
from app.ai.interview_ai import evaluate_answer
from app.ai.resume_interview_ai import score_answer
from app.ai.resume_ai import analyze_resume
from app.models.candidate import Candidate
from app.ai.llm_interview_evaluator import evaluate_resume_answer

UPLOAD_DIR = "uploads/interview_answers"

os.makedirs(UPLOAD_DIR, exist_ok=True)


def save_audio(file: UploadFile):

    extension = os.path.splitext(file.filename)[1]

    filename = f"{uuid4()}{extension}"

    filepath = os.path.join(
        UPLOAD_DIR,
        filename,
    )

    with open(filepath, "wb") as buffer:

        shutil.copyfileobj(
            file.file,
            buffer,
        )

    return filepath.replace("\\", "/")


def create_answer(

    db: Session,

    candidate_id: int,

    question_number: int,

    question: str,

    audio: UploadFile,

):

    audio_path = save_audio(audio)

    answer = InterviewAnswer(

        candidate_id=candidate_id,

        question_number=question_number,

        question=question,

        audio_path=audio_path,

        transcript="",

        technical_score=0,

        communication_score=0,

        confidence_score=0,

        overall_score=0,

    )

    db.add(answer)

    db.commit()

    db.refresh(answer)

    return answer