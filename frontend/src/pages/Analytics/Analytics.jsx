import { useEffect, useRef, useState } from "react";

import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    CircularProgress,
    Alert,
} from "@mui/material";

import PeopleIcon from "@mui/icons-material/People";
import PsychologyIcon from "@mui/icons-material/Psychology";
import VideoCallIcon from "@mui/icons-material/VideoCall";

import { getDashboardAnalytics } from "../../api/analyticsApi";

import CandidateStatusChart from "../../components/analytics/CandidateStatusChart";
import AIScoreTrendChart from "../../components/analytics/AIScoreTrendChart";
import InterviewStatisticsChart from "../../components/analytics/InterviewStatisticsChart";
import UploadTrendChart from "../../components/analytics/UploadTrendChart";
import TopSkillsChart from "../../components/analytics/TopSkillsChart";

// Small self-contained count-up used only for the KPI numbers.
// Doesn't touch any existing component — just feeds a number into Typography.
function AnimatedNumber({ value, suffix = "", duration = 900 }) {

    const [display, setDisplay] = useState(0);
    const frameRef = useRef();

    useEffect(() => {

        const target = Number(value) || 0;
        const start = performance.now();
        const from = 0;

        function tick(now) {

            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);

            setDisplay(from + (target - from) * eased);

            if (progress < 1) {
                frameRef.current = requestAnimationFrame(tick);
            } else {
                setDisplay(target);
            }

        }

        frameRef.current = requestAnimationFrame(tick);

        return () => cancelAnimationFrame(frameRef.current);

    }, [value, duration]);

    const isInt = Number.isInteger(Number(value));

    return (
        <>
            {isInt ? Math.round(display) : display.toFixed(1)}
            {suffix}
        </>
    );
}

