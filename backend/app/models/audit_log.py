from datetime import datetime

from sqlalchemy import (
    Column,
    DateTime,
    Integer,
    String,
)

from app.database.database import Base


class AuditLog(Base):

    __tablename__ = "audit_logs"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    username = Column(
        String,
        nullable=False
    )

    action = Column(
        String,
        nullable=False
    )

    details = Column(
        String,
        nullable=True
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )