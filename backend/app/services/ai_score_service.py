import random


# ==========================================================
# Resume Score
# ==========================================================

def resume_score(candidate_id: int):

    return round(random.uniform(70, 98), 2)


# ==========================================================
# Face Verification Score
# ==========================================================

def face_score(candidate_id: int):

    return round(random.uniform(80, 100), 2)


# ==========================================================
# Speech Communication Score
# ==========================================================

def speech_score(candidate_id: int):

    return round(random.uniform(65, 98), 2)


# ==========================================================
# Answer Quality
# ==========================================================

def answer_score(candidate_id: int):

    return round(random.uniform(60, 98), 2)


# ==========================================================
# Proctor Score
# ==========================================================

def proctor_score(violations):

    if violations == 0:
        return 100

    deduction = violations * 8

    score = max(40, 100 - deduction)

    return score


# ==========================================================
# Final AI Score
# ==========================================================

def calculate_final_score(candidate_id, violations=0):

    resume = resume_score(candidate_id)

    face = face_score(candidate_id)

    speech = speech_score(candidate_id)

    answer = answer_score(candidate_id)

    proctor = proctor_score(violations)

    overall = round(

        resume * 0.20
        + face * 0.20
        + speech * 0.20
        + answer * 0.30
        + proctor * 0.10,

        2,
    )

    if overall >= 90:

        recommendation = "Hire"

    elif overall >= 75:

        recommendation = "Consider"

    else:

        recommendation = "Reject"

    return {

        "resume_score": resume,

        "face_score": face,

        "speech_score": speech,

        "answer_score": answer,

        "proctor_score": proctor,

        "overall_score": overall,

        "recommendation": recommendation,

    }