export default function Analytics() {

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [data, setData] = useState({

        summary: {

            total_candidates: 0,

            average_ai_score: 0,

            interviews: 0,

        },

        candidate_status: [],

        ai_score_trend: [],

        upload_trend: [],

        interview_statistics: [],

        top_skills: [],

    });

    useEffect(() => {

        loadAnalytics();

    }, []);

    async function loadAnalytics() {

        try {

            setLoading(true);

            setError("");

            const response = await getDashboardAnalytics();

            setData({

                summary: response.summary ?? {

                    total_candidates: 0,

                    average_ai_score: 0,

                    interviews: 0,

                },

                candidate_status:
                    response.candidate_status ?? [],

                ai_score_trend:
                    response.ai_score_trend ?? [],

                upload_trend:
                    response.upload_trend ?? [],

                interview_statistics:
                    response.interview_statistics ?? [],

                top_skills:
                    response.top_skills ?? [],

            });

        }

        catch (err) {

            console.error(err);

            setError("Unable to load analytics.");

        }

        finally {

            setLoading(false);

        }

    }

    const bgStyles = (
        <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=JetBrains+Mono:wght@400;500&display=swap');

            @keyframes az-sweep {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            @keyframes az-drift {
                0%, 100% { transform: translate(0, 0); }
                50% { transform: translate(24px, -18px); }
            }
            @keyframes az-fadeUp {
                from { opacity: 0; transform: translateY(16px); }
                to { opacity: 1; transform: translateY(0); }
            }
            @keyframes az-fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes az-pulseRing {
                0% { box-shadow: 0 0 0 0 rgba(201,162,39,0.35); }
                70% { box-shadow: 0 0 0 10px rgba(201,162,39,0); }
                100% { box-shadow: 0 0 0 0 rgba(201,162,39,0); }
            }
            @keyframes az-spin {
                to { transform: rotate(360deg); }
            }
            .az-page {
                position: relative;
                min-height: 100%;
                margin: -24px;
                padding: 24px;
                background: radial-gradient(ellipse at 50% 0%, #16203a 0%, #0b0f1a 60%, #080b12 100%);
                overflow: hidden;
            }
            .az-bg-layer {
                position: absolute;
                inset: 0;
                z-index: 0;
                overflow: hidden;
                pointer-events: none;
            }
            .az-bg-grid {
                position: absolute;
                inset: -20%;
                background-image:
                    linear-gradient(rgba(201,162,39,0.08) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(201,162,39,0.08) 1px, transparent 1px);
                background-size: 46px 46px;
                mask-image: radial-gradient(ellipse 65% 45% at 30% 0%, black 0%, transparent 70%);
            }
            .az-bg-sweep {
                position: absolute;
                top: -400px;
                left: -300px;
                width: 900px;
                height: 900px;
                background: conic-gradient(from 0deg, rgba(201,162,39,0.14), transparent 20%, transparent 100%);
                animation: az-sweep 22s linear infinite;
            }
            .az-bg-blob {
                position: absolute;
                border-radius: 50%;
                filter: blur(70px);
                opacity: 0.25;
                animation: az-drift 10s ease-in-out infinite;
            }
            .az-blob-1 {
                width: 300px;
                height: 300px;
                top: -60px;
                right: 8%;
                background: radial-gradient(circle, #C9A227 0%, transparent 70%);
            }
            .az-blob-2 {
                width: 260px;
                height: 260px;
                bottom: 10%;
                left: 4%;
                background: radial-gradient(circle, #2D9CDB 0%, transparent 70%);
                animation-duration: 13s;
                animation-delay: 1.5s;
            }
            .az-content {
                position: relative;
                z-index: 1;
            }
            .az-fade-up {
                animation: az-fadeUp 0.55s cubic-bezier(0.2,0.8,0.2,1) both;
            }
            .az-fade-in {
                animation: az-fadeIn 0.4s ease both;
            }
            .az-title {
                font-family: 'Playfair Display', serif;
                color: #F5F1E6;
            }
            .az-eyebrow {
                font-family: 'JetBrains Mono', monospace;
                font-size: 11px;
                letter-spacing: 2px;
                text-transform: uppercase;
                color: #D9B84A;
                margin-bottom: 6px;
            }
            .az-kpi-card {
                transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
                cursor: default;
                position: relative;
                background: linear-gradient(180deg, #F7F2E7 0%, #F0E9D8 100%) !important;
                border: 1px solid rgba(201,162,39,0.3) !important;
                overflow: hidden;
            }
            .az-kpi-card::before {
                content: "";
                position: absolute;
                top: 0;
                left: 8%;
                right: 8%;
                height: 3px;
                background: linear-gradient(90deg, transparent, #C9A227, transparent);
            }
            .az-kpi-card:hover {
                transform: translateY(-4px);
                box-shadow: 0 18px 34px -12px rgba(0,0,0,0.5);
                border-color: rgba(201,162,39,0.55) !important;
            }
            .az-icon-badge {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                width: 56px;
                height: 56px;
                border-radius: 14px;
                animation: az-pulseRing 2.6s ease-out infinite;
            }
            .az-chart-shell {
                border-radius: 16px;
                overflow: hidden;
                background: linear-gradient(180deg, #F7F2E7 0%, #F0E9D8 100%);
                border: 1px solid rgba(201,162,39,0.3);
                box-shadow: 0 20px 40px -18px rgba(0,0,0,0.55);
            }
            .az-loading-spinner {
                width: 42px;
                height: 42px;
                border-radius: 50%;
                border: 3px solid rgba(201,162,39,0.25);
                border-top-color: #C9A227;
                animation: az-spin 0.8s linear infinite;
            }
            @media (prefers-reduced-motion: reduce) {
                .az-bg-sweep, .az-bg-blob, .az-fade-up, .az-fade-in, .az-kpi-card, .az-icon-badge, .az-loading-spinner {
                    animation: none !important;
                }
            }
        `}</style>
    );

    if (loading) {

        return (

            <div className="az-page">

                {bgStyles}

                <div className="az-bg-layer">
                    <div className="az-bg-grid" />
                    <div className="az-bg-sweep" />
                </div>

                <Box
                    className="az-content az-fade-in"
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 2,
                        mt: 10,
                    }}
                >

                    <div className="az-loading-spinner" />

                    <Typography
                        sx={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: 12,
                            letterSpacing: 1.5,
                            textTransform: "uppercase",
                            color: "rgba(245,241,230,0.65)",
                        }}
                    >
                        Gathering the evidence...
                    </Typography>

                </Box>

            </div>

        );

    }

    return (

        <div className="az-page">

            {bgStyles}

            <div className="az-bg-layer">
                <div className="az-bg-grid" />
                <div className="az-bg-sweep" />
                <div className="az-bg-blob az-blob-1" />
                <div className="az-bg-blob az-blob-2" />
            </div>

            <Box className="az-content">

                <div className="az-fade-up">
                    <div className="az-eyebrow">Case Overview</div>
                    <Typography
                        variant="h4"
                        fontWeight={700}
                        mb={4}
                        className="az-title"
                    >
                        Analytics Dashboard
                    </Typography>
                </div>

                {error && (

                    <Alert
                        severity="error"
                        className="az-fade-in"
                        sx={{ mb: 3 }}
                    >
                        {error}
                    </Alert>

                )}

                {/* KPI CARDS */}

                <Grid
                    container
                    spacing={3}
                >

                    <Grid
                        item
                        xs={12}
                        md={4}
                    >

                        <Card
                            elevation={0}
                            className="az-kpi-card az-fade-up"
                            sx={{
                                borderRadius: 4,
                                height: "100%",
                                animationDelay: "0.05s",
                            }}
                        >

                            <CardContent>

                                <span
                                    className="az-icon-badge"
                                    style={{ background: "rgba(25,118,210,0.12)" }}
                                >
                                    <PeopleIcon
                                        color="primary"
                                        sx={{ fontSize: 30 }}
                                    />
                                </span>

                                <Typography
                                    variant="h4"
                                    fontWeight={700}
                                    mt={2}
                                    sx={{ color: "#1B1B1B" }}
                                >

                                    <AnimatedNumber value={data.summary.total_candidates} />

                                </Typography>

                                <Typography
                                    sx={{ color: "rgba(27,27,27,0.6)" }}
                                >
                                    Total Candidates
                                </Typography>

                            </CardContent>

                        </Card>

                    </Grid>

                    <Grid
                        item
                        xs={12}
                        md={4}
                    >

                        <Card
                            elevation={0}
                            className="az-kpi-card az-fade-up"
                            sx={{
                                borderRadius: 4,
                                height: "100%",
                                animationDelay: "0.15s",
                            }}
                        >

                            <CardContent>

                                <span
                                    className="az-icon-badge"
                                    style={{ background: "rgba(46,125,50,0.12)" }}
                                >
                                    <PsychologyIcon
                                        color="success"
                                        sx={{ fontSize: 30 }}
                                    />
                                </span>

                                <Typography
                                    variant="h4"
                                    fontWeight={700}
                                    mt={2}
                                    sx={{ color: "#1B1B1B" }}
                                >

                                    <AnimatedNumber value={data.summary.average_ai_score} suffix="%" />

                                </Typography>

                                <Typography
                                    sx={{ color: "rgba(27,27,27,0.6)" }}
                                >
                                    Average AI Score
                                </Typography>

                            </CardContent>

                        </Card>

                    </Grid>

                    <Grid
                        item
                        xs={12}
                        md={4}
                    >

                        <Card
                            elevation={0}
                            className="az-kpi-card az-fade-up"
                            sx={{
                                borderRadius: 4,
                                height: "100%",
                                animationDelay: "0.25s",
                            }}
                        >

                            <CardContent>

                                <span
                                    className="az-icon-badge"
                                    style={{ background: "rgba(237,108,2,0.12)" }}
                                >
                                    <VideoCallIcon
                                        color="warning"
                                        sx={{ fontSize: 30 }}
                                    />
                                </span>

                                <Typography
                                    variant="h4"
                                    fontWeight={700}
                                    mt={2}
                                    sx={{ color: "#1B1B1B" }}
                                >

                                    <AnimatedNumber value={data.summary.interviews} />

                                </Typography>

                                <Typography
                                    sx={{ color: "rgba(27,27,27,0.6)" }}
                                >
                                    Total Interviews
                                </Typography>

                            </CardContent>

                        </Card>

                    </Grid>

                </Grid>

                {/* FIRST ROW */}

                <Grid
                    container
                    spacing={3}
                    sx={{
                        mt: 2,
                    }}
                >

                    <Grid
                        item
                        xs={12}
                        lg={6}
                        className="az-fade-up"
                        sx={{ animationDelay: "0.3s" }}
                    >

                        <Box className="az-chart-shell">
                            <CandidateStatusChart
                                data={data.candidate_status}
                            />
                        </Box>

                    </Grid>

                    <Grid
                        item
                        xs={12}
                        lg={6}
                        className="az-fade-up"
                        sx={{ animationDelay: "0.35s" }}
                    >

                        <Box className="az-chart-shell">
                            <AIScoreTrendChart
                                data={data.ai_score_trend}
                            />
                        </Box>

                    </Grid>

                </Grid>

                {/* SECOND ROW */}

                <Grid
                    container
                    spacing={3}
                    sx={{
                        mt: 1,
                    }}
                >

                    <Grid
                        item
                        xs={12}
                        className="az-fade-up"
                        sx={{ animationDelay: "0.4s" }}
                    >

                        <Box className="az-chart-shell">
                            <InterviewStatisticsChart
                                data={data.interview_statistics}
                            />
                        </Box>

                    </Grid>

                </Grid>

                <Grid
                    container
                    spacing={3}
                    sx={{
                        mt: 1,
                    }}
                >

                    <Grid
                        item
                        xs={12}
                        className="az-fade-up"
                        sx={{ animationDelay: "0.45s" }}
                    >

                        <Box className="az-chart-shell">
                            <UploadTrendChart
                                data={data.upload_trend}
                            />
                        </Box>

                    </Grid>

                </Grid>

                <Grid
                    container
                    spacing={3}
                    sx={{
                        mt: 1,
                    }}
                >

                    <Grid
                        item
                        xs={12}
                        className="az-fade-up"
                        sx={{ animationDelay: "0.5s" }}
                    >

                        <Box className="az-chart-shell">
                            <TopSkillsChart
                                data={data.top_skills}
                            />
                        </Box>

                    </Grid>

                </Grid>

            </Box>

        </div>

    );

}