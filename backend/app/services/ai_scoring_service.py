from collections import Counter


# --------------------------------------------------
# Skill Categories
# --------------------------------------------------

ROLE_SKILLS = {

    "Backend Developer": [
        "Python",
        "FastAPI",
        "Flask",
        "Django",
        "SQL",
        "MySQL",
        "MongoDB",
        "Docker",
        "Git",
        "Linux",
    ],

    "Frontend Developer": [
        "React",
        "Angular",
        "Vue",
        "JavaScript",
        "HTML",
        "CSS",
        "Git",
    ],

    "Full Stack Developer": [
        "Python",
        "React",
        "FastAPI",
        "SQL",
        "Docker",
        "Git",
        "Linux",
    ],

    "AI Engineer": [
        "Python",
        "Machine Learning",
        "Deep Learning",
        "TensorFlow",
        "PyTorch",
        "OpenCV",
        "NLP",
        "Pandas",
        "NumPy",
    ],

    "Cloud Engineer": [
        "AWS",
        "Azure",
        "Docker",
        "Kubernetes",
        "Linux",
        "Git",
    ],
}


# --------------------------------------------------
# Recommendation
# --------------------------------------------------

def recommendation(score):

    if score >= 85:
        return "Highly Recommended"

    if score >= 70:
        return "Shortlist"

    if score >= 50:
        return "Maybe"

    return "Reject"


# --------------------------------------------------
# Confidence
# --------------------------------------------------

def confidence(score):

    if score >= 90:
        return 98

    if score >= 80:
        return 94

    if score >= 70:
        return 90

    if score >= 60:
        return 85

    return 75


# --------------------------------------------------
# Strengths
# --------------------------------------------------

def strengths(

    skills,
    experience,
    certifications,
    projects,

):

    result = []

    if len(skills) >= 8:
        result.append("Strong technical skill set")

    if experience >= 2:
        result.append("Good industry experience")

    if projects >= 3:
        result.append("Strong project portfolio")

    if len(certifications):
        result.append("Industry certifications")

    for skill in skills[:5]:
        result.append(skill)

    return list(dict.fromkeys(result))


# --------------------------------------------------
# Weaknesses
# --------------------------------------------------

def weaknesses(

    skills,
    experience,
    certifications,

):

    result = []

    important = [

        "Docker",
        "AWS",
        "Git",
        "Linux",

    ]

    for item in important:

        if item not in skills:
            result.append(f"No {item}")

    if experience == 0:
        result.append("No industry experience")

    if len(certifications) == 0:
        result.append("No certifications")

    return result


# --------------------------------------------------
# Suggested Role
# --------------------------------------------------

def suggest_role(skills):

    counter = Counter()

    for role, required in ROLE_SKILLS.items():

        score = 0

        for skill in required:

            if skill in skills:
                score += 1

        counter[role] = score

    if not counter:
        return "General Candidate"

    return counter.most_common(1)[0][0]


# --------------------------------------------------
# Final AI Result
# --------------------------------------------------

def generate_ai_result(

    analysis,

):

    overall = analysis["score"]

    return {

        "overall_score": overall,

        "recommendation":
            recommendation(overall),

        "confidence":
            confidence(overall),

        "suggested_role":
            suggest_role(
                analysis["skills"]
            ),

        "strengths":
            strengths(

                analysis["skills"],
                analysis["experience"],
                analysis["certifications"],
                analysis["projects"],

            ),

        "weaknesses":
            weaknesses(

                analysis["skills"],
                analysis["experience"],
                analysis["certifications"],

            ),

    }