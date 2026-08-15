import { useEffect, useState } from "react";

import {
    Avatar,
    Box,
    Chip,
    CircularProgress,
    Divider,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import {
    WorkspacePremium,
    Verified,
    MilitaryTech,
    Email,
    Work,
} from "@mui/icons-material";

import { getTopCandidates } from "../../api/dashboardApi";
import { useDashboardSocket } from "../../context/WebSocketContext";

const rankColor = [
    "#f7e308b4",
    "#94A3B8",
    "#D97706",
    "#2563EB",
    "#2563EB",
];

export default function TopCandidates() {

    const socket = useDashboardSocket?.();
    const lastEvent = socket?.lastEvent;

    const [loading, setLoading] = useState(true);
    const [candidates, setCandidates] = useState([]);

    async function loadCandidates() {

        try {

            const data = await getTopCandidates();

            setCandidates(
                Array.isArray(data) ? data : []
            );

        }

        catch (err) {

            console.error("Top Candidates Error:", err);

        }

        finally {

            setLoading(false);

        }

    }

    // Initial Load
    useEffect(() => {

        loadCandidates();

    }, []);

    // Refresh on WebSocket Events
    useEffect(() => {

        if (!lastEvent) return;

        switch (lastEvent.event) {

            case "candidate_created":
            case "candidate_hired":
            case "face_matched":
            case "resume_uploaded":
            case "interview_completed":

                loadCandidates();
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
                    p: 6,
                    borderRadius: 4,
                    display: "flex",
                    justifyContent: "center",
                }}
            >

                <CircularProgress />

            </Paper>

        );

    }

    return (

        <Paper
            elevation={0}
            sx={{
                width: "100%",
                height: "100%",
                minWidth: 0,
                p: 3,
                borderRadius: 4,
                border: "1px solid #1241a0",
                background: "#FFFFFF",
                display: "flex",
                flexDirection: "column",
                boxSizing: "border-box",
                overflow: "hidden",
            }}
        >

            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mb={3}
            >

                <Typography
                    variant="h6"
                    fontWeight={700}
                >
                    ⭐ Top AI Candidates
                </Typography>

                <Chip
                    icon={<WorkspacePremium />}
                    label="AI Ranked"
                    color="primary"
                    size="small"
                />

            </Stack>

            {candidates.length === 0 ? (

                <Typography
                    textAlign="center"
                    color="text.secondary"
                    py={6}
                >
                    No candidates available.
                </Typography>

            ) : (

                <Box
    
>

    <Stack spacing={2}>

                    {candidates.map((candidate, index) => (

                        <Box
                            key={candidate.id}
                            sx={{
                                p: 2,
                                borderRadius: 3,
                                overflow: "hidden",
                                border: "1px solid #0d70e8",
                                transition: "all .3s",

                                "&:hover": {
                                    transform: "translateY(-4px)",
                                    boxShadow: "0 12px 25px rgba(226, 121, 121, 0.96)",
                                    background: "#b6c7d8",
                                },
                            }}
                        >

                            <Stack
                                direction="row"
                                spacing={2}
                                alignItems="center"
                            >

                                {/* Rank */}

                                <Box
                                    sx={{
                                        width: 20,
                                        height: 20,
                                        bgcolor: rankColor[index] || "#2563EB",
                                        color: "#fff",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontWeight: 100,
                                    }}
                                >
                                    {index + 1}
                                </Box>

                                {/* Avatar */}

                                <Avatar
                                    sx={{
                                        width: 25,
                                        height: 25,
                                        fontWeight: 30,
                                        background:
                                            "linear-gradient(135deg,#2563EB,#60A5FA)",
                                    }}
                                >
                                    {candidate.name?.charAt(0)?.toUpperCase()}
                                </Avatar>

                                <Box
                                    sx={{
                                        flex: 1,
                                        minWidth: 0,
                                    }}
                                >

                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        alignItems="center"
                                    >

                                        <Typography fontWeight={300}>
                                            {candidate.name}
                                        </Typography>

                                        {candidate.status === "Hired" && (

                                            <Verified
                                                sx={{
                                                    color: "#16A34A",
                                                    fontSize: 18,
                                                }}
                                            />

                                        )}

                                        {index === 0 && (

                                            <MilitaryTech
                                                sx={{
                                                    color: "#EAB308",
                                                    fontSize: 15,
                                                }}
                                            />

                                        )}

                                    </Stack>

                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        alignItems="center"
                                        mt={0.5}
                                        sx={{
                                            minWidth: 0,
                                        }}
                                    >

                                        <Work
                                            sx={{
                                                fontSize: 15,
                                                color: "#bc31db",
                                            }}
                                        />

                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {candidate.position || "Software Engineer"}
                                        </Typography>

                                    </Stack>

                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        alignItems="center"
                                        mt={0.5}
                                    >

                                        <Email
                                            sx={{
                                                fontSize: 15,
                                                color: "#ed411b",
                                            }}
                                        />

                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                            noWrap
                                            sx={{
                                                display: "block",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap",
                                                width: "100%"
                                            }}
                                        >
                                            {candidate.email}
                                        </Typography>

                                    </Stack>

                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        mt={1}
                                        flexWrap="wrap"
                                    >

                                        {(candidate.skills || []).map((skill) => (

                                            <Chip
                                                key={skill}
                                                label={skill}
                                                size="small"
                                                sx={{
                                                    bgcolor: "#EEF4FF",
                                                    color: "#2563EB",
                                                }}
                                            />

                                        ))}

                                    </Stack>

                                </Box>

                                {/* Score */}

                                

                            </Stack>

                            {index !== candidates.length - 1 && (
                                <Divider sx={{ mt: 2 }} />
                            )}

                        </Box>

                    ))}

                </Stack>
                </Box>

            )}

        </Paper>

    );

}