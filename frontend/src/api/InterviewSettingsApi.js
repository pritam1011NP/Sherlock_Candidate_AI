import axios from "./axios";

const BASE_URL = "/interview-settings";

// -------------------------------------
// Get Interview Settings
// -------------------------------------

export async function getInterviewSettings() {

    const response = await axios.get(BASE_URL);

    return response.data;

}

// -------------------------------------
// Update Interview Settings
// -------------------------------------

export async function updateInterviewSettings(data) {

    const response = await axios.put(
        BASE_URL,
        data,
    );

    return response.data;

}

// -------------------------------------
// Reset Interview Settings
// -------------------------------------

export async function resetInterviewSettings() {

    const response = await axios.post(
        `${BASE_URL}/reset`
    );

    return response.data;

}