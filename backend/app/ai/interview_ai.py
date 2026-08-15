import random


def evaluate_interview():

    technical = random.randint(65, 98)

    communication = random.randint(60, 98)

    confidence = random.randint(70, 99)

    overall = round(
        (technical + communication + confidence) / 3,
        1,
    )

    if overall >= 85:

        recommendation = "Strong Hire"

    elif overall >= 70:

        recommendation = "Hire"

    elif overall >= 55:

        recommendation = "Hold"

    else:

        recommendation = "Reject"

    summary = (
        f"The candidate demonstrated "
        f"{technical}% technical ability, "
        f"{communication}% communication skills "
        f"and {confidence}% confidence."
    )

    return {

        "technical_score": technical,

        "communication_score": communication,

        "confidence_score": confidence,

        "overall_score": overall,

        "recommendation": recommendation,

        "summary": summary,

    }