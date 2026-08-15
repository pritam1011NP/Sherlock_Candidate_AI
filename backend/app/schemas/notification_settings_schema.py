from pydantic import BaseModel


class NotificationSettingsBase(BaseModel):

    email_notifications: bool
    sms_notifications: bool
    push_notifications: bool

    candidate_uploaded: bool
    interview_completed: bool
    candidate_shortlisted: bool
    candidate_rejected: bool

    weekly_report: bool
    monthly_report: bool

    security_alerts: bool


class NotificationSettingsUpdate(NotificationSettingsBase):
    pass


class NotificationSettingsResponse(NotificationSettingsBase):

    id: int

    class Config:
        from_attributes = True