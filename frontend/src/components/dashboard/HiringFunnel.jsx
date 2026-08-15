import { useEffect, useState } from "react";

import {
    Paper,
    Typography,
    Box,
    Stack,
    LinearProgress,
    Chip,
    Divider,
    CircularProgress,
} from "@mui/material";

import {
    Person,
    Description,
    Psychology,
    CheckCircle,
    Event,
    WorkspacePremium,
    TrendingDown,
} from "@mui/icons-material";

import { getHiringFunnel } from "../../api/dashboardApi";
import { useDashboardSocket } from "../../context/WebSocketContext";

const stageConfig = {
    Candidates: {
        icon: <Person />,
        color: "#2563EB",
    },
    "Resume Uploaded": {
        icon: <Description />,
        color: "#7C3AED",
    },
    "AI Analyzed": {
        icon: <Psychology />,
        color: "#F97316",
    },
    Shortlisted: {
        icon: <CheckCircle />,
        color: "#16A34A",
    },
    Interview: {
        icon: <Event />,
        color: "#0EA5E9",
    },
    Hired: {
        icon: <WorkspacePremium />,
        color: "#EAB308",
    },
};

export default function HiringFunnel() {

    const socket = useDashboardSocket?.();
    const lastEvent = socket?.lastEvent;

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    async function load() {

        try {

            const res = await getHiringFunnel();

            setData(Array.isArray(res) ? res : []);

        }

        catch (err) {

            console.error("Hiring Funnel Error:", err);

        }

        finally {

            setLoading(false);

        }

    }

    // Initial load
    useEffect(() => {

        load();

    }, []);

    // Refresh when websocket event arrives
    useEffect(() => {

        if (!lastEvent) return;

        switch (lastEvent.event) {

            case "resume_uploaded":
            case "candidate_created":
            case "candidate_hired":
            case "interview_created":
            case "interview_completed":
            case "face_matched":

                load();
                break;

            default:
                break;

        }

    }, [lastEvent]);

    if (loading) {

        return (

            <Paper
                elevation={0}
                sx={{
                    p: 5,
                    borderRadius: 4,
                    display: "flex",
                    justifyContent: "center",
                }}
            >

                <CircularProgress />

            </Paper>

        );

    }

    const maxValue =
        data.length > 0
            ? Math.max(...data.map((d) => d.value), 1)
            : 1;

    return (

        <Paper
            elevation={0}
            sx={{
                p: 3,
                borderRadius: 1 ,
                border: "1px solid #0a4ed6",
                height: "100%",
            }}
        >

            <Typography
                variant="h6"
                fontWeight={700}
                mb={3}
            >
                Recruitment Pipeline
            </Typography>

            <Stack spacing={3}>

                {data.map((item, index) => {

                    const percent = Math.round(
                        (item.value / maxValue) * 100
                    );

                    const previous =
                        index === 0
                            ? item.value
                            : data[index - 1].value;

                    const conversion =
                        previous > 0
                            ? Math.round((item.value * 100) / previous)
                            : 100;

                    const cfg = stageConfig[item.stage] || {
                        icon: <Person />,
                        color: "#2563EB",
                    };

                    return (

                        <Box key={item.stage}>

                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                            >

                                <Stack
                                    direction="row"
                                    spacing={2}
                                    alignItems="center"
                                >

                                    <Box
                                        sx={{
                                            width: 46,
                                            height: 46,
                                            borderRadius: "50%",
                                            bgcolor: `${cfg.color}15`,
                                            color: cfg.color,
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        {cfg.icon}
                                    </Box>

                                    <Box>

                                        <Typography fontWeight={700}>
                                            {item.stage}
                                        </Typography>

                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            {conversion}% conversion
                                        </Typography>

                                    </Box>

                                </Stack>

                                <Chip
                                    label={item.value}
                                    sx={{
                                        bgcolor: cfg.color,
                                        color: "#fff",
                                        fontWeight: 700,
                                    }}
                                />

                            </Stack>

                            <LinearProgress
                                variant="determinate"
                                value={percent}
                                sx={{
                                    mt: 2,
                                    height: 12,
                                    borderRadius: 10,
                                    bgcolor: "#EEF2F7",

                                    "& .MuiLinearProgress-bar": {
                                        borderRadius: 10,
                                        background: cfg.color,
                                        transition: "all .8s",
                                    },
                                }}
                            />

                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                mt={1}
                            >

                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    {percent}% of pipeline
                                </Typography>

                                {index > 0 && (

                                    <Stack
                                        direction="row"
                                        spacing={0.5}
                                        alignItems="center"
                                    >

                                        <TrendingDown
                                            sx={{
                                                fontSize: 15,
                                                color: "#94A3B8",
                                            }}
                                        />

                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            {100 - conversion}% drop
                                        </Typography>

                                    </Stack>

                                )}

                            </Stack>

                            {index !== data.length - 1 && (
                                <Divider sx={{ mt: 3 }} />
                            )}

                        </Box>

                    );

                })}

            </Stack>

        </Paper>

    );

}