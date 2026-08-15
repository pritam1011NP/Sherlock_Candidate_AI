import { useEffect, useState } from "react";

import {
    Paper,
    Typography,
    List,
    ListItem,
    ListItemText,
    Divider,
    Box,
    CircularProgress,
    Chip,
} from "@mui/material";

import NotificationsIcon from "@mui/icons-material/Notifications";

import { getNotifications } from "../../api/dashboardApi";

export default function Notifications() {

    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadNotifications();

        const interval = setInterval(() => {
            loadNotifications();
        }, 10000);

        return () => clearInterval(interval);

    }, []);

    async function loadNotifications() {

        try {

            const data = await getNotifications();

            if (Array.isArray(data)) {

                const sorted = [...data].sort((a, b) => {

                    const first = new Date(b.time || 0);

                    const second = new Date(a.time || 0);

                    return first - second;

                });

                setNotifications(sorted);

            } else {

                setNotifications([]);

            }

        } catch (err) {

            console.error("Notification Error:", err);

            setNotifications([]);

        } finally {

            setLoading(false);

        }

    }

    function formatDate(value) {

        if (!value) return "-";

        return new Date(value).toLocaleString();

    }

    return (

        <Paper
            sx={{
                p: 3,
                borderRadius: 4,
                height: 500,
                overflow: "auto",
            }}
        >

            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
            >

                <Box
                    display="flex"
                    alignItems="center"
                    gap={1}
                >

                    <NotificationsIcon color="primary" />

                    <Typography
                        variant="h6"
                        fontWeight={700}
                    >
                        Live Notifications
                    </Typography>

                </Box>

                <Chip
                    label={`${notifications.length} Items`}
                    color="primary"
                    size="small"
                />

            </Box>

            {loading ? (

                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="350px"
                >

                    <CircularProgress />

                </Box>

            ) : notifications.length === 0 ? (

                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="350px"
                >

                    <Typography color="text.secondary">
                        No notifications available
                    </Typography>

                </Box>

            ) : (

                <List>

                    {notifications.map((item, index) => (

                        <Box key={item.id ?? index}>

                            <ListItem
                                sx={{
                                    alignItems: "flex-start",
                                }}
                            >

                                <ListItemText
                                    primary={
                                        <Typography
                                            fontWeight={600}
                                        >
                                            {item.title || "Notification"}
                                        </Typography>
                                    }
                                    secondary={
                                        <>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                {item.message || "-"}
                                            </Typography>

                                            <Typography
                                                variant="caption"
                                                color="text.secondary"
                                            >
                                                {formatDate(item.time)}
                                            </Typography>
                                        </>
                                    }
                                />

                            </ListItem>

                            {index !== notifications.length - 1 && (
                                <Divider />
                            )}

                        </Box>

                    ))}

                </List>

            )}

        </Paper>

    );

}