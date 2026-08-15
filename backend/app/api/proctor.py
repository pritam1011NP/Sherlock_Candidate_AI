from fastapi import APIRouter
from pydantic import BaseModel
from datetime import datetime

router = APIRouter(
    prefix="/proctor",
    tags=["Proctor"],
)


# ===============================
# Request Model
# ===============================

class ViolationRequest(BaseModel):
    candidate_id: int
    violation_type: str
    message: str


# ===============================
# Store violations (temporary)
# Replace with DB later
# ===============================

violations = []


# ===============================
# Log Violation
# ===============================

@router.post("/violation")
def log_violation(data: ViolationRequest):

    violation = {
        "candidate_id": data.candidate_id,
        "type": data.violation_type,
        "message": data.message,
        "time": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
    }

    violations.append(violation)

    return {
        "success": True,
        "message": "Violation recorded.",
        "data": violation,
    }


# ===============================
# Get Candidate Violations
# ===============================

@router.get("/violations/{candidate_id}")
def get_candidate_violations(candidate_id: int):

    result = [
        v
        for v in violations
        if v["candidate_id"] == candidate_id
    ]

    return {
        "candidate_id": candidate_id,
        "count": len(result),
        "violations": result,
    }


# ===============================
# Get All Violations
# ===============================

@router.get("/violations")
def get_all_violations():

    return {
        "count": len(violations),
        "violations": violations,
    }


# ===============================
# Clear Violations
# ===============================

@router.delete("/violations")
def clear_violations():

    violations.clear()

    return {
        "success": True,
        "message": "All violations cleared.",
    }