from datetime import datetime
from pathlib import Path

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.face.matcher import compare
from app.models.interview_session import InterviewSession
from app.services.audit_service import log_action

from app.config import (
    MIN_CONFIDENCE,
    MAX_FAILED_ATTEMPTS,
)

from app.websocket.manager import manager


async def verify_frame(
    db: Session,
    meeting_id: str,
    candidate_path: Path,
    webcam_path: Path,
):

    # -----------------------------
    # Check uploaded images exist
    # -----------------------------
    if not candidate_path.exists():
        raise HTTPException(
            status_code=400,
            detail="Candidate image not found.",
        )

    if not webcam_path.exists():
        raise HTTPException(
            status_code=400,
            detail="Webcam image not found.",
        )

    # -----------------------------
    # Get interview session
    # -----------------------------
    session = (
        db.query(InterviewSession)
        .filter(
            InterviewSession.meeting_id == meeting_id
        )
        .first()
    )

    if session is None:
        raise HTTPException(
            status_code=404,
            detail="Interview session not found.",
        )

    # -----------------------------
    # Interview already ended?
    # -----------------------------
    if session.status != "running":
        raise HTTPException(
            status_code=400,
            detail="Interview session has already ended.",
        )

    # -----------------------------
    # Compare Faces
    # -----------------------------
    try:

        result = compare(
            candidate_path,
            webcam_path,
        )

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Face verification failed: {str(e)}",
        )

    # -----------------------------
    # Update statistics
    # -----------------------------
    session.verification_count += 1

    similarity = result.get(
        "similarity",
        0,
    )

    session.confidence = similarity

    # -----------------------------
    # Success
    # -----------------------------
    if (
        result.get("verified", False)
        and similarity >= MIN_CONFIDENCE
    ):

        log_action(
            db=db,
            username="system",
            action="LIVE_VERIFICATION_SUCCESS",
            details=f"Meeting: {meeting_id}",
        )

        await manager.send_json(
            meeting_id,
            {
                "type": "verification_success",
                "verified": True,
                "confidence": similarity,
                "verification_count": session.verification_count,
                "failed_attempts": session.failed_attempts,
                "status": session.status,
            },
        )

    # -----------------------------
    # Failed
    # -----------------------------
    else:

        session.failed_attempts += 1

        log_action(
            db=db,
            username="system",
            action="LIVE_VERIFICATION_FAILED",
            details=f"Meeting: {meeting_id}",
        )

        await manager.send_json(
            meeting_id,
            {
                "type": "verification_failed",
                "verified": False,
                "confidence": similarity,
                "verification_count": session.verification_count,
                "failed_attempts": session.failed_attempts,
                "status": session.status,
            },
        )

        # -----------------------------
        # Auto terminate interview
        # -----------------------------
        if session.failed_attempts >= MAX_FAILED_ATTEMPTS:

            session.status = "failed"
            session.ended_at = datetime.utcnow()

            db.commit()

            await manager.send_json(
                meeting_id,
                {
                    "type": "interview_ended",
                    "status": "failed",
                    "message": "Interview terminated after multiple failed verifications.",
                    "failed_attempts": session.failed_attempts,
                },
            )

            return {
                "success": False,
                "verified": False,
                "message": "Interview terminated after multiple failed verifications.",
                "failed_attempts": session.failed_attempts,
                "status": session.status,
            }

    db.commit()

    await manager.send_json(
        meeting_id,
        {
            "type": "verification",
            "verified": result.get("verified"),
            "confidence": similarity,
            "verification_count": session.verification_count,
            "failed_attempts": session.failed_attempts,
            "status": session.status,
        },
    )

    return {
        "success": True,
        "verified": result.get("verified"),
        "similarity": similarity,
        "confidence": similarity,
        "verification_count": session.verification_count,
        "failed_attempts": session.failed_attempts,
        "status": session.status,
    }