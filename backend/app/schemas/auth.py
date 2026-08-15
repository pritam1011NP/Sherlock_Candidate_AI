from pydantic import BaseModel, ConfigDict, Field


class LoginRequest(BaseModel):
    username: str = Field(
        min_length=3,
        max_length=30,
    )

    password: str = Field(
        min_length=6,
        max_length=100,
    )


class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str

class RefreshTokenRequest(BaseModel):
    refresh_token: str

class TokenData(BaseModel):
    username: str | None = None


class UserResponse(BaseModel):
    id: int
    username: str
    role: str

    model_config = ConfigDict(
        from_attributes=True
    )