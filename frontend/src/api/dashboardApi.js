import axios from "./axios";

/* ==========================================
   Dashboard Summary
========================================== */

export const getDashboardSummary = async () => {
    const { data } = await axios.get("/dashboard/summary");
    return data;
};

/* ==========================================
   Dashboard Statistics
========================================== */

export const getDashboardStats = async () => {
    const { data } = await axios.get("/dashboard/stats");
    return data;
};

/* ==========================================
   AI Insights
========================================== */

export const getAIInsights = async () => {
    const { data } = await axios.get("/dashboard/ai-insights");
    return data;
};

/* ==========================================
   Top Candidates
========================================== */

export const getTopCandidates = async () => {
    const { data } = await axios.get("/dashboard/top-candidates");
    return data;
};

/* ==========================================
   Hiring Funnel
========================================== */

export const getHiringFunnel = async () => {
    const { data } = await axios.get("/dashboard/hiring_funnel");
    return data;
};

/* ==========================================
   Recent Uploads
========================================== */

export const getRecentUploads = async () => {
    const { data } = await axios.get("/dashboard/recent_uploads");
    return data;
};

/* ==========================================
   Recent Interviews
========================================== */

export const getRecentInterviews = async () => {
    const { data } = await axios.get("/dashboard/recent_interviews");
    return data;
};

/* ==========================================
   Live Notifications
========================================== */

export const getNotifications = async () => {
    const { data } = await axios.get("/dashboard/notifications");
    return data;
};

/* ==========================================
   Daily Upload Analytics
========================================== */

export const getDailyUploads = async () => {
    const { data } = await axios.get("/analytics/daily-uploads");
    return data;
};

/* ==========================================
   Daily Match Analytics
========================================== */

export const getDailyMatches = async () => {
    const { data } = await axios.get("/analytics/daily-matches");
    return data;
};

/* ==========================================
   Success Rate
========================================== */

export const getSuccessRate = async () => {
    const { data } = await axios.get("/analytics/success-rate");
    return data;
};

/* ==========================================
   Interview Statistics
========================================== */

export const getInterviewStats = async () => {
    const { data } = await axios.get("/dashboard/interview-stats");
    return data;
};