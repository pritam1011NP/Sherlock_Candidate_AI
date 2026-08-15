from datetime import datetime, timedelta
import secrets

from sqlalchemy.orm import Session

from app.models.user import User
from app.models.password_reset import PasswordResetToken
from app.auth.security import hash_password


RESET_TOKEN_EXPIRE_MINUTES = 30


def create_reset_token(
    db: Session,
    username: str,
):

    print("========== PASSWORD RESET ==========")
    print("Username received:", username)

    user = (
        db.query(User)
        .filter(User.username == username)
        .first()
    )

    print("User found:", user)

    if user is None:
        return None

    token = secrets.token_urlsafe(32)

    reset = PasswordResetToken(
        user_id=user.id,
        token=token,
        expires_at=datetime.utcnow() + timedelta(
            minutes=RESET_TOKEN_EXPIRE_MINUTES
        ),
    )

    print("Before add")

    db.add(reset)

    print("Before commit")

    db.commit()

    print("After commit")

    db.refresh(reset)

    print("Saved token:", reset.token)
    print("Saved ID:", reset.id)

    return reset


def get_reset_token(
    db: Session,
    token: str,
):

    return (
        db.query(PasswordResetToken)
        .filter(
            PasswordResetToken.token == token
        )
        .first()
    )


def reset_password(
    db: Session,
    token: str,
    new_password: str,
):

    reset = get_reset_token(
        db,
        token,
    )

    if reset is None:
        return False

    if reset.expires_at < datetime.utcnow():
        db.delete(reset)
        db.commit()
        return False

    user = (
        db.query(User)
        .filter(User.id == reset.user_id)
        .first()
    )

    if user is None:
        return False

    user.hashed_password = hash_password(
        new_password
    )

    db.delete(reset)

    db.commit()

    return True