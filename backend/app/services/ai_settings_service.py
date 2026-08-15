from sqlalchemy.orm import Session

from app.models.ai_settings import AISettings
from app.schemas.ai_settings import AISettingsUpdate


# -------------------------------------------------
# Create Default Settings
# -------------------------------------------------

def _create_default_settings(db: Session):

    settings = AISettings()

    db.add(settings)

    db.commit()

    db.refresh(settings)

    return settings


# -------------------------------------------------
# Get Settings
# -------------------------------------------------

def get_ai_settings(db: Session):

    settings = db.query(AISettings).first()

    if settings is None:

        settings = _create_default_settings(db)

    return settings


# -------------------------------------------------
# Update Settings
# -------------------------------------------------

def update_ai_settings(
    db: Session,
    data: AISettingsUpdate,
):

    settings = db.query(AISettings).first()

    if settings is None:

        settings = _create_default_settings(db)

    update_data = data.model_dump()

    for key, value in update_data.items():

        setattr(
            settings,
            key,
            value,
        )

    db.commit()

    db.refresh(settings)

    return settings


# -------------------------------------------------
# Reset Settings
# -------------------------------------------------

def reset_ai_settings(db: Session):

    settings = db.query(AISettings).first()

    if settings:

        db.delete(settings)

        db.commit()

    return _create_default_settings(db)