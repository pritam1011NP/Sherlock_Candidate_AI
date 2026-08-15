from sqlalchemy.orm import Session

from app.models.appearance_settings import AppearanceSettings


def get_settings(db: Session):

    settings = db.query(
        AppearanceSettings
    ).first()

    if not settings:

        settings = AppearanceSettings()

        db.add(settings)

        db.commit()

        db.refresh(settings)

    return settings


def update_settings(
    db: Session,
    data,
):

    settings = get_settings(db)

    for key, value in data.dict().items():

        setattr(
            settings,
            key,
            value,
        )

    db.commit()

    db.refresh(settings)

    return settings


def reset_settings(db: Session):

    db.query(
        AppearanceSettings
    ).delete()

    db.commit()

    settings = AppearanceSettings()

    db.add(settings)

    db.commit()

    db.refresh(settings)

    return settings