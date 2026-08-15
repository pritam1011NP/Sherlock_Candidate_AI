from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    Request,
)
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.core.rate_limit import limiter
from app.database.database import get_db

from app.auth.auth_service import (
    login,
    create_default_admin,
)

from app.auth.jwt import (
    create_access_token,
    get_current_user,
)

from app.schemas.auth import (
    Token,
    RefreshTokenRequest,
)

from app.services.audit_service import log_action

from app.services.refresh_token_service import (
    get_refresh_token,
    is_refresh_token_valid,
    delete_refresh_token,
)

from app.models.user import User


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.post(
    "/login",
    response_model=Token,
)
@limiter.limit("5/minute")
def login_user(
    request: Request,
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):

    create_default_admin(db)

    token = login(
        form_data.username,
        form_data.password,
        db,
    )

    if token is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid username or password",
        )

    log_action(
        db=db,
        username=form_data.username,
        action="LOGIN",
        details="User logged in successfully",
    )

    return token


@router.post("/refresh")
def refresh_access_token(
    request: RefreshTokenRequest,
    db: Session = Depends(get_db),
):

    refresh = get_refresh_token(
        db,
        request.refresh_token,
    )

    if not is_refresh_token_valid(refresh):
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired refresh token.",
        )

    user = (
        db.query(User)
        .filter(User.id == refresh.user_id)
        .first()
    )

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found.",
        )

    access_token = create_access_token(
        {
            "sub": user.username,
            "role": user.role,
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
    }


@router.post("/logout")
def logout(
    request: RefreshTokenRequest,
    db: Session = Depends(get_db),
):

    deleted = delete_refresh_token(
        db,
        request.refresh_token,
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Refresh token not found.",
        )

    return {
        "message": "Logged out successfully."
    }


@router.get("/me")
def get_me(
    current_user=Depends(get_current_user),
):
    return current_user