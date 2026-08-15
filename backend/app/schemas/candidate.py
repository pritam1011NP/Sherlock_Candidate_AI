from pydantic import BaseModel, EmailStr


class CandidateResponse(BaseModel):
    id: int
    full_name: str
    email: str
    phone: str
    position: str
    address: str
    status: str
    resume_path: str
    photo_path: str

    class Config:
        from_attributes = True