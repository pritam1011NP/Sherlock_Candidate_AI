from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db

from app.schemas.password_reset import (
    ForgotPasswordRequest,
    ResetPasswordRequest,
)

from app.services.password_reset_service import (
    create_reset_token,
    reset_password,
)

from app.services.audit_service import log_action

router = APIRouter(
    prefix="/password",
    tags=["Password Reset"],
)


@router.post("/forgot")

def forgot_password(
    request: ForgotPasswordRequest,
    db: Session = Depends(get_db),
):

    token = create_reset_token(
        db,
        request.username,
    )

    if token is None:
        raise HTTPException(
            status_code=404,
            detail="User not found.",
        )

    log_action(
        db=db,
        username=request.username,
        action="PASSWORD_RESET_REQUEST",
        details="Password reset token created.",
    )

    return {
        "message": "Password reset token generated.",
        "token": token.token,
    }


@router.post("/reset")

def reset(
    request: ResetPasswordRequest,
    db: Session = Depends(get_db),
):

    success = reset_password(
        db,
        request.token,
        request.new_password,
    )

    if not success:
        raise HTTPException(
            status_code=400,
            detail="Invalid or expired token.",
        )

    return {
        "message": "Password updated successfully."
    }