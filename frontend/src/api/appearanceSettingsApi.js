import api from "./axios";

export async function getAppearanceSettings() {
    const { data } = await api.get("/appearance-settings/");
    return data;
}

export async function updateAppearanceSettings(payload) {
    const { data } = await api.put(
        "/appearance-settings/",
        payload
    );
    return data;
}

export async function resetAppearanceSettings() {
    const { data } = await api.post(
        "/appearance-settings/reset"
    );
    return data;
}