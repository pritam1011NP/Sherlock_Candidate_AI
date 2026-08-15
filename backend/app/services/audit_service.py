from sqlalchemy.orm import Session

from app.models.audit_log import AuditLog


def create_log(
    db: Session,
    username: str,
    action: str,
    details: str = "",
):
    log = AuditLog(
        username=username,
        action=action,
        details=details,
    )

    db.add(log)
    db.commit()

    db.refresh(log)

    return log


def get_logs(db: Session):

    return (
        db.query(AuditLog)
        .order_by(AuditLog.created_at.desc())
        .all()
    )

def log_action(
    db: Session,
    username: str,
    action: str,
    details: str = "",
):
    """
    Convenience wrapper for creating audit logs.
    """
    return create_log(
        db=db,
        username=username,
        action=action,
        details=details,
    )