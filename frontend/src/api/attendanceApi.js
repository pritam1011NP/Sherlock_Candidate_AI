import api from "./axios";

// =========================
// Attendance List
// =========================

export async function getAttendance() {

    const response = await api.get("/attendance");

    return response.data;

}

// =========================
// Today's Attendance
// =========================

export async function getTodayAttendance() {

    const { data } = await api.get("/attendance/today");

    return data;

}

// =========================
// Attendance Statistics
// =========================

export async function getAttendanceStats() {

    const { data } = await api.get("/attendance/stats");

    return data;

}

// =========================
// Monthly Heatmap
// =========================

export async function getAttendanceHeatmap() {

    const { data } = await api.get("/attendance/heatmap");

    return data;

}
export async function checkIn(payload) {
    const { data } = await api.post(
        "/attendance/checkin",
        payload
    );
    return data;
}