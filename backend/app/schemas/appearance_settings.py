from pydantic import BaseModel


class AppearanceSettingsBase(BaseModel):

    theme: str = "Light"

    primary_color: str = "#2563EB"

    compact_mode: bool = False

    font_size: str = "Medium"

    sidebar_collapsed: bool = False

    animations: bool = True

    rounded_corners: bool = True

    card_shadow: bool = True

    dense_tables: bool = False

    show_dashboard_background: bool = True


class AppearanceSettingsUpdate(AppearanceSettingsBase):
    pass


class AppearanceSettingsResponse(AppearanceSettingsBase):

    id: int

    class Config:
        from_attributes = True