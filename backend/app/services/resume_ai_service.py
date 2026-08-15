import re
import fitz


def extract_resume_text(pdf_path: str):

    document = fitz.open(pdf_path)

    text = ""

    for page in document:
        text += page.get_text()

    document.close()

    return text

def extract_email(text):

    match = re.search(
        r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}",
        text,
    )

    return match.group(0) if match else ""

def extract_phone(text):

    match = re.search(
        r"(\+91)?[6-9]\d{9}",
        text,
    )

    return match.group(0) if match else ""

SKILLS = [

    "Python",
    "Java",
    "C",
    "C++",
    "SQL",
    "MySQL",
    "MongoDB",
    "React",
    "Angular",
    "Vue",
    "Node",
    "Express",
    "FastAPI",
    "Flask",
    "Django",
    "AWS",
    "Azure",
    "Docker",
    "Kubernetes",
    "Git",
    "Linux",
    "TensorFlow",
    "PyTorch",
    "Machine Learning",
    "Deep Learning",
    "Artificial Intelligence",
    "Computer Vision",
    "NLP",
    "OpenCV",
    "Pandas",
    "NumPy",
]

def extract_skills(text):

    found = []

    lower = text.lower()

    for skill in SKILLS:

        if skill.lower() in lower:
            found.append(skill)

    return found

def extract_experience(text):

    match = re.search(
        r"(\d+)\+?\s+years?",
        text.lower(),
    )

    if match:
        return int(match.group(1))

    return 0

EDUCATION = [

    "B.Tech",
    "M.Tech",
    "BCA",
    "MCA",
    "B.Sc",
    "M.Sc",
    "Bachelor",
    "Master",
    "PhD",
    "Diploma",

]

def extract_education(text):

    result = []

    lower = text.lower()

    for degree in EDUCATION:

        if degree.lower() in lower:
            result.append(degree)

    return result

def count_projects(text):

    keywords = [

        "project",
        "projects",
        "developed",
        "implemented",
        "built",

    ]

    total = 0

    lower = text.lower()

    for word in keywords:

        total += lower.count(word)

    return total

def extract_certifications(text):

    certs = [

        "AWS",
        "Azure",
        "Google Cloud",
        "Oracle",
        "Cisco",
        "Microsoft",
        "Coursera",
        "Udemy",

    ]

    result = []

    lower = text.lower()

    for cert in certs:

        if cert.lower() in lower:
            result.append(cert)

    return result

def calculate_score(

    skills,
    education,
    experience,
    projects,
    certifications,

):

    score = 0

    score += min(len(skills) * 3, 30)

    score += min(len(education) * 5, 20)

    score += min(experience * 4, 20)

    score += min(projects * 2, 15)

    score += min(len(certifications) * 3, 15)

    return min(score, 100)

def analyze_resume(pdf_path):

    text = extract_resume_text(pdf_path)

    skills = extract_skills(text)

    education = extract_education(text)

    experience = extract_experience(text)

    projects = count_projects(text)

    certifications = extract_certifications(text)

    score = calculate_score(

        skills,
        education,
        experience,
        projects,
        certifications,

    )

    return {

        "email": extract_email(text),

        "phone": extract_phone(text),

        "skills": skills,

        "education": education,

        "experience": experience,

        "projects": projects,

        "certifications": certifications,

        "score": score,

        "resume_text": text,

    }

