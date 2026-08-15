from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    Boolean,
    Float,
)

from sqlalchemy.sql import func

from app.database.database import Base


class Upload(Base):

    __tablename__ = "uploads"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    filename = Column(
        String,
        nullable=False,
    )

    image_type = Column(
        String,
        nullable=False,
    )

    image_hash = Column(
        String,
        unique=True,
        nullable=True,
    )

    embedding_path = Column(
        String,
        nullable=True,
    )

    face_quality = Column(
        Float,
        default=0.0,
    )

    verified = Column(
        Boolean,
        default=False,
    )

    uploaded_by = Column(
        String,
        nullable=True,
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
    )