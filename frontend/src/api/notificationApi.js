import axios from "./axios";

export async function getNotifications() {
    const { data } = await axios.get("/notifications/");
    return data;
}

export async function markNotificationRead(id) {
    const { data } = await axios.put(`/notifications/${id}`);
    return data;
}