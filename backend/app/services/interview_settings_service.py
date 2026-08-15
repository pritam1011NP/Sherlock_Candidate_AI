from sqlalchemy.orm import Session

from app.models.interview_settings import InterviewSettings

from app.schemas.interview_settings import (
    InterviewSettingsUpdate,
)


# ---------------------------------------------------
# Default Values
# ---------------------------------------------------

def create_default_settings(db: Session):

    settings = InterviewSettings(

        interview_duration=30,

        passing_score=70,

        anti_cheat_enabled=True,

        face_verification=True,

        tab_switch_detection=True,

        multiple_face_detection=True,

        copy_paste_block=True,

        fullscreen_required=False,

        auto_submit=True,

        max_tab_switch=3,

        max_no_face_seconds=10,

        max_multiple_face_seconds=5,

    )

    db.add(settings)
    db.commit()
    db.refresh(settings)

    return settings


# ---------------------------------------------------
# Get Settings
# ---------------------------------------------------

def get_interview_settings(db: Session):

    settings = db.query(
        InterviewSettings
    ).first()

    if not settings:

        settings = create_default_settings(db)

    return settings


# ---------------------------------------------------
# Update Settings
# ---------------------------------------------------

def update_interview_settings(

    db: Session,

    payload: InterviewSettingsUpdate,

):

    settings = db.query(
        InterviewSettings
    ).first()

    if not settings:

        settings = create_default_settings(db)

    data = payload.model_dump(
        exclude_unset=True
    )

    for key, value in data.items():

        setattr(
            settings,
            key,
            value,
        )

    db.commit()

    db.refresh(settings)

    return settings


# ---------------------------------------------------
# Reset Settings
# ---------------------------------------------------

def reset_interview_settings(db: Session):

    settings = db.query(
        InterviewSettings
    ).first()

    if settings:

        db.delete(settings)

        db.commit()

    return create_default_settings(db)