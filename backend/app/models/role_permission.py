from sqlalchemy import (
    Column,
    Integer,
    String,
)

from app.database.database import Base


class RolePermission(Base):

    __tablename__ = "role_permissions"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    role = Column(
        String,
        nullable=False,
        index=True,
    )

    permission = Column(
        String,
        nullable=False,
        index=True,
    )