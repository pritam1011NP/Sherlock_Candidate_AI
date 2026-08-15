import asyncio
from sqlalchemy.orm import Session

from app.models.interview import InterviewSession
from app.schemas.interview import InterviewCreate
from app.services.audit_service import log_action
from app.services.resume_ai_service import analyze_resume
from app.services.event_service import interview_completed

def create_interview(db: Session, interview: InterviewCreate):

    db_interview = InterviewSession(
        meeting_id=interview.meeting_id,
        candidate_name=interview.candidate_name,
        candidate_email=interview.candidate_email,
    )

    db.add(db_interview)
    db.commit()
    db.refresh(db_interview)

    # Audit Log
    log_action(
        db=db,
        username="admin",
        action="CREATE_INTERVIEW",
        details=f"Interview session #{db_interview.id} created for {db_interview.candidate_name}"
    )
    # ------------------------------------
    # Notify Dashboard
    # ------------------------------------
    try:
        loop = asyncio.get_running_loop()
        loop.create_task(
            interview_completed(
                db_interview.id,
                db_interview.candidate_name,
            )
        )
    except RuntimeError:
        pass

    return db_interview


def get_interview(db: Session):
    return db.query(InterviewSession).first()


def get_interview_by_id(db: Session, interview_id: int):
    return (
        db.query(InterviewSession)
        .filter(InterviewSession.id == interview_id)
        .first()
    )



QUESTION_BANK = {

    "Python": [

        {
            "question": "Explain Python decorators.",
            "difficulty": "Medium",
        },
        {
            "question": "What is the difference between list and tuple?",
            "difficulty": "Easy",
        },
        {
            "question": "Explain generators in Python.",
            "difficulty": "Medium",
        },
    ],

    "FastAPI": [

        {
            "question": "Explain Dependency Injection in FastAPI.",
            "difficulty": "Medium",
        },
        {
            "question": "What are Pydantic models?",
            "difficulty": "Easy",
        },
        {
            "question": "How does FastAPI perform request validation?",
            "difficulty": "Medium",
        },
    ],

    "React": [

        {
            "question": "Explain Virtual DOM.",
            "difficulty": "Easy",
        },
        {
            "question": "Difference between useState and useEffect.",
            "difficulty": "Medium",
        },
        {
            "question": "Explain React component lifecycle.",
            "difficulty": "Hard",
        },
    ],

    "SQL": [

        {
            "question": "Difference between INNER JOIN and LEFT JOIN.",
            "difficulty": "Easy",
        },
        {
            "question": "Explain database normalization.",
            "difficulty": "Medium",
        },
        {
            "question": "What are indexes?",
            "difficulty": "Medium",
        },
    ],

    "Docker": [

        {
            "question": "Difference between Docker Image and Container.",
            "difficulty": "Easy",
        },
        {
            "question": "Explain Docker volumes.",
            "difficulty": "Medium",
        },
        {
            "question": "What is Docker Compose?",
            "difficulty": "Medium",
        },
    ],

    "Git": [

        {
            "question": "Difference between merge and rebase.",
            "difficulty": "Medium",
        },
        {
            "question": "Explain Git branching strategy.",
            "difficulty": "Easy",
        },
    ],

    "Machine Learning": [

        {
            "question": "Explain overfitting.",
            "difficulty": "Easy",
        },
        {
            "question": "Difference between supervised and unsupervised learning.",
            "difficulty": "Medium",
        },
        {
            "question": "What is cross validation?",
            "difficulty": "Hard",
        },
    ],

    "Deep Learning": [

        {
            "question": "Explain CNN.",
            "difficulty": "Medium",
        },
        {
            "question": "Difference between CNN and RNN.",
            "difficulty": "Hard",
        },
    ],

    "AWS": [

        {
            "question": "Explain EC2.",
            "difficulty": "Easy",
        },
        {
            "question": "What is S3?",
            "difficulty": "Easy",
        },
        {
            "question": "How would you deploy a FastAPI application on AWS?",
            "difficulty": "Hard",
        },
    ],

    "OpenCV": [

        {
            "question": "Explain Haar Cascade.",
            "difficulty": "Medium",
        },
        {
            "question": "Difference between face detection and face recognition.",
            "difficulty": "Medium",
        },
    ],
}


def generate_interview_questions(candidate):

    analysis = analyze_resume(candidate.resume_path)

    skills = analysis.get("skills", [])

    questions = []

    for skill in skills:

        if skill not in QUESTION_BANK:
            continue

        for item in QUESTION_BANK[skill]:

            questions.append({

                "question": item["question"],

                "skill": skill,

                "difficulty": item["difficulty"],

            })

    if len(questions) == 0:

        questions.append({

            "question": "Tell me about yourself.",

            "skill": "General",

            "difficulty": "Easy",

        })

    return questions[:10]