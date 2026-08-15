import { useEffect, useState } from "react";

import {
    Box,
    Typography,
    Paper,
    Button,
    Stack,
} from "@mui/material";

import Grid from "@mui/material/Grid";

import {
    CloudUpload,
    PersonAdd,
    TrendingUp,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import { DashboardProvider } from "../../context/DashboardContext";
import { DashboardDataProvider } from "../../context/DashboardDataContext";
import StatisticsCards from "../../components/dashboard/StatisticsCards";
import DashboardChart from "../../components/dashboard/DashboardChart";
import ActivityTable from "../../components/dashboard/ActivityTable";
import HiringFunnel from "../../components/dashboard/HiringFunnel";
import UpcomingInterview from "../../components/dashboard/UpcomingInterview";
import QuickActions from "../../components/dashboard/QuickActions";
import AIInsights from "../../components/dashboard/AIInsights";
import TopCandidates from "../../components/dashboard/TopCandidates";
import LiveNotification from "../../components/dashboard/LiveNotification";
import ActivityTimeline from "../../components/dashboard/ActivityTimeline";

// Shared visual tokens so every section reads as one system
// instead of a stack of independently-styled cards.
const SECTION_GAP = 5;
const CARD_RADIUS = 3;
const CARD_BORDER = "1px solid rgba(201, 162, 39, 0.3)";

function SectionHeading({ eyebrow, title, action, tone = "dark" }) {

    const eyebrowColor = tone === "light" ? "#D9B84A" : "#8A6A12";
    const titleColor = tone === "light" ? "#F5F1E6" : "#1B1B1B";

    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-end"
            mb={2.5}
            flexWrap="wrap"
            rowGap={1}
        >
            <Box>
                {eyebrow && (
                    <Typography
                        variant="overline"
                        sx={{
                            color: eyebrowColor,
                            letterSpacing: 1.5,
                            fontWeight: 600,
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: 11,
                        }}
                    >
                        {eyebrow}
                    </Typography>
                )}
                <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{ color: titleColor, fontFamily: "'Playfair Display', serif" }}
                >
                    {title}
                </Typography>
            </Box>
            {action}
        </Stack>
    );
}

