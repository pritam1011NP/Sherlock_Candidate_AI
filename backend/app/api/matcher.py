from difflib import SequenceMatcher


def similarity(a, b):
    return SequenceMatcher(None, a.lower(), b.lower()).ratio()


def calculate_match_score(candidate_skills, required_skills):

    if not required_skills:
        return 0

    matched = 0

    for req in required_skills:

        for skill in candidate_skills:

            if similarity(req, skill) >= 0.8:
                matched += 1
                break

    return round((matched / len(required_skills)) * 100)