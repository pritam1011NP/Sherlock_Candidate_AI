from pydantic import BaseModel, Field


class ForgotPasswordRequest(BaseModel):
    username: str = Field(
        min_length=3,
        max_length=30,
        description="Username of the account",
        examples=["admin"],
    )


class ResetPasswordRequest(BaseModel):
    token: str = Field(
        min_length=20,
        max_length=255,
        description="Password reset token",
    )

    new_password: str = Field(
        min_length=8,
        max_length=100,
        description="New password",
        examples=["MyStrongPassword123!"],
    )