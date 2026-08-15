from sqlalchemy.orm import Session

from app.models.user import User
from app.auth.security import hash_password
 

def create_user(
    db: Session,
    username: str,
    password: str,
    role: str = "user",
):

    existing = (
        db.query(User)
        .filter(User.username == username)
        .first()
    )

    if existing:
        return None

    user = User(
        username=username,
        hashed_password=hash_password(password),
        role=role.lower(),
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user


def get_users(db: Session):

    return (
        db.query(User)
        .order_by(User.id)
        .all()
    )


def update_role(
    db: Session,
    user_id: int,
    role: str,
):

    user = (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )

    if user is None:
        return None

    user.role = role

    db.commit()
    db.refresh(user)

    return user


def update_password(
    db: Session,
    user_id: int,
    password: str,
):

    user = (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )

    if user is None:
        return None

    user.hashed_password = hash_password(password)

    db.commit()

    return user

def deactivate_user(
    db: Session,
    user_id: int,
):

    user = (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )

    if user is None:
        return None

    user.is_active = False

    db.commit()
    db.refresh(user)

    return user


def activate_user(
    db: Session,
    user_id: int,
):

    user = (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )

    if user is None:
        return None

    user.is_active = True

    db.commit()
    db.refresh(user)

    return user

def delete_user(
    db: Session,
    user_id: int,
):

    user = (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )

    if user is None:
        return False

    db.delete(user)
    db.commit()

    return True