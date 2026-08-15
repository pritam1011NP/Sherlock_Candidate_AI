import api from "./axios";

// -------------------------------------
// Get AI Settings
// -------------------------------------

export async function getAISettings() {

    const response = await api.get(
        "/ai/settings/"
    );

    return response.data;

}

// -------------------------------------
// Update AI Settings
// -------------------------------------

export async function updateAISettings(data) {

    const response = await api.put(
        "/ai/settings/",
        data,
    );

    return response.data;

}

// -------------------------------------
// Reset AI Settings
// -------------------------------------

export async function resetAISettings() {

    const response = await api.post(
        "/ai/settings/reset"
    );

    return response.data;

}