import re

USERNAME_REGEX = r"^[A-Za-z0-9_]{3,30}$"

MEETING_REGEX = r"^[A-Za-z0-9_-]{4,50}$"


def validate_username(username: str):

    return bool(
        re.fullmatch(
            USERNAME_REGEX,
            username,
        )
    )


def validate_meeting_id(meeting_id: str):

    return bool(
        re.fullmatch(
            MEETING_REGEX,
            meeting_id,
        )
    )


def validate_filename(filename: str):

    allowed = (
        ".jpg",
        ".jpeg",
        ".png",
    )

    filename = filename.lower()

    return filename.endswith(allowed)