from enum import Enum


class UserRole(str, Enum):

    ADMIN = "admin"

    INTERVIEWER = "interviewer"

    VIEWER = "viewer"