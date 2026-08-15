from io import BytesIO

from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse

from sqlalchemy.orm import Session

from reportlab.lib.colors import HexColor
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)

from reportlab.lib.enums import TA_CENTER
from reportlab.lib.units import inch

from app.database.database import get_db

from app.models.candidate import Candidate
from app.models.interview_answer import InterviewAnswer

router = APIRouter(
    prefix="/interview",
    tags=["Interview Report"],
)


@router.get("/report/{candidate_id}")
def download_report(
    candidate_id: int,
    db: Session = Depends(get_db),
):

    candidate = (
        db.query(Candidate)
        .filter(Candidate.id == candidate_id)
        .first()
    )

    if not candidate:
        raise HTTPException(
            status_code=404,
            detail="Candidate not found",
        )

    answers = (
        db.query(InterviewAnswer)
        .filter(
            InterviewAnswer.candidate_id == candidate_id
        )
        .order_by(
            InterviewAnswer.question_number
        )
        .all()
    )

    if not answers:
        raise HTTPException(
            status_code=404,
            detail="Interview not found",
        )

    overall = round(
        sum(a.ai_score for a in answers) /
        len(answers)
    )

    if overall >= 80:
        recommendation = "HIRE"

    elif overall >= 60:
        recommendation = "MAYBE"

    else:
        recommendation = "REJECT"

    buffer = BytesIO()

    doc = SimpleDocTemplate(buffer)

    styles = getSampleStyleSheet()

    title = styles["Title"]
    title.alignment = TA_CENTER

    story = []

    story.append(
        Paragraph(
            "<b>Sherlock AI Interview Report</b>",
            title,
        )
    )

    story.append(Spacer(1, 0.3 * inch))

    story.append(
        Paragraph(
            f"<b>Candidate :</b> {candidate.full_name}",
            styles["Heading2"],
        )
    )

    story.append(
        Paragraph(
            f"<b>Overall Score :</b> {overall}%",
            styles["Heading2"],
        )
    )

    story.append(
        Paragraph(
            f"<b>Recommendation :</b> {recommendation}",
            styles["Heading2"],
        )
    )

    story.append(Spacer(1, 0.3 * inch))

    for answer in answers:

        story.append(
            Paragraph(
                f"<b>Question {answer.question_number}</b>",
                styles["Heading2"],
            )
        )

        story.append(
            Paragraph(
                answer.question,
                styles["BodyText"],
            )
        )

        story.append(
            Paragraph(
                f"<b>Transcript:</b><br/>{answer.transcript}",
                styles["BodyText"],
            )
        )

        data = [

            ["Grammar", answer.grammar_score],

            ["Relevance", answer.relevance_score],

            ["Confidence", answer.confidence_score],

            ["Communication", answer.communication_score],

            ["AI Score", answer.ai_score],

        ]

        table = Table(
            data,
            colWidths=[220, 80],
        )

        table.setStyle(

            TableStyle(

                [

                    ("GRID", (0, 0), (-1, -1), 1, HexColor("#999999")),

                    ("BACKGROUND", (0, 0), (-1, 0), HexColor("#e8f4fd")),

                    ("BACKGROUND", (0, 0), (0, -1), HexColor("#f5f5f5")),

                    ("BOTTOMPADDING", (0, 0), (-1, -1), 8),

                ]

            )

        )

        story.append(table)

        story.append(Spacer(1, 0.15 * inch))

        story.append(

            Paragraph(

                f"<b>Feedback:</b><br/>{answer.feedback}",

                styles["BodyText"],

            )

        )

        story.append(Spacer(1, 0.4 * inch))

    doc.build(story)

    buffer.seek(0)

    return StreamingResponse(

        buffer,

        media_type="application/pdf",

        headers={

            "Content-Disposition":
            f'attachment; filename="Interview_Report_{candidate.full_name}.pdf"'

        },

    )