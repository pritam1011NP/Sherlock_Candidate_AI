import re


def extract_experience(text):

    pattern = r"(\d+)\+?\s+years"

    matches = re.findall(pattern, text.lower())

    if matches:

        return max(map(int, matches))

    return 0