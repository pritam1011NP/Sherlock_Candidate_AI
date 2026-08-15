import { useEffect, useState } from "react";

import {
    Avatar,
    Box,
    Chip,
    CircularProgress,
    Divider,
    LinearProgress,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import {
    Person,
    Verified,
    Schedule,
    CheckCircle,
} from "@mui/icons-material";

import { getRecentInterviews } from "../../api/dashboardApi";
import { useDashboardSocket } from "../../context/WebSocketContext";

export default function UpcomingInterview() {

    const socket = useDashboardSocket();
    const lastEvent = socket?.lastEvent;

    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true);

    async function loadInterviews() {

        try {

            const data = await getRecentInterviews();

            setInterviews(Array.isArray(data) ? data : []);

        }

        catch (err) {

            console.error("Interview fetch error:", err);

        }

        finally {

            setLoading(false);

        }

    }

    // Initial Load
    useEffect(() => {

        loadInterviews();

    }, []);

    // Refresh when dashboard events arrive
    useEffect(() => {

        if (!lastEvent) return;

        switch (lastEvent.event) {

            case "interview_completed":

            case "candidate_created":

            case "candidate_hired":

                loadInterviews();
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
                    justifyContent: "center",
                }}
            >

                <CircularProgress />

            </Box>

        );

    }

    if (interviews.length === 0) {

        return (

            <Paper
                elevation={0}
                sx={{
                    p: 4,
                    borderRadius: 4,
                    border: "1px solid #E5E7EB",
                }}
            >

                <Typography
                    align="center"
                    color="text.secondary"
                >

                    No Interview Sessions

                </Typography>

            </Paper>

        );

    }

    return (

        <Paper

            elevation={0}

            sx={{

                p: 3,

                borderRadius: 4,

                border: "1px solid #E5E7EB",

            }}

        >

            <Typography

                variant="h6"

                fontWeight={700}

                mb={3}

            >

                Interview Sessions

            </Typography>

            <Stack spacing={3}>

                {interviews.map((item, index) => (

                    <Box key={item.id}>

                        <Stack

                            direction="row"

                            spacing={2}

                            alignItems="center"

                        >

                            <Avatar

                                sx={{

                                    bgcolor: "#2563EB",

                                    width: 46,

                                    height: 46,

                                }}

                            >

                                <Person />

                            </Avatar>

                            <Box flex={1}>

                                <Typography fontWeight={700}>

                                    {item.candidate}

                                </Typography>

                                <Typography

                                    fontSize={13}

                                    color="text.secondary"

                                >

                                    Session #{item.id}

                                </Typography>

                            </Box>

                            <Chip

                                icon={<Verified />}

                                color="success"

                                size="small"

                                label={item.status}

                            />

                        </Stack>

                        <Stack

                            direction="row"

                            justifyContent="space-between"

                            mt={2}

                        >

                            <Typography

                                fontSize={13}

                                color="text.secondary"

                            >

                                Confidence

                            </Typography>

                            <Typography

                                fontWeight={700}

                                color="success.main"

                            >

                                {item.confidence}%

                            </Typography>

                        </Stack>

                        <LinearProgress

                            variant="determinate"

                            value={item.confidence}

                            sx={{

                                mt: 1,

                                height: 8,

                                borderRadius: 5,

                            }}

                        />

                        <Stack

                            direction="row"

                            justifyContent="space-between"

                            mt={2}

                        >

                            <Stack

                                direction="row"

                                spacing={1}

                                alignItems="center"

                            >

                                <Schedule

                                    sx={{

                                        fontSize: 17,

                                        color: "#64748B",

                                    }}

                                />

                                <Typography

                                    fontSize={13}

                                    color="text.secondary"

                                >

                                    {new Date(item.started_at).toLocaleString()}

                                </Typography>

                            </Stack>

                            <Stack

                                direction="row"

                                spacing={1}

                                alignItems="center"

                            >

                                <CheckCircle

                                    sx={{

                                        color: "#16A34A",

                                        fontSize: 18,

                                    }}

                                />

                                <Typography

                                    fontSize={13}

                                    color="success.main"

                                >

                                    Completed

                                </Typography>

                            </Stack>

                        </Stack>

                        {index !== interviews.length - 1 && (

                            <Divider sx={{ mt: 3 }} />

                        )}

                    </Box>

                ))}

            </Stack>

        </Paper>

    );

}