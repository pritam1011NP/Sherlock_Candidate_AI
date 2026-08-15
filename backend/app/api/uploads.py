from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db

from app.auth.jwt import permission_required

from app.schemas.upload_record import UploadRecord

from app.services.upload_record_service import (
    get_uploads,
    delete_upload,
)

router = APIRouter(
    prefix="/uploads",
    tags=["Uploads"],
)


# ----------------------------------------
# List Uploads
# ----------------------------------------

@router.get(
    "/",
    response_model=list[UploadRecord],
)
def list_uploads(
    db: Session = Depends(get_db),
    current_user=Depends(
        permission_required("upload:view")
    ),
):
    """
    Return all uploaded images.
    """
    return get_uploads(db)


# ----------------------------------------
# Delete Upload
# ----------------------------------------

@router.delete(
    "/{upload_id}",
)
def remove_upload(
    upload_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(
        permission_required("upload:delete")
    ),
):
    """
    Delete an uploaded image and its database record.
    """

    upload = delete_upload(
        upload_id,
        db,
    )

    if upload is None:
        raise HTTPException(
            status_code=404,
            detail="Upload not found.",
        )

    return {
        "success": True,
        "message": "Upload deleted successfully.",
    }