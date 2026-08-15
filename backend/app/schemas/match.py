from pydantic import BaseModel


class MatchResponse(BaseModel):
    success: bool
    similarity: float
    matched: bool
    message: str