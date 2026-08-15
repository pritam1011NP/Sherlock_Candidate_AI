def extract_education(text):

    lower = text.lower()

    if "phd" in lower:

        return "PhD"

    if "master" in lower:

        return "Master"

    if "b.tech" in lower:

        return "B.Tech"

    if "bachelor" in lower:

        return "Bachelor"

    if "diploma" in lower:

        return "Diploma"

    return "Unknown"