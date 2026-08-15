import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:8000",
});

API.interceptors.request.use((config) => {

    const token = localStorage.getItem("token");

    if (token) {

        config.headers.Authorization = `Bearer ${token}`;

    }

    return config;

});

// ------------------------------------
// Dashboard Analytics
// ------------------------------------

export async function getDashboardAnalytics() {

    const response = await API.get(
        "/analytics/"
    );

    return response.data;

}