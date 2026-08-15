from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from slowapi.middleware import SlowAPIMiddleware

from app.config import APP_NAME
from app.database.database import Base, engine, SessionLocal

# ===========================
# Models
# ===========================

import app.models.event
import app.models.participant
import app.models.upload
import app.models.match
import app.models.user
import app.models.interview_session
import app.models.candidate
import app.models.refresh_token
import app.models.password_reset
import app.models.interview_answer
import app.models.notification
from app.models.attendance import Attendance
from app.models.interview_answer import InterviewAnswer
from app.models.ai_settings import AISettings
from app.models.interview_settings import InterviewSettings
import app.models.notification_settings

# ===========================
# Routers
# ===========================

from app.api.participants import router as participant_router
from app.api.events import router as event_router
from app.api.confidence import router as confidence_router
from app.api.interview import router as interview_router
from app.api.upload import router as upload_router
from app.api.match import router as match_router
from app.api.uploads import router as uploads_router
from app.api.attendance import router as attendance_router
from app.api.verification import router as verification_router
from app.api.session import router as session_router
from app.api.live_verification import router as live_router
from app.api.auth import router as auth_router
from app.api.audit import router as audit_router
from app.api.settings import router as settings_router
from app.api.users import router as users_router
from app.api.password_reset import router as password_reset_router
from app.api.health import router as health_router
from app.api.candidates import router as candidate_router
from app.api.resume_analysis import router as resume_analysis_router
from app.api.dashboard import router as dashboard_router
from app.api.interview_report import router as interview_report_router
from app.api.notification import router as notification_router
from app.api.candidate_ai import router as candidate_ai_router
from app.api.candidate_skill import router as skill_router
from app.api.analytics import router as analytics_router
from app.api.reports import router as reports_router
from app.api.ai_settings import router as ai_settings_router
from app.api.reports import router as reports_router
from app.api.interview_live import router as interview_live_router
from app.api.proctor import router as proctor_router
from app.api.voice_emotion import router as voice_router
from app.api.candidate_ranking import router as ranking_router
from app.api.appearance_settings import (
    router as appearance_settings_router,
)
from app.models.appearance_settings import AppearanceSettings
from app.api.notification_settings import (
    router as notification_settings_router,
)
from app.api.interview_answer import (
    router as interview_answer_router,
)

from app.api.interview_result import (
    router as interview_result_router,
)

from app.api.interview_settings import (
    router as interview_settings_router,
)
# ===========================
# WebSocket
# ===========================

from app.websocket.websocket_router import (
    router as websocket_router,
)
from app.api.websocket import router as websocket_router
# ===========================
# Services
# ===========================

from app.services.permission_seed import seed_permissions

# ===========================
# Exception Handling
# ===========================

from app.exceptions.custom_exceptions import AppException

from app.exceptions.handlers import (
    app_exception_handler,
    generic_exception_handler,
)

from app.core.exception_handler import (
    http_exception_handler,
)

from app.core.rate_limit import limiter

# ===========================
# FastAPI App
# ===========================

app = FastAPI(
    title=APP_NAME,
    version="1.0.0",
)

# ===========================
# Static Files
# ===========================

app.mount(
    "/uploads",
    StaticFiles(directory="uploads"),
    name="uploads",
)

# ===========================
# CORS
# ===========================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ===========================
# Database
# ===========================

Base.metadata.create_all(bind=engine)

db = SessionLocal()

try:

    seed_permissions(db)

finally:

    db.close()

# ===========================
# Routers
# ===========================

app.include_router(participant_router)
app.include_router(event_router)
app.include_router(confidence_router)
app.include_router(interview_router)
app.include_router(interview_answer_router)   # NEW
app.include_router(upload_router)
app.include_router(match_router)
app.include_router(uploads_router)
app.include_router(verification_router)
app.include_router(session_router)
app.include_router(live_router)
app.include_router(dashboard_router)
app.include_router(auth_router)
app.include_router(analytics_router)
app.include_router(audit_router)
app.include_router(settings_router)
app.include_router(users_router)
app.include_router(password_reset_router)
app.include_router(candidate_router)
app.include_router(resume_analysis_router)
app.include_router(health_router)
app.include_router(interview_result_router)
app.include_router(interview_report_router)
app.include_router(notification_router)
app.include_router(websocket_router)
app.include_router(attendance_router)
app.include_router(candidate_ai_router)
app.include_router(skill_router)
app.include_router(reports_router)
app.include_router(ai_settings_router)
app.include_router(interview_settings_router)
app.include_router(reports_router)
app.include_router(notification_settings_router)
app.include_router(interview_live_router)
app.include_router(proctor_router)
app.include_router(voice_router)
app.include_router(ranking_router)
app.include_router(
    appearance_settings_router
)

# ===========================
# Rate Limiter
# ===========================

app.state.limiter = limiter

app.add_middleware(
    SlowAPIMiddleware,
)

# ===========================
# Exception Handlers
# ===========================

app.add_exception_handler(
    AppException,
    app_exception_handler,
)

app.add_exception_handler(
    HTTPException,
    http_exception_handler,
)

app.add_exception_handler(
    Exception,
    generic_exception_handler,
)

# ===========================
# Default Routes
# ===========================

@app.get("/")
def home():

    return {

        "message": "Sherlock Candidate Identification API"

    }


@app.get("/health")
def health():

    return {

        "status": "running"

    }