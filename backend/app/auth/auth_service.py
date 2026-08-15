from sqlalchemy.orm import Session

from app.models.user import User

from app.auth.security import (
    hash_password,
    verify_password,
)

from app.auth.jwt import create_access_token
from app.models.roles import UserRole
from app.services.refresh_token_service import (
    create_refresh_token,
)


def create_default_admin(db: Session):

    admin = (
        db.query(User)
        .filter(User.username == "admin")
        .first()
    )

    if admin:
        return

    admin = User(
        username="admin",
        hashed_password=hash_password("admin123"),
        role=UserRole.ADMIN.value,
    )

    db.add(admin)
    db.commit()
    db.refresh(admin)


def login(
    username: str,
    password: str,
    db: Session,
):

    user = (
        db.query(User)
        .filter(User.username == username)
        .first()
    )

    if user is None:
        return {
            "success": False,
            "message": "Invalid username or password.",
        }

    if not user.is_active:
        return {
            "success": False,
            "message": "User account is deactivated.",
        }

    if not verify_password(
        password,
        user.hashed_password,
    ):
        return {
            "success": False,
            "message": "Invalid username or password.",
        }

    access_token = create_access_token(
        {
            "sub": user.username,
            "role": user.role,
        }
    )

    refresh_token = create_refresh_token(
        db=db,
        user_id=user.id,
    )

    return {
        "access_token": access_token,
        "refresh_token": refresh_token.token,
        "token_type": "bearer",
    }