from pydantic import BaseModel


class SystemInfo(BaseModel):
    app_name: str
    version: str
    python_version: str
    database: str
    uploads: int
    matches: int
    interviews: int


class HealthResponse(BaseModel):
    status: str
    database: str