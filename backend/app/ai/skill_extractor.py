import spacy

nlp = spacy.load("en_core_web_sm")


SKILLS = [

    "python",
    "java",
    "javascript",
    "react",
    "node",
    "sql",
    "mysql",
    "postgresql",
    "mongodb",
    "docker",
    "kubernetes",
    "aws",
    "azure",
    "git",
    "fastapi",
    "django",
    "flask",
    "tensorflow",
    "pytorch",
    "machine learning",
    "deep learning",
    "opencv",
    "html",
    "css",

]


def extract_skills(text):

    lower = text.lower()

    found = []

    for skill in SKILLS:

        if skill in lower:

            found.append(skill)

    return list(set(found))