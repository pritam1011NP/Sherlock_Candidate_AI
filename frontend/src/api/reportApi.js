import api from "./axios";

export async function getReportsDashboard() {
    const { data } = await api.get("/reports/dashboard");
    return data;
}