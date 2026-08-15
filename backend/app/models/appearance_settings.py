from sqlalchemy import Boolean, Column, Integer, String

from app.database.database import Base


class AppearanceSettings(Base):

    __tablename__ = "appearance_settings"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    theme = Column(
        String,
        default="Light",
    )

    primary_color = Column(
        String,
        default="#2563EB",
    )

    compact_mode = Column(
        Boolean,
        default=False,
    )

    font_size = Column(
        String,
        default="Medium",
    )

    sidebar_collapsed = Column(
        Boolean,
        default=False,
    )

    animations = Column(
        Boolean,
        default=True,
    )

    rounded_corners = Column(
        Boolean,
        default=True,
    )

    card_shadow = Column(
        Boolean,
        default=True,
    )

    dense_tables = Column(
        Boolean,
        default=False,
    )

    show_dashboard_background = Column(
        Boolean,
        default=True,
    )