import { useEffect, useState } from "react";

import {
    Paper,
    Typography,
    Stack,
    Box,
    Avatar,
    Chip,
    CircularProgress,
} from "@mui/material";

import {
    Description,
    PersonAdd,
    WorkspacePremium,
    EventAvailable,
    Face,
} from "@mui/icons-material";

import { getRecentActivity } from "../../api/dashboardApi";
import { useDashboardSocket } from "../../context/WebSocketContext";

const iconMap = {
    resume_uploaded: <Description />,
    candidate_created: <PersonAdd />,
    candidate_hired: <WorkspacePremium />,
    interview_completed: <EventAvailable />,
    face_matched: <Face />,
};

const colorMap = {
    resume_uploaded: "#7C3AED",
    candidate_created: "#2563EB",
    candidate_hired: "#16A34A",
    interview_completed: "#F97316",
    face_matched: "#EC4899",
};

export default function RecentActivity() {

    const socket = useDashboardSocket();
    const lastEvent = socket?.lastEvent;

    const [loading, setLoading] = useState(true);
    const [activities, setActivities] = useState([]);

    async function loadActivity() {

        try {

            const data = await getRecentActivity();

            setActivities(Array.isArray(data) ? data : []);

        }

        catch (err) {

            console.error(err);

        }

        finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        loadActivity();

    }, []);

    useEffect(() => {

        if (!lastEvent) return;

        loadActivity();

    }, [lastEvent]);

    if (loading) {

        return (

            <Paper
                elevation={0}
                sx={{
                    p:5,
                    borderRadius:4,
                    display:"flex",
                    justifyContent:"center",
                }}
            >
                <CircularProgress/>
            </Paper>

        );

    }

    return (

        <Paper
            elevation={0}
            sx={{
                p:3,
                borderRadius:4,
                border:"1px solid #E5E7EB",
            }}
        >

            <Typography
                variant="h6"
                fontWeight={700}
                mb={3}
            >
                Recent Activity
            </Typography>

            <Stack spacing={2}>

                {activities.map((item) => (
                    <Stack
                        key={item.id}
                        direction="row"
                        spacing={2}
                        alignItems="center"
                        sx={{
                            p:2,
                            borderRadius:6,
                            transition:"0.3s",
                            "&:hover":{
                                bgcolor:"#81add9"
                            }
                        }}
                    >

                    <Box
                        key={item.id}
                        sx={{
                            display:"flex",
                            alignItems:"center",
                            gap:2,
                            p:2,
                            borderRadius:3,
                            border:"2px solid #0b64d0",
                        }}
                    >

                        <Avatar
                            sx={{
                                bgcolor:colorMap[item.event] || "#2563EB",
                            }}
                        >
                            {iconMap[item.event] || <Description />}
                        </Avatar>

                        <Box flex={1}>

                            <Typography fontWeight={600}>
                                {item.title}
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                {item.description}
                            </Typography>

                        </Box>

                        <Chip
                            label={item.time}
                            size="small"
                        />

                    </Box>
                    </Stack>

                ))}

            
            </Stack>

        </Paper>

    );

}