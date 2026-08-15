import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";

import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";

// Candidate Pages
import CandidateUpload from "../pages/CandidateUpload/CandidateUpload";
import Candidates from "../pages/Candidates/Candidates";
import CandidateDetails from "../pages/Candidates/CandidateDetails";
import CandidateEdit from "../pages/Candidates/CandidateEdit";
import CandidateProfile from "../pages/Candidates/CandidateProfile";

// Resume
import ResumeAnalysis from "../pages/ResumeAnalysis/ResumeAnalysis";

// Interview
import InterviewPage from "../pages/Interview/InterviewPage";
import InterviewResult from "../pages/Interview/InterviewResult";

// Attendance
import Attendance from "../pages/Attendance/Attendance";

// Analytics
import Analytics from "../pages/Analytics/Analytics";

// Settings
import Settings from "../pages/settings/Settings";
import Reports from "../pages/Reports/Reports";
import CandidateRanking from "../pages/Recruitment/CandidateRanking";
import InterviewAnalytics from "../pages/Interview/InterviewAnalytics";
export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Login */}
                <Route
                    path="/login"
                    element={<Login />}
                />

                {/* Protected Routes */}
                <Route
                    element={
                        <ProtectedRoute>
                            <MainLayout />
                        </ProtectedRoute>
                    }
                >
                    {/* Dashboard */}
                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                    {/* Candidates */}
                    <Route
                        path="/candidates"
                        element={<Candidates />}
                    />

                    <Route
                        path="/candidates/:id"
                        element={<CandidateDetails />}
                    />

                    <Route
                        path="/candidate-profile/:id"
                        element={<CandidateProfile />}
                    />

                    <Route
                        path="/candidates/edit/:id"
                        element={<CandidateEdit />}
                    />

                    {/* Upload */}
                    <Route
                        path="/upload"
                        element={<CandidateUpload />}
                    />

                    {/* Resume */}
                    <Route
                        path="/resume-analysis/:id"
                        element={<ResumeAnalysis />}
                    />

                    {/* Interview */}
                    <Route
                        path="/interview/:id"
                        element={<InterviewPage />}
                    />

                    <Route
                        path="/interview/result/:id"
                        element={<InterviewResult />}
                    />
                    <Route
                        path="/interview/analytics/:id"
                        element={<InterviewAnalytics />}
                    />

                    {/* Attendance */}
                    <Route
                        path="/attendance"
                        element={<Attendance />}
                    />

                    {/* Analytics */}
                    <Route
                        path="/analytics"
                        element={<Analytics />}
                    />
                    <Route
    path="/candidate-ranking"
    element={<CandidateRanking />}
/>

                   

                    {/* Settings */}
                    <Route
                        path="/settings"
                        element={<Settings />}
                    />
                </Route>
                <Route
                        path="/reports"
                        element={<Reports />}
                    />
                

                {/* Default */}
                <Route
                    path="/"
                    element={<Navigate to="/dashboard" replace />}
                />

                {/* 404 */}
                <Route
                    path="*"
                    element={<Navigate to="/dashboard" replace />}
                />
            </Routes>
        </BrowserRouter>
    );
}