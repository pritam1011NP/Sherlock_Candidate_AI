import { useEffect, useState } from "react";

import Grid from "@mui/material/Grid";

import {
    People,
    Description,
    EventAvailable,
    WorkspacePremium,
} from "@mui/icons-material";

import DashboardCard from "./DashboardCard";

import { getDashboardStats } from "../../api/dashboardApi";
import { useDashboardSocket } from "../../context/WebSocketContext";

export default function StatisticsCards() {

    // Safe access to websocket context
    const socket = useDashboardSocket?.();
    const lastEvent = socket?.lastEvent;

    const [stats, setStats] = useState({
        participants: 0,
        uploads: 0,
        interviews: 0,
        selected: 0,
    });

    const [loading, setLoading] = useState(true);

    async function loadStats() {

        try {

            const data = await getDashboardStats();

            setStats({

                participants: data?.participants ?? 0,

                uploads: data?.uploads ?? 0,

                interviews: data?.interviews ?? 0,

                selected: data?.selected ?? 0,

            });

        }

        catch (error) {

            console.error("Dashboard stats error:", error);

        }

        finally {

            setLoading(false);

        }

    }

    // Initial Load
    useEffect(() => {

        loadStats();

    }, []);

    // Refresh when websocket sends an event
    useEffect(() => {

        if (!lastEvent) return;

        switch (lastEvent.event) {

            case "candidate_created":
            case "candidate_hired":
            case "resume_uploaded":
            case "interview_created":
            case "interview_completed":
            case "face_matched":

                loadStats();
                break;

            default:
                break;

        }

    }, [lastEvent]);

    const cards = [

        {
            title: "Participants",
            value: stats.participants,
            subtitle: "Registered Candidates",
            icon: <People />,
            color: "#2563EB",
        },

        {
            title: "Uploads",
            value: stats.uploads,
            subtitle: "Uploaded Resumes",
            icon: <Description />,
            color: "#7C3AED",
        },

        {
            title: "Interviews",
            value: stats.interviews,
            subtitle: "Interview Sessions",
            icon: <EventAvailable />,
            color: "#F97316",
        },

        {
            title: "Selected",
            value: stats.selected,
            subtitle: "Candidates Hired",
            icon: <WorkspacePremium />,
            color: "#16A34A",
        },

    ];

    return (

        // width:"100%" forced explicitly here as a defensive fix — the
        // cards were shrinking to their own content width instead of
        // stretching across the row, leaving blank space on the right.
        <Grid 
            container 
            spacing={3}
        >

            {cards.map((card) => (

                <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={3}
                    key={card.title}
                    sx={{
                        display: "flex",
                    }}
                >

                    <DashboardCard
                        title={card.title}
                        value={loading ? "..." : card.value}
                        subtitle={card.subtitle}
                        color={card.color}
                        icon={card.icon}
                    />

                </Grid>

            ))}

        </Grid>

    );

}