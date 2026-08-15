import { useEffect, useState } from "react";

import {
    Paper,
    Typography,
    Stack,
    Avatar,
    Box,
    Chip,
} from "@mui/material";

import {
    NotificationsActive,
    Psychology,
    PersonAdd,
    Verified,
    Event,
} from "@mui/icons-material";

const initialNotifications = [
    {
        id:1,
        icon:<PersonAdd />,
        color:"#2563EB",
        title:"New candidate uploaded",
        subtitle:"Rahul Sharma uploaded resume",
        time:"Just now"
    },
    {
        id:2,
        icon:<Psychology />,
        color:"#7C3AED",
        title:"AI Resume Analysis",
        subtitle:"Resume parsing completed",
        time:"2 min ago"
    },
    {
        id:3,
        icon:<Verified />,
        color:"#16A34A",
        title:"Identity Verified",
        subtitle:"Face verification successful",
        time:"8 min ago"
    },
    {
        id:4,
        icon:<Event />,
        color:"#EA580C",
        title:"Interview Scheduled",
        subtitle:"Technical interview created",
        time:"15 min ago"
    }
];

export default function LiveNotification(){

    const [notifications,setNotifications]=useState(initialNotifications);

    useEffect(()=>{

        

    },[]);

    return(

        <Paper
            elevation={0}
            sx={{
                p:3,
                borderRadius:4,
                border:"1px solid #E5E7EB",
                height:"100%"
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
                    Live AI Notifications
                </Typography>

                <Chip
                    icon={<NotificationsActive />}
                    label="LIVE"
                    color="error"
                    size="small"
                />

            </Stack>

            <Stack spacing={2}>

                {notifications.map((item)=>(

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

                        <Avatar
                            sx={{
                                bgcolor:item.color,
                                width:42,
                                height:42
                            }}
                        >
                            {item.icon}
                        </Avatar>

                        <Box flex={5}>

                            <Typography fontWeight={600}>
                                {item.title}
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                {item.subtitle}
                            </Typography>

                        </Box>

                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            {item.time}
                        </Typography>

                    </Stack>

                ))}

            </Stack>

        </Paper>

    );

}