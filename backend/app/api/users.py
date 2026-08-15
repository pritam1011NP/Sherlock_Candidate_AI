from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db

from app.auth.jwt import permission_required

from app.schemas.user import (
    UserCreate,
    UserUpdateRole,
    UserUpdatePassword,
    UserResponse,
)

from app.services.user_service import (
    create_user,
    get_users,
    update_role,
    update_password,
    deactivate_user,
    activate_user,
    delete_user,
)

router = APIRouter(
    prefix="/users",
    tags=["Users"],
)


# -----------------------------------
# Create User
# -----------------------------------

@router.post(
    "/",
    response_model=UserResponse,
)
def create_new_user(
    request: UserCreate,
    db: Session = Depends(get_db),
    current_user=Depends(
        permission_required("users:create")
    ),
):

    user = create_user(
        db=db,
        username=request.username,
        password=request.password,
        role=request.role,
    )

    if user is None:
        raise HTTPException(
            status_code=400,
            detail="Username already exists or invalid role.",
        )

    return user


# -----------------------------------
# Get All Users
# -----------------------------------

@router.get(
    "/",
    response_model=list[UserResponse],
)
def list_users(
    db: Session = Depends(get_db),
    current_user=Depends(
        permission_required("users:view")
    ),
):

    return get_users(db)


# -----------------------------------
# Update User Role
# -----------------------------------

@router.put(
    "/{user_id}/role",
    response_model=UserResponse,
)
def change_role(
    user_id: int,
    request: UserUpdateRole,
    db: Session = Depends(get_db),
    current_user=Depends(
        permission_required("users:update")
    ),
):

    user = update_role(
        db=db,
        user_id=user_id,
        role=request.role,
    )

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found.",
        )

    return user


# -----------------------------------
# Update Password
# -----------------------------------

@router.put("/{user_id}/password")
def change_password(
    user_id: int,
    request: UserUpdatePassword,
    db: Session = Depends(get_db),
    current_user=Depends(
        permission_required("users:update")
    ),
):

    user = update_password(
        db=db,
        user_id=user_id,
        password=request.password,
    )

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found.",
        )

    return {
        "message": "Password updated successfully."
    } 

##----------------------##
##      Deative API     ##
##----------------------##
@router.put(
    "/{user_id}/deactivate",
    response_model=UserResponse,
)
def deactivate(
    user_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(
        permission_required("users:update")
    ),
):

    user = deactivate_user(
        db,
        user_id,
    )

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found.",
        )

    return user

##----------------------##
##      Activate API    ##
##----------------------##

@router.put(
    "/{user_id}/activate",
    response_model=UserResponse,
)
def activate(
    user_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(
        permission_required("users:update")
    ),
):

    user = activate_user(
        db,
        user_id,
    )

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found.",
        )

    return user

##----------------------##
##      Delete API      ##
##----------------------##

@router.delete(
    "/{user_id}",
)
def remove_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(
        permission_required("users:delete")
    ),
):

    deleted = delete_user(
        db,
        user_id,
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="User not found.",
        )

    return {
        "message": "User deleted successfully."
    }