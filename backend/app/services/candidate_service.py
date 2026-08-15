import os
import shutil
import asyncio
from uuid import uuid4

from fastapi import UploadFile
from sqlalchemy.orm import Session

from app.models.candidate import Candidate
from app.models.candidate_ai import CandidateAI
from app.models.candidate_skill import CandidateSkill

from app.services.event_service import candidate_created
from app.ai.resume_ai import analyze_resume
from app.models.candidate_skill import CandidateSkill

# =====================================================
# Upload Directories
# =====================================================

BASE_UPLOAD_DIR = "uploads"

PHOTO_DIR = os.path.join(BASE_UPLOAD_DIR, "photos")
RESUME_DIR = os.path.join(BASE_UPLOAD_DIR, "resumes")

os.makedirs(PHOTO_DIR, exist_ok=True)
os.makedirs(RESUME_DIR, exist_ok=True)


# =====================================================
# Save Uploaded File
# =====================================================

def save_uploaded_file(file: UploadFile, folder: str):

    extension = os.path.splitext(file.filename)[1]

    filename = f"{uuid4()}{extension}"

    filepath = os.path.join(folder, filename)

    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return filepath.replace("\\", "/")


# =====================================================
# Delete Uploaded File
# =====================================================

def delete_uploaded_file(filepath: str):

    if filepath and os.path.exists(filepath):
        os.remove(filepath)


# =====================================================
# Create Candidate
# =====================================================

def create_candidate(
    db: Session,
    full_name: str,
    email: str,
    phone: str,
    position: str,
    address: str,
    resume: UploadFile,
    photo: UploadFile,
):

    # -----------------------------
    # Save Files
    # -----------------------------

    resume_path = save_uploaded_file(
        resume,
        RESUME_DIR,
    )

    photo_path = save_uploaded_file(
        photo,
        PHOTO_DIR,
    )

    # -----------------------------
    # Create Candidate
    # -----------------------------

    candidate = Candidate(
        full_name=full_name,
        email=email,
        phone=phone,
        position=position,
        address=address,
        status="Pending",
        resume_path=resume_path,
        photo_path=photo_path,
    )

    db.add(candidate)
    db.commit()
    db.refresh(candidate)
    

    # =====================================================
    # AI Resume Analysis
    # =====================================================

    try:

        result = analyze_resume(candidate.resume_path)

        ai_record = CandidateAI(

            candidate_id=candidate.id,

            overall_score=result["resume_score"],

            resume_score=result["resume_score"],

            interview_score=0,

            face_score=0,

            skill_score=min(
                len(result["skills"]) * 10,
                100,
            ),

            experience_score=min(
                result["experience"] * 10,
                100,
            ),

            education_score={

                "PhD": 100,

                "Master": 90,

                "B.Tech": 85,

                "Bachelor": 80,

                "Diploma": 65,

                "Unknown": 40,

            }.get(
                result["education"],
                40,
            ),

            fraud_risk=5,

        )

        db.add(ai_record)

        # Save Skills

        for skill in result["skills"]:

            db.add(

                CandidateSkill(

                    candidate_id=candidate.id,

                    skill=skill,

                )

            )

        db.commit()

        print("Resume AI Analysis Completed")

    except Exception as e:

        print("Resume Analysis Failed:", e)

    # =====================================================
    # Dashboard Notification
    # =====================================================

    try:

        loop = asyncio.get_running_loop()

        loop.create_task(

            candidate_created(candidate)

        )

    except RuntimeError:

        pass

    return candidate


# =====================================================
# Update Candidate
# =====================================================

def update_candidate(
    db: Session,
    candidate: Candidate,
    full_name: str,
    email: str,
    phone: str,
    position: str,
    address: str,
    resume: UploadFile | None = None,
    photo: UploadFile | None = None,
):

    candidate.full_name = full_name
    candidate.email = email
    candidate.phone = phone
    candidate.position = position
    candidate.address = address

    if resume:

        delete_uploaded_file(candidate.resume_path)

        candidate.resume_path = save_uploaded_file(
            resume,
            RESUME_DIR,
        )

    if photo:

        delete_uploaded_file(candidate.photo_path)

        candidate.photo_path = save_uploaded_file(
            photo,
            PHOTO_DIR,
        )

    db.commit()
    db.refresh(candidate)

    return candidate


# =====================================================
# Delete Candidate Files
# =====================================================

def delete_candidate_files(candidate: Candidate):

    delete_uploaded_file(candidate.resume_path)
    delete_uploaded_file(candidate.photo_path)


# =====================================================
# Get Candidate
# =====================================================

def get_candidate_by_id(
    db: Session,
    candidate_id: int,
):

    return (

        db.query(Candidate)

        .filter(Candidate.id == candidate_id)

        .first()

    )