from difflib import SequenceMatcher

NAME_WEIGHT = 25
EMAIL_WEIGHT = 20
CAMERA_WEIGHT = 10
SPEAKING_WEIGHT = 20
JOIN_WEIGHT = 10
EVENT_WEIGHT = 15


def similarity(a: str, b: str) -> float:
    """
    Returns similarity score between 0 and 1.
    """
    if not a or not b:
        return 0.0

    return SequenceMatcher(
        None,
        a.lower(),
        b.lower()
    ).ratio()


def calculate_confidence(
    participant,
    interview,
    events
):
    score = 0

    reasons = []

    # -----------------------
    # Name Matching
    # -----------------------
    name_score = similarity(
        participant.display_name,
        interview.candidate_name
    )

    gained = NAME_WEIGHT * name_score

    score += gained

    if gained > 0:
        reasons.append(
            f"Display name matched (+{gained:.1f})"
        )

    # -----------------------
    # Email Matching
    # -----------------------
    email_score = similarity(
        participant.email or "",
        interview.candidate_email or ""
    )

    gained = EMAIL_WEIGHT * email_score

    score += gained

    if gained > 0:
        reasons.append(
            f"Email matched (+{gained:.1f})"
        )

    # -----------------------
    # Camera
    # -----------------------
    if participant.camera_on:

        score += CAMERA_WEIGHT

        reasons.append(
            f"Camera enabled (+{CAMERA_WEIGHT})"
        )

    # -----------------------
    # Speaking
    # -----------------------
    speaking = min(
        participant.speaking_duration / 60,
        1.0
    )

    gained = speaking * SPEAKING_WEIGHT

    score += gained

    if gained > 0:
        reasons.append(
            f"Speaking activity (+{gained:.1f})"
        )

    # -----------------------
    # Join Event
    # -----------------------
    joined = any(
        e.event_type == "JOIN"
        for e in events
    )

    if joined:

        score += JOIN_WEIGHT

        reasons.append(
            f"Joined meeting (+{JOIN_WEIGHT})"
        )

    # -----------------------
    # Event History
    # -----------------------
    event_bonus = min(
        len(events),
        5
    ) / 5

    gained = event_bonus * EVENT_WEIGHT

    score += gained

    if gained > 0:
        reasons.append(
            f"Active participant (+{gained:.1f})"
        )

    return round(score, 2), reasons