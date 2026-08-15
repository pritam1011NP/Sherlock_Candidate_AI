import json
from openai import OpenAI

from app.config import settings

client = OpenAI(
    api_key=settings.OPENAI_API_KEY,
)


def evaluate_resume_answer(

    resume_text,
    position,
    question,
    answer,

):

    prompt = f"""
You are a Senior Technical Interviewer.

Resume:
{resume_text}

Position:
{position}

Interview Question:
{question}

Candidate Answer:
{answer}

Return ONLY valid JSON.

{{
    "technical_score":0,
    "communication_score":0,
    "confidence_score":0,
    "problem_solving":0,
    "overall_score":0,
    "strengths":[],
    "weaknesses":[],
    "feedback":"",
    "recommendation":""
}}
"""

    response = client.chat.completions.create(

        model="gpt-4.1",

        messages=[

            {
                "role": "system",
                "content": "You are an AI Interview Evaluator."
            },

            {
                "role": "user",
                "content": prompt
            }

        ],

        temperature=0.2,

    )

    content = response.choices[0].message.content

    return json.loads(content)