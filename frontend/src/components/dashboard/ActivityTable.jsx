import { useEffect, useState } from "react";

import {
    Avatar,
    Box,
    Chip,
    Paper,
    Stack,
    Typography,
    CircularProgress,
} from "@mui/material";

import {
    Description,
    Schedule,
    AutoAwesome,
} from "@mui/icons-material";

import { getRecentUploads } from "../../api/dashboardApi";
import { useDashboardSocket } from "../../context/WebSocketContext";

export default function ActivityTable() {

    const socket = useDashboardSocket();
    const lastEvent = socket?.lastEvent;

    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    async function loadActivities() {

        try {

            const data = await getRecentUploads();

            setActivities(
                Array.isArray(data) ? data : []
            );

        }

        catch (error) {

            console.error("Recent uploads error:", error);

        }

        finally {

            setLoading(false);

        }

    }

    // Initial Load
    useEffect(() => {

        loadActivities();

    }, []);

    // Refresh when resume upload happens
    useEffect(() => {

        if (!lastEvent) return;

        switch (lastEvent.event) {

            case "resume_uploaded":

                loadActivities();

                break;

            default:

                break;

        }

    }, [lastEvent]);

    if (loading) {

        return (

            <Box
                sx={{
                    py: 6,
                    display: "flex",
                    justifyContent: "center"
                }}
            >

                <CircularProgress />

            </Box>

        );

    }

    return (

        <Paper
            elevation={0}
            sx={{
                p: 3,
                borderRadius: 4,
                border: "1px solid #E5E7EB",
                background: "#fff"
            }}
        >

            <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                mb={4}
            >

                <AutoAwesome
                    sx={{
                        color: "#2563EB"
                    }}
                />

                <Typography
                    variant="h6"
                    fontWeight={700}
                >
                    AI Recent Activity
                </Typography>

            </Stack>

            <Box
                sx={{
                    position: "relative",
                    ml: 2
                }}
            >

                {/* Timeline */}

                <Box
                    sx={{
                        position: "absolute",
                        left: 25,
                        top: 20,
                        bottom: 20,
                        width: "3px",
                        background: "#1153d7"
                    }}
                />

                <Stack spacing={1}>

                    {activities.map((item) => (

                        <Box
                            key={item.id}
                            sx={{
                                display: "flex",
                                gap: 2,
                                position: "relative",
                                animation: "fadeIn .4s ease",

                                "@keyframes fadeIn": {

                                    from: {
                                        opacity: 0,
                                        transform: "translateY(10px)"
                                    },

                                    to: {
                                        opacity: 1,
                                        transform: "translateY(0)"
                                    }

                                }

                            }}
                        >

                            <Avatar
                                sx={{
                                    width: 52,
                                    height: 52,
                                    zIndex: 2,
                                    bgcolor: "#EFF6FF",
                                    color: "#2563EB",
                                    border: "5px solid white",
                                    boxShadow: "0 5px 15px rgba(0,0,0,.08)"
                                }}
                            >

                                <Description />

                            </Avatar>

                            <Box
                                sx={{
                                    flex: 1,
                                    p: 2,
                                    borderRadius: 3,
                                    border: "1px solid #4680f4",
                                    transition: ".3s",

                                    "&:hover": {

                                        transform: "translateY(-4px)",
                                        boxShadow: "0 10px 25px rgba(140, 230, 236, 0.92)"

                                    }

                                }}
                            >

                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >

                                    <Stack spacing={0.5}>

                                        <Typography fontWeight={700}>

                                            {item.filename}

                                        </Typography>

                                        <Typography
                                            fontSize={13}
                                            color="text.secondary"
                                        >

                                            AI Resume Processing Completed

                                        </Typography>

                                    </Stack>

                                    <Chip
                                        label="Completed"
                                        size="small"
                                        sx={{
                                            bgcolor: "#DCFCE7",
                                            color: "#15803D",
                                            fontWeight: 700
                                        }}
                                    />

                                </Stack>

                                <Stack
                                    direction="row"
                                    spacing={1}
                                    alignItems="center"
                                    mt={1}
                                >

                                    <Schedule
                                        sx={{
                                            fontSize: 16,
                                            color: "#94A3B8"
                                        }}
                                    />

                                    <Typography
                                        fontSize={12}
                                        color="text.secondary"
                                    >

                                        {new Date(item.created_at).toLocaleString()}

                                    </Typography>

                                </Stack>

                            </Box>

                        </Box>

                    ))}

                </Stack>

            </Box>

        </Paper>

    );

}