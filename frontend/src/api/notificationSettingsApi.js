import api from "./axios";

export async function getNotificationSettings() {

    const { data } = await api.get("/notification-settings");

    return data;

}

export async function updateNotificationSettings(payload) {

    const { data } = await api.put(
        "/notification-settings",
        payload,
    );

    return data;

}

export async function resetNotificationSettings() {

    const { data } = await api.post(
        "/notification-settings/reset",
    );

    return data;

}