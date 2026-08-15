import { useEffect, useState } from "react";

import {
    Box,
    Chip,
    CircularProgress,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import {
    Psychology,
    Verified,
    Shield,
    EmojiEvents,
    TrendingUp,
} from "@mui/icons-material";

import { getAIInsights } from "../../api/dashboardApi";
import { useDashboardSocket } from "../../context/WebSocketContext";


export default function AIInsights() {

    const socket = useDashboardSocket();
    const lastEvent = socket?.lastEvent;

    const [loading, setLoading] = useState(true);

    const [insights, setInsights] = useState({
        ai_confidence: 0,
        resume_match: 0,
        fraud_detection: 0,
        interview_prediction: 0,
    });


    /* =========================================================
       LOAD AI INSIGHTS
    ========================================================= */

    async function loadInsights() {

        try {

            const data = await getAIInsights();

            setInsights({

                ai_confidence:
                    data?.ai_confidence ?? 0,

                resume_match:
                    data?.resume_match ?? 0,

                fraud_detection:
                    data?.fraud_detection ?? 0,

                interview_prediction:
                    data?.interview_prediction ?? 0,

            });

        }

        catch (err) {

            console.error(
                "AI Insights Error:",
                err
            );

        }

        finally {

            setLoading(false);

        }

    }


    /* =========================================================
       INITIAL LOAD
    ========================================================= */

    useEffect(() => {

        loadInsights();

    }, []);


    /* =========================================================
       REALTIME REFRESH
    ========================================================= */

    useEffect(() => {

        if (!lastEvent) return;

        switch (lastEvent.event) {

            case "resume_uploaded":

            case "candidate_created":

            case "candidate_hired":

            case "interview_completed":

            case "face_matched":

                loadInsights();

                break;

            default:

                break;

        }

    }, [lastEvent]);


    /* =========================================================
       CARD DATA
    ========================================================= */

    const cards = [

        {
            title: "AI Confidence",
            value: insights.ai_confidence,
            icon: <Psychology />,
            color: "#2563EB",
            gradient:
                "linear-gradient(135deg,#2563EB,#60A5FA)",
            trend: "+2.4%",
            subtitle: "Prediction Accuracy",
        },

        {
            title: "Resume Match",
            value: insights.resume_match,
            icon: <Verified />,
            color: "#16A34A",
            gradient:
                "linear-gradient(135deg,#16A34A,#4ADE80)",
            trend: "+5.2%",
            subtitle: "Average Matching",
        },

        {
            title: "Fraud Detection",
            value: insights.fraud_detection,
            icon: <Shield />,
            color: "#EA580C",
            gradient:
                "linear-gradient(135deg,#EA580C,#FB923C)",
            trend: "+1.6%",
            subtitle: "Verification Success",
        },

        {
            title: "Interview Prediction",
            value: insights.interview_prediction,
            icon: <EmojiEvents />,
            color: "#7C3AED",
            gradient:
                "linear-gradient(135deg,#7C3AED,#A855F7)",
            trend: "+3.8%",
            subtitle: "Hiring Probability",
        },

    ];


    /* =========================================================
       LOADING STATE
    ========================================================= */

    if (loading) {

        return (

            <Paper
                elevation={0}
                sx={{
                    mt: 4,
                    p: 6,

                    borderRadius: 4,

                    display: "flex",

                    justifyContent: "center",

                    alignItems: "center",
                }}
            >

                <CircularProgress />

            </Paper>

        );

    }


    /* =========================================================
       MAIN
    ========================================================= */

    return (

        <Paper
            elevation={0}
            sx={{
                mt: 4,

                p: {
                    xs: 2,
                    sm: 2.5,
                    md: 3,
                },

                borderRadius: 4,

                border:
                    "1px solid #E5E7EB",

                background: "#FFFFFF",

                width: "100%",

                boxSizing: "border-box",

                overflow: "hidden",
            }}
        >

            {/* =================================================
                HEADER
            ================================================= */}

            <Stack
                direction={{
                    xs: "column",
                    sm: "row",
                }}
                justifyContent="space-between"
                alignItems={{
                    xs: "flex-start",
                    sm: "center",
                }}
                spacing={1.5}
                mb={3}
            >

                <Box>

                    <Typography
                        variant="h6"
                        fontWeight={700}
                        sx={{
                            color: "#111827",
                        }}
                    >
                        AI Candidate Intelligence
                    </Typography>

                </Box>


                <Chip
                    icon={<TrendingUp />}
                    label="Live AI Engine"
                    color="primary"
                    sx={{
                        fontWeight: 600,
                    }}
                />

            </Stack>


            {/* =================================================
                CARDS GRID

                4 equal columns on desktop
                2 columns on tablet
                1 column on mobile
            ================================================= */}

            <Box
                sx={{
                    display: "grid",

                    gridTemplateColumns: {
                        xs: "1fr",
                        sm: "repeat(2, minmax(0, 1fr))",
                        lg: "repeat(4, minmax(0, 1fr))",
                    },

                    gap: {
                        xs: 2,
                        sm: 2,
                        md: 2.5,
                    },

                    width: "100%",

                    alignItems: "stretch",
                }}
            >

                {cards.map((card) => {

                    const safeValue =
                        Math.max(
                            0,
                            Math.min(
                                Number(card.value) || 0,
                                100
                            )
                        );


                    return (

                        <Box
                            key={card.title}
                            sx={{
                                minWidth: 0,

                                width: "100%",

                                height: "100%",

                                display: "flex",
                            }}
                        >

                            {/* =================================================
                                AI CARD
                            ================================================= */}

                            <Box
                                sx={{
                                    width: "100%",

                                    minWidth: 0,

                                    height: "100%",

                                    minHeight: {
                                        xs: 330,
                                        sm: 340,
                                        lg: 350,
                                    },

                                    p: {
                                        xs: 2,
                                        sm: 2.25,
                                        md: 2.5,
                                    },

                                    borderRadius: 4,

                                    border:
                                        "1px solid #E5E7EB",

                                    background:
                                        "linear-gradient(180deg,#FFFFFF 0%,#F8FAFC 100%)",

                                    display: "flex",

                                    flexDirection: "column",

                                    boxSizing: "border-box",

                                    overflow: "hidden",

                                    transition:
                                        "transform .3s ease, box-shadow .3s ease, border-color .3s ease",

                                    "&:hover": {

                                        transform:
                                            "translateY(-5px)",

                                        borderColor:
                                            card.color,

                                        boxShadow:
                                            `0 18px 35px ${card.color}20`,
                                    },
                                }}
                            >

                                {/* =================================================
                                    TOP
                                ================================================= */}

                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    spacing={1}
                                >

                                    <Box
                                        sx={{
                                            minWidth: 0,
                                            flex: 1,
                                        }}
                                    >

                                        <Typography
                                            fontSize={13}
                                            color="text.secondary"
                                            noWrap
                                        >
                                            {card.title}
                                        </Typography>


                                        <Typography
                                            sx={{
                                                fontSize: {
                                                    xs: 34,
                                                    sm: 36,
                                                    lg: 38,
                                                },

                                                lineHeight: 1.05,

                                                fontWeight: 700,

                                                mt: 0.5,

                                                color: "#202124",

                                                whiteSpace:
                                                    "nowrap",
                                            }}
                                        >
                                            {safeValue}%
                                        </Typography>

                                    </Box>


                                    {/* ICON */}

                                    <Box
                                        sx={{
                                            width: {
                                                xs: 52,
                                                sm: 56,
                                                lg: 58,
                                            },

                                            height: {
                                                xs: 52,
                                                sm: 56,
                                                lg: 58,
                                            },

                                            flexShrink: 0,

                                            borderRadius: "50%",

                                            background:
                                                card.gradient,

                                            display: "flex",

                                            alignItems: "center",

                                            justifyContent:
                                                "center",

                                            color: "#FFFFFF",

                                            boxShadow:
                                                `0 10px 20px ${card.color}35`,
                                        }}
                                    >

                                        {card.icon}

                                    </Box>

                                </Stack>


                                {/* =================================================
                                    CIRCULAR SCORE
                                ================================================= */}

                                <Box
                                    sx={{
                                        display: "flex",

                                        justifyContent:
                                            "center",

                                        alignItems:
                                            "center",

                                        flex: 1,

                                        minHeight: 150,

                                        py: 2,
                                    }}
                                >

                                    <Box
                                        sx={{
                                            width: {
                                                xs: 105,
                                                sm: 112,
                                                lg: 116,
                                            },

                                            height: {
                                                xs: 105,
                                                sm: 112,
                                                lg: 116,
                                            },

                                            borderRadius: "50%",

                                            background:
                                                `conic-gradient(
                                                    ${card.color}
                                                    ${safeValue * 3.6}deg,
                                                    #E5E7EB 0deg
                                                )`,

                                            display: "flex",

                                            alignItems:
                                                "center",

                                            justifyContent:
                                                "center",

                                            position:
                                                "relative",
                                        }}
                                    >

                                        <Box
                                            sx={{
                                                width: {
                                                    xs: 78,
                                                    sm: 84,
                                                    lg: 88,
                                                },

                                                height: {
                                                    xs: 78,
                                                    sm: 84,
                                                    lg: 88,
                                                },

                                                borderRadius:
                                                    "50%",

                                                bgcolor:
                                                    "#FFFFFF",

                                                display:
                                                    "flex",

                                                alignItems:
                                                    "center",

                                                justifyContent:
                                                    "center",

                                                flexDirection:
                                                    "column",

                                                boxShadow:
                                                    "inset 0 0 0 1px #F1F5F9",
                                            }}
                                        >

                                            <Typography
                                                sx={{
                                                    fontSize: 22,
                                                    fontWeight: 700,
                                                    lineHeight: 1,
                                                }}
                                            >
                                                {safeValue}
                                            </Typography>

                                            <Typography
                                                fontSize={10}
                                                color="text.secondary"
                                                mt={0.4}
                                            >
                                                AI Score
                                            </Typography>

                                        </Box>

                                    </Box>

                                </Box>


                                {/* =================================================
                                    METRIC FOOTER
                                ================================================= */}

                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    spacing={1}
                                    sx={{
                                        minWidth: 0,
                                    }}
                                >

                                    <Typography
                                        fontSize={11}
                                        color="text.secondary"
                                        noWrap
                                        sx={{
                                            minWidth: 0,
                                            overflow: "hidden",
                                            textOverflow:
                                                "ellipsis",
                                        }}
                                    >
                                        {card.subtitle}
                                    </Typography>


                                    <Chip
                                        label={card.trend}
                                        size="small"
                                        sx={{
                                            flexShrink: 0,

                                            height: 24,

                                            bgcolor:
                                                "#DCFCE7",

                                            color:
                                                "#15803D",

                                            fontWeight: 700,

                                            fontSize: 11,
                                        }}
                                    />

                                </Stack>


                                {/* =================================================
                                    LIVE STATUS
                                ================================================= */}

                                <Stack
                                    direction="row"
                                    spacing={1}
                                    alignItems="center"
                                    mt={1.5}
                                >

                                    <Box
                                        sx={{
                                            width: 9,
                                            height: 9,

                                            flexShrink: 0,

                                            borderRadius:
                                                "50%",

                                            bgcolor:
                                                "#22C55E",

                                            animation:
                                                "aiPulse 1.8s infinite",

                                            "@keyframes aiPulse":
                                                {

                                                    "0%": {
                                                        transform:
                                                            "scale(1)",
                                                        opacity: 1,
                                                    },

                                                    "50%": {
                                                        transform:
                                                            "scale(1.5)",
                                                        opacity: 0.5,
                                                    },

                                                    "100%": {
                                                        transform:
                                                            "scale(1)",
                                                        opacity: 1,
                                                    },

                                                },
                                        }}
                                    />

                                    <Typography
                                        fontSize={11}
                                        color="text.secondary"
                                        noWrap
                                    >
                                        Live AI Analysis
                                    </Typography>

                                </Stack>

                            </Box>

                        </Box>

                    );

                })}

            </Box>

        </Paper>

    );

}