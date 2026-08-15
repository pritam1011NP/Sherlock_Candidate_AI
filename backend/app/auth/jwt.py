from datetime import datetime, timedelta

from jose import JWTError, jwt

from fastapi import (
    Depends,
    HTTPException,
    status,
)

from fastapi.security import OAuth2PasswordBearer

from app.config import (
    SECRET_KEY,
    ALGORITHM,
    ACCESS_TOKEN_EXPIRE_MINUTES,
)

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/auth/login"
)


def create_access_token(data: dict):

    payload = data.copy()

    expire = datetime.utcnow() + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    payload.update(
        {
            "exp": expire
        }
    )

    return jwt.encode(
        payload,
        SECRET_KEY,
        algorithm=ALGORITHM,
    )


from jose import JWTError, jwt

def get_current_user(
    token: str = Depends(oauth2_scheme),
):
    print("\n========================")
    print("TOKEN:", token)

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM],
        )

        print("PAYLOAD:", payload)

        username = payload.get("sub")
        role = payload.get("role")

        print("USERNAME:", username)
        print("ROLE:", role)

        return {
            "username": username,
            "role": role,
        }

    except Exception as e:
        print("JWT ERROR:", repr(e))

        raise HTTPException(
            status_code=401,
            detail="Could not validate credentials",
        )


def permission_required(permission: str):

    def checker(
        current_user=Depends(get_current_user),
    ):

        print("Permission requested =", permission)
        print("Current user =", current_user)

        return current_user

    return checker