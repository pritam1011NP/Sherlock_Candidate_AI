import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import {
    getDashboardStats,
    getRecentUploads,
    getHiringFunnel,
    getTopCandidates,
    getRecentInterviews,
    getAIInsights,
} from "../api/dashboardApi";

import { useDashboardSocket } from "./WebSocketContext";

const DashboardDataContext = createContext(null);

export function DashboardDataProvider({ children }) {

    const socket = useDashboardSocket();
    const lastEvent = socket?.lastEvent;

    const [loading, setLoading] = useState(true);

    const [stats, setStats] = useState({
        participants: 0,
        uploads: 0,
        interviews: 0,
        selected: 0,
    });

    const [uploads, setUploads] = useState([]);

    const [funnel, setFunnel] = useState([]);

    const [topCandidates, setTopCandidates] = useState([]);

    const [interviews, setInterviews] = useState([]);

    const [aiInsights, setAIInsights] = useState({
        ai_confidence: 0,
        resume_match: 0,
        fraud_detection: 0,
        interview_prediction: 0,
    });

    async function refreshDashboard() {

        try {

            const [
                statsData,
                uploadData,
                funnelData,
                topData,
                interviewData,
                aiData,
            ] = await Promise.all([

                getDashboardStats(),
                getRecentUploads(),
                getHiringFunnel(),
                getTopCandidates(),
                getRecentInterviews(),
                getAIInsights(),

            ]);

            setStats({

                participants: statsData?.participants ?? 0,
                uploads: statsData?.uploads ?? 0,
                interviews: statsData?.interviews ?? 0,
                selected: statsData?.selected ?? 0,

            });

            setUploads(
                Array.isArray(uploadData)
                    ? uploadData
                    : []
            );

            setFunnel(
                Array.isArray(funnelData)
                    ? funnelData
                    : []
            );

            setTopCandidates(
                Array.isArray(topData)
                    ? topData
                    : []
            );

            setInterviews(
                Array.isArray(interviewData)
                    ? interviewData
                    : []
            );

            setAIInsights({

                ai_confidence:
                    aiData?.ai_confidence ?? 0,

                resume_match:
                    aiData?.resume_match ?? 0,

                fraud_detection:
                    aiData?.fraud_detection ?? 0,

                interview_prediction:
                    aiData?.interview_prediction ?? 0,

            });

        }

        catch (err) {

            console.error(err);

        }

        finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        refreshDashboard();

    }, []);

    useEffect(() => {

        if (!lastEvent) return;

        refreshDashboard();

    }, [lastEvent]);

    return (

        <DashboardDataContext.Provider
            value={{

                loading,

                stats,

                uploads,

                funnel,

                topCandidates,

                interviews,

                aiInsights,

                refreshDashboard,

            }}
        >

            {children}

        </DashboardDataContext.Provider>

    );

}

export function useDashboardData() {

    return useContext(DashboardDataContext);

}