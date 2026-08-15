from sqlalchemy.orm import Session

from app.models.role_permission import RolePermission


def has_permission(
    db: Session,
    role: str,
    permission: str,
):

    return (
        db.query(RolePermission)
        .filter(
            RolePermission.role == role,
            RolePermission.permission == permission,
        )
        .first()
        is not None
    )