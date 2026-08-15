import re


def score_answer(question, transcript, resume):

    transcript = transcript.lower()

    skills = resume.get("skills", [])

    matched_skills = []

    for skill in skills:

        if skill.lower() in transcript:

            matched_skills.append(skill)

    skill_score = 0

    if len(skills) > 0:

        skill_score = int(

            (len(matched_skills) / len(skills)) * 100

        )

    word_count = len(transcript.split())

    if word_count < 20:

        communication = 45

    elif word_count < 50:

        communication = 70

    elif word_count < 100:

        communication = 85

    else:

        communication = 95

    technical = min(

        100,

        skill_score + 20,

    )

    confidence = min(

        100,

        50 + word_count // 2,

    )

    overall = round(

        (

            technical +

            communication +

            confidence

        ) / 3,

        2,

    )

    recommendation = (

        "Strong Hire"

        if overall >= 85

        else

        "Hire"

        if overall >= 70

        else

        "Need Improvement"

    )

    return {

        "technical_score": technical,

        "communication_score": communication,

        "confidence_score": confidence,

        "overall_score": overall,

        "matched_skills": matched_skills,

        "recommendation": recommendation,

    }