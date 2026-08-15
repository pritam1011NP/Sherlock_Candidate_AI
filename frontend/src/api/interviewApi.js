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

// ======================================
// Interview Questions
// ======================================

export async function getInterviewQuestions(candidateId) {

    const response = await API.get(
        `/interview/questions/${candidateId}`
    );

    return response.data;
}

// ======================================
// Upload Candidate Answer
// ======================================

export async function uploadInterviewAnswer(formData) {

    const response = await API.post(
        "/interview-answers/upload",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
}

// ======================================
// AI Interview Result
// ======================================

export async function getInterviewResult(candidateId) {

    const response = await API.get(
        `/interview/result/${candidateId}`
    );

    return response.data;
}

// ======================================
// Candidate Interview History
// ======================================

export async function getInterviewHistory(candidateId) {

    const response = await API.get(
        `/interview/history/${candidateId}`
    );

    return response.data;
}

// ======================================
// AI Candidate Recommendation
// ======================================

export async function getCandidateRecommendation(candidateId) {

    const response = await API.get(
        `/interview/recommendation/${candidateId}`
    );

    return response.data;
}

// ======================================
// Download Interview Report
// ======================================

export async function downloadInterviewReport(candidateId) {

    const response = await API.get(
        `/interview/report/${candidateId}`,
        {
            responseType: "blob",
        }
    );

    return response.data;
}

// ======================================
// Dashboard Interview Statistics
// ======================================

export async function getInterviewStatistics() {

    const response = await API.get(
        "/interview/statistics"
    );

    return response.data;
}

// ======================================
//  Interview Status
// ======================================
export async function getInterviewStatus() {

    const { data } = await api.get(
        "/interview/live-status"
    );

    return data;

}