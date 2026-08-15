from pydantic import BaseModel


class ChartPoint(BaseModel):
    month: str
    value: int


class ReportsDashboardResponse(BaseModel):
    candidate_growth: list[ChartPoint]
    interviews: list[ChartPoint]