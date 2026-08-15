import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
});

api.interceptors.request.use((config) => {

    console.log("All LocalStorage =", localStorage);

    const token = localStorage.getItem("access_token");

    console.log("TOKEN =", token);

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    console.log("Authorization =", config.headers.Authorization);

    return config;

});

export default api;