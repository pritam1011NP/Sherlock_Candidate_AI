from app.ai.resume_parser import extract_resume_text
from app.ai.skill_extractor import extract_skills
from app.ai.experience_extractor import extract_experience
from app.ai.education_extractor import extract_education
from app.ai.resume_scoring import calculate_resume_score


def analyze_resume(pdf_path):

    text = extract_resume_text(pdf_path)

    skills = extract_skills(text)

    experience = extract_experience(text)

    education = extract_education(text)

    score = calculate_resume_score(

        skills,

        experience,

        education,

    )

    return {

        "skills": skills,

        "experience": experience,

        "education": education,

        "resume_score": score,

    }