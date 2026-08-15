from datetime import datetime, timedelta
import secrets

from sqlalchemy.orm import Session

from app.models.refresh_token import RefreshToken


REFRESH_TOKEN_EXPIRE_DAYS = 7


def create_refresh_token(
    db: Session,
    user_id: int,
):
    token = secrets.token_urlsafe(64)

    refresh = RefreshToken(
        user_id=user_id,
        token=token,
        expires_at=datetime.utcnow() + timedelta(
            days=REFRESH_TOKEN_EXPIRE_DAYS
        ),
    )

    db.add(refresh)
    db.commit()
    db.refresh(refresh)

    return refresh


def get_refresh_token(
    db: Session,
    token: str,
):

    return (
        db.query(RefreshToken)
        .filter(
            RefreshToken.token == token
        )
        .first()
    )


def delete_refresh_token(
    db: Session,
    token: str,
):

    refresh = (
        db.query(RefreshToken)
        .filter(
            RefreshToken.token == token
        )
        .first()
    )

    if refresh is None:
        return False

    db.delete(refresh)
    db.commit()

    return True


def delete_all_user_tokens(
    db: Session,
    user_id: int,
):

    (
        db.query(RefreshToken)
        .filter(
            RefreshToken.user_id == user_id
        )
        .delete()
    )

    db.commit()


def is_refresh_token_valid(
    refresh: RefreshToken,
):

    if refresh is None:
        return False

    return refresh.expires_at > datetime.utcnow()