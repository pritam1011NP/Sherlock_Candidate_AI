from pydantic import BaseModel, ConfigDict, Field, field_validator


class UserCreate(BaseModel):
    username: str = Field(
        min_length=3,
        max_length=30,
        description="Unique username",
        examples=["john_doe"],
    )

    password: str = Field(
        min_length=8,
        max_length=100,
        description="User password",
        examples=["MyPassword123"],
    )

    role: str = Field(
        default="user",
        description="User role",
        examples=["user"],
    )

    @field_validator("username")
    @classmethod
    def validate_username(cls, value: str):
        value = value.strip()

        if not value:
            raise ValueError("Username cannot be empty.")

        return value

    @field_validator("password")
    @classmethod
    def validate_password(cls, value: str):
        if not any(c.isupper() for c in value):
            raise ValueError(
                "Password must contain at least one uppercase letter."
            )

        if not any(c.islower() for c in value):
            raise ValueError(
                "Password must contain at least one lowercase letter."
            )

        if not any(c.isdigit() for c in value):
            raise ValueError(
                "Password must contain at least one number."
            )

        return value

    @field_validator("role")
    @classmethod
    def validate_role(cls, value: str):
        value = value.lower().strip()

        allowed_roles = [
            "admin",
            "user",
        ]

        if value not in allowed_roles:
            raise ValueError(
                f"Role must be one of {allowed_roles}"
            )

        return value


class UserUpdateRole(BaseModel):
    role: str = Field(
        description="New user role",
        examples=["admin"],
    )

    @field_validator("role")
    @classmethod
    def validate_role(cls, value: str):
        value = value.lower().strip()

        allowed_roles = [
            "admin",
            "user",
        ]

        if value not in allowed_roles:
            raise ValueError(
                f"Role must be one of {allowed_roles}"
            )

        return value


class UserUpdatePassword(BaseModel):
    password: str = Field(
        min_length=8,
        max_length=100,
        description="New password",
        examples=["NewPassword123"],
    )

    @field_validator("password")
    @classmethod
    def validate_password(cls, value: str):
        if not any(c.isupper() for c in value):
            raise ValueError(
                "Password must contain at least one uppercase letter."
            )

        if not any(c.islower() for c in value):
            raise ValueError(
                "Password must contain at least one lowercase letter."
            )

        if not any(c.isdigit() for c in value):
            raise ValueError(
                "Password must contain at least one number."
            )

        return value


class UserResponse(BaseModel):
    id: int
    username: str
    role: str
    is_active: bool

    model_config = ConfigDict(
        from_attributes=True
    )