function DashboardContent() {

    const navigate = useNavigate();

    // Drives the one-time "evidence board" draw-in animation —
    // starts a beat after mount so it reads as a reveal, not a flicker.
    const [boardReady, setBoardReady] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setBoardReady(true), 150);
        return () => clearTimeout(t);
    }, []);

    const bgStyles = (
        <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=JetBrains+Mono:wght@400;500&display=swap');

            @keyframes db-fadeUp {
                from { opacity: 0; transform: translateY(18px); }
                to { opacity: 1; transform: translateY(0); }
            }
            @keyframes db-drawLine {
                to { stroke-dashoffset: 0; }
            }
            @keyframes db-pinPulse {
                0% { opacity: 0; transform: scale(0.4); }
                60% { opacity: 1; transform: scale(1.15); }
                100% { opacity: 0.7; transform: scale(1); }
            }
            @keyframes db-heroGlow {
                0%, 100% { opacity: 0.5; }
                50% { opacity: 0.9; }
            }
            .db-page {
                position: relative;
                min-height: 100%;
                margin: -24px;
                padding: 24px;
                background: radial-gradient(ellipse at 50% 0%, #16203a 0%, #0b0f1a 55%, #080b12 100%);
                overflow: hidden;
            }
            .db-bg-layer {
                position: absolute;
                inset: 0;
                z-index: 0;
                overflow: hidden;
                pointer-events: none;
            }
            .db-bg-grid {
                position: absolute;
                inset: -20%;
                background-image:
                    linear-gradient(rgba(201,162,39,0.06) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(201,162,39,0.06) 1px, transparent 1px);
                background-size: 46px 46px;
                mask-image: radial-gradient(ellipse 75% 60% at 50% 10%, black 0%, transparent 75%);
            }
            .db-content {
                position: relative;
                z-index: 1;
            }
            .db-fade-up {
                animation: db-fadeUp 0.55s cubic-bezier(0.2,0.8,0.2,1) both;
            }
            .db-shell {
                border-radius: 16px;
                background: linear-gradient(180deg, #F7F2E7 0%, #F0E9D8 100%);
                border: 1px solid rgba(201,162,39,0.3);
                box-shadow: 0 20px 40px -18px rgba(0,0,0,0.5);
                position: relative;
                overflow: hidden;
            }
            .db-shell::before {
                content: "";
                position: absolute;
                top: 0;
                left: 5%;
                right: 5%;
                height: 3px;
                background: linear-gradient(90deg, transparent, #C9A227, transparent);
                z-index: 1;
            }
            .db-hero-glow {
                position: absolute;
                inset: 0;
                background: radial-gradient(circle at 15% 20%, rgba(201,162,39,0.35), transparent 55%);
                animation: db-heroGlow 6s ease-in-out infinite;
                pointer-events: none;
            }
            .db-hero-watermark {
                position: absolute;
                right: -30px;
                bottom: -40px;
                opacity: 0.08;
                pointer-events: none;
            }
            @media (prefers-reduced-motion: reduce) {
                .db-fade-up, .db-hero-glow { animation: none !important; }
                .db-board-line, .db-board-pin { animation: none !important; opacity: 0.5 !important; stroke-dashoffset: 0 !important; }
            }
        `}</style>
    );

    // A quiet "evidence board" motif behind the hero — pins connected by
    // string, drawn in once on load. Distinct from the looping sweep/scan
    // animations used on the other pages.
    const evidenceBoard = (
        <svg
            width="520"
            height="260"
            viewBox="0 0 520 260"
            style={{ position: "absolute", top: -10, right: 0, opacity: 0.5 }}
        >
            {[
                ["70,40", "220,90"],
                ["220,90", "150,180"],
                ["220,90", "380,60"],
                ["380,60", "440,150"],
                ["150,180", "300,210"],
                ["380,60", "300,210"],
            ].map(([a, b], i) => {
                const [x1, y1] = a.split(",").map(Number);
                const [x2, y2] = b.split(",").map(Number);
                const len = Math.hypot(x2 - x1, y2 - y1);
                return (
                    <line
                        key={i}
                        className="db-board-line"
                        x1={x1} y1={y1} x2={x2} y2={y2}
                        stroke="#C9A227"
                        strokeWidth="1.2"
                        strokeDasharray={len}
                        strokeDashoffset={boardReady ? 0 : len}
                        style={{
                            transition: `stroke-dashoffset 0.9s ease ${0.15 + i * 0.12}s`,
                        }}
                    />
                );
            })}
            {["70,40", "220,90", "150,180", "380,60", "440,150", "300,210"].map((p, i) => {
                const [x, y] = p.split(",").map(Number);
                return (
                    <circle
                        key={i}
                        className="db-board-pin"
                        cx={x} cy={y} r="4.5"
                        fill="#D9B84A"
                        style={{
                            animation: boardReady
                                ? `db-pinPulse 0.5s ease ${0.1 + i * 0.1}s both`
                                : "none",
                            opacity: boardReady ? 0.7 : 0,
                        }}
                    />
                );
            })}
        </svg>
    );

    return (

        <div className="db-page">

            {bgStyles}

            <div className="db-bg-layer">
                <div className="db-bg-grid" />
            </div>

            <Box className="db-content" sx={{ pb: 6 }}>

                {/* HERO */}

                <Paper
                    elevation={0}
                    className="db-fade-up"
                    sx={{
                        p: { xs: 3, md: 5 },
                        mb: SECTION_GAP,
                        borderRadius: 4,
                        color: "#ffffff",
                        position: "relative",
                        overflow: "hidden",
                        background:
                            "linear-gradient(135deg, #1B2438 0%, #141A2C 55%, #0B0F1A 100%)",
                        border: "1px solid rgba(201,162,39,0.35)",
                        boxShadow: "0 24px 48px -20px rgba(0,0,0,0.6)",
                    }}
                >

                    <div className="db-hero-glow" />

                    <svg className="db-hero-watermark" width="220" height="220" viewBox="0 0 24 24" fill="none">
                        <circle cx="10.5" cy="10.5" r="6.5" stroke="#F5F1E6" strokeWidth="1.4" />
                        <line x1="15.3" y1="15.3" x2="21" y2="21" stroke="#F5F1E6" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>

                    {evidenceBoard}

                    <Grid
                        container
                        spacing={3}
                        alignItems="center"
                        sx={{ position: "relative" }}
                    >

                        <Grid size={{ xs: 12, md: 8 }}>

                            <Typography
                                variant="overline"
                                sx={{
                                    color: "#D9B84A",
                                    letterSpacing: 1.5,
                                    fontWeight: 600,
                                    fontFamily: "'JetBrains Mono', monospace",
                                    fontSize: 11,
                                }}
                            >
                                Sherlock Candidate AI
                            </Typography>

                            <Typography
                                variant="h3"
                                fontWeight={700}
                                sx={{
                                    mt: 0.5,
                                    letterSpacing: -0.5,
                                    fontFamily: "'Playfair Display', serif",
                                    color: "#F5F1E6",
                                }}
                            >
                                Welcome back 👋
                            </Typography>

                            <Typography
                                sx={{
                                    mt: 1.5,
                                    color: "rgba(245,241,230,0.75)",
                                    maxWidth: 520,
                                }}
                            >
                                Here's how your hiring pipeline is moving today.
                            </Typography>

                        </Grid>

                        <Grid size={{ xs: 12, md: 4 }}>

                            <Stack
                                direction={{ xs: "column", sm: "row" }}
                                spacing={1.5}
                                justifyContent={{ xs: "stretch", md: "flex-end" }}
                            >

                                <Button
                                    fullWidth={{ xs: true, sm: false }}
                                    variant="contained"
                                    disableElevation
                                    startIcon={<CloudUpload />}
                                    onClick={() => navigate("/upload")}
                                    sx={{
                                        background: "linear-gradient(180deg, #D9B84A 0%, #B3901F 100%)",
                                        color: "#1B1B1B",
                                        fontWeight: 600,
                                        px: 2.5,
                                        boxShadow: "0 6px 16px rgba(179,144,31,0.35)",
                                        transition: "transform 0.15s ease, filter 0.2s ease",
                                        "&:hover": {
                                            background: "linear-gradient(180deg, #E0C158 0%, #BC9A28 100%)",
                                            transform: "translateY(-1px)",
                                        },
                                    }}
                                >
                                    Upload Resume
                                </Button>

                                <Button
                                    fullWidth={{ xs: true, sm: false }}
                                    variant="outlined"
                                    startIcon={<PersonAdd />}
                                    sx={{
                                        color: "#F5F1E6",
                                        borderColor: "rgba(245,241,230,0.4)",
                                        fontWeight: 600,
                                        px: 2.5,
                                        transition: "border-color 0.2s ease, background 0.2s ease",
                                        "&:hover": {
                                            borderColor: "#D9B84A",
                                            bgcolor: "rgba(201,162,39,0.1)",
                                        },
                                    }}
                                >
                                    Add Candidate
                                </Button>

                            </Stack>

                        </Grid>

                    </Grid>

                </Paper>

                {/* KPI Cards */}

                <Box sx={{ mb: SECTION_GAP }} className="db-fade-up" style={{ animationDelay: "0.05s" }}>
                    <SectionHeading
                        eyebrow="Overview"
                        title="Recruitment Overview"
                        tone="light"
                    />
                    <StatisticsCards />
                </Box>

                {/* Chart */}

                <Paper
                    elevation={0}
                    className="db-shell db-fade-up"
                    style={{ animationDelay: "0.1s" }}
                    sx={{ p: 3, mb: SECTION_GAP }}
                >

                    <SectionHeading
                        eyebrow="This week"
                        title="Weekly Candidate Activity"
                        action={
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: 40,
                                    height: 40,
                                    borderRadius: "50%",
                                    bgcolor: "rgba(201,162,39,0.12)",
                                }}
                            >
                                <TrendingUp sx={{ color: "#B3901F" }} />
                            </Box>
                        }
                    />

                    <DashboardChart />

                </Paper>

                {/* AI Insights */}

                <Box sx={{ mb: SECTION_GAP }} className="db-shell db-fade-up" style={{ animationDelay: "0.15s", padding: 4 }}>
                    <AIInsights />
                </Box>

{/* =========================================================
    TOP CANDIDATES + HIRING FUNNEL + INTERVIEWS
========================================================= */}

<Box
    sx={{
        display: "grid",

        gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(3, minmax(0, 1fr))",
        },

        gap: 3,

        mb: SECTION_GAP,

        width: "100%",

        alignItems: "stretch",
    }}
>
    {/* TOP CANDIDATES */}

    <Box
        className="db-fade-up"
        sx={{
            minWidth: 0,
            width: "100%",
            height: "100%",

            display: "flex",
        }}
        style={{
            animationDelay: "0.2s",
        }}
    >
        <Box
            className="db-shell"
            sx={{
                width: "100%",
                height: "100%",
                minWidth: 0,

                p: 2,

                display: "flex",
                flexDirection: "column",

                boxSizing: "border-box",
            }}
        >
            <TopCandidates />
        </Box>
    </Box>


    {/* HIRING FUNNEL */}

    <Box
        className="db-fade-up"
        sx={{
            minWidth: 0,
            width: "100%",
            height: "100%",

            display: "flex",
        }}
        style={{
            animationDelay: "0.25s",
        }}
    >
        <Box
            className="db-shell"
            sx={{
                width: "100%",
                height: "100%",
                minWidth: 0,

                p: 2,

                display: "flex",
                flexDirection: "column",

                boxSizing: "border-box",
            }}
        >
            <HiringFunnel />
        </Box>
    </Box>


    {/* UPCOMING INTERVIEWS */}

    <Box
        className="db-fade-up"
        sx={{
            minWidth: 0,
            width: "100%",
            height: "100%",

            display: "flex",
        }}
        style={{
            animationDelay: "0.3s",
        }}
    >
        <Box
            className="db-shell"
            sx={{
                width: "100%",
                height: "100%",
                minWidth: 0,

                p: 2,

                display: "flex",
                flexDirection: "column",

                boxSizing: "border-box",
            }}
        >
            <UpcomingInterview />
        </Box>
    </Box>
</Box>

                {/* Activity */}

                <Box sx={{ mb: SECTION_GAP }} className="db-shell db-fade-up" style={{ animationDelay: "0.3s", padding: 4 }}>
                    <ActivityTable />
                </Box>

                {/* Quick Actions */}

<Box
    className="db-shell db-fade-up"
    sx={{
        p: 3,
        mb: SECTION_GAP,
    }}
>
    <QuickActions />
</Box>

                {/* Timeline + Live Notifications */}


<Box
    sx={{
        display: "grid",
        gridTemplateColumns: {
            xs: "1fr",
            lg: "minmax(0, 1fr) minmax(0, 1fr)",
        },
        gap: 3,
        width: "100%",
        mb: SECTION_GAP,
        alignItems: "stretch",
    }}
>

    {/* Activity Timeline */}

    <Box
        className="db-fade-up"
        sx={{
            minWidth: 0,
            width: "100%",
            height: "100%",
        }}
        style={{
            animationDelay: "0.45s",
        }}
    >
        <Box
            className="db-shell"
            sx={{
                p: 3,
                width: "100%",
                height: "100%",
                minWidth: 0,
                boxSizing: "border-box",
            }}
        >
            <ActivityTimeline />
        </Box>
    </Box>


    {/* Live AI Notifications */}

    <Box
        className="db-fade-up"
        sx={{
            minWidth: 0,
            width: "100%",
            height: "100%",
        }}
        style={{
            animationDelay: "0.5s",
        }}
    >
        <Box
            className="db-shell"
            sx={{
                p: 3,
                width: "100%",
                height: "100%",
                minWidth: 0,
                boxSizing: "border-box",
            }}
        >
            <LiveNotification />
        </Box>
    </Box>

</Box>

            </Box>

        </div>

    );

}

export default function Dashboard() {

    return (

        <DashboardProvider>

            <DashboardDataProvider>
                <DashboardContent />
            </DashboardDataProvider>

        </DashboardProvider>

    );

}