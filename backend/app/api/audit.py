from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db

from app.auth.jwt import permission_required

from app.schemas.audit_log import AuditLogResponse
from app.services.audit_service import get_logs

router = APIRouter(
    prefix="/audit",
    tags=["Audit Logs"],
)


# ----------------------------------------
# View Audit Logs
# ----------------------------------------

@router.get(
    "/",
    response_model=list[AuditLogResponse],
)
def audit_logs(
    db: Session = Depends(get_db),
    current_user=Depends(
        permission_required("audit:view")
    ),
):
    return get_logs(db)