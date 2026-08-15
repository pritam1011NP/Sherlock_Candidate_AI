def calculate_resume_score(

    skills,

    experience,

    education,

):

    score = 0

    score += min(len(skills) * 5, 40)

    score += min(experience * 6, 30)

    education_score = {

        "PhD":30,

        "Master":25,

        "B.Tech":22,

        "Bachelor":20,

        "Diploma":15,

        "Unknown":5,

    }

    score += education_score.get(

        education,

        5,

    )

    return min(score,100)