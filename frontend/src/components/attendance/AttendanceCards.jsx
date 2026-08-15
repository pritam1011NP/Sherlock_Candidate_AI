import { useEffect, useState } from "react";

import Grid from "@mui/material/Grid";

import {
    Card,
    CardContent,
    Typography,
} from "@mui/material";

import {
    People,
    AccessTime,
    Verified,
    TrendingUp,
} from "@mui/icons-material";

import { getAttendanceStats } from "../../api/attendanceApi";
import { useDashboardSocket } from "../../context/WebSocketContext";

export default function AttendanceCards() {

    const socket = useDashboardSocket();
    const lastEvent = socket?.lastEvent;

    const [stats, setStats] = useState({

        present: 0,

        late: 0,

        verified: 0,

        attendance_rate: 0,

    });

    async function load() {

        try {

            const data = await getAttendanceStats();

            setStats({

                present: data?.present ?? 0,
                late: data?.late ?? 0,
                verified: data?.verified ?? 0,
                attendance_rate: data?.attendance_rate ?? 0,

            });

        }

        catch (err) {

            console.error("Attendance Stats Error:", err);

        }

    }

    // Initial Load
    useEffect(() => {

        load();

    }, []);

    // Live Updates
    useEffect(() => {

        if (!lastEvent) return;

        switch (lastEvent.event) {

            case "attendance_marked":

                load();
                break;

            default:
                break;

        }

    }, [lastEvent]);

    const cards = [

        {

            title: "Present",

            value: stats.present,

            icon: <People fontSize="large" />,

            color: "#2563EB",

        },

        {

            title: "Late",

            value: stats.late,

            icon: <AccessTime fontSize="large" />,

            color: "#EA580C",

        },

        {

            title: "Verified",

            value: stats.verified,

            icon: <Verified fontSize="large" />,

            color: "#16A34A",

        },

        {

            title: "Attendance",

            value: `${stats.attendance_rate}%`,

            icon: <TrendingUp fontSize="large" />,

            color: "#7C3AED",

        },

    ];

    return (

        <>
            <style>{`
                @keyframes ac-fadeUp {
                    from { opacity: 0; transform: translateY(14px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes ac-pulseRing {
                    0% { box-shadow: 0 0 0 0 rgba(201,162,39,0.35); }
                    70% { box-shadow: 0 0 0 10px rgba(201,162,39,0); }
                    100% { box-shadow: 0 0 0 0 rgba(201,162,39,0); }
                }
                .ac-card {
                    animation: ac-fadeUp 0.5s cubic-bezier(0.2,0.8,0.2,1) both;
                }
                .ac-icon-badge {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 52px;
                    height: 52px;
                    border-radius: 14px;
                    animation: ac-pulseRing 2.6s ease-out infinite;
                }
                @media (prefers-reduced-motion: reduce) {
                    .ac-card, .ac-icon-badge { animation: none !important; }
                }
            `}</style>

            <Grid container spacing={3}>

                {cards.map((card, i) => (

                    <Grid
                        key={card.title}
                        size={{ xs: 12, md: 3 }}
                    >

                        <Card
                            elevation={0}
                            className="ac-card"
                            sx={{
                                borderRadius: 4,
                                border: "1px solid rgba(201,162,39,0.3)",
                                background: "linear-gradient(180deg, #F7F2E7 0%, #F0E9D8 100%)",
                                position: "relative",
                                overflow: "hidden",
                                transition: "transform 0.25s ease, box-shadow 0.25s ease",
                                animationDelay: `${i * 0.08}s`,

                                "&::before": {
                                    content: '""',
                                    position: "absolute",
                                    top: 0,
                                    left: "10%",
                                    right: "10%",
                                    height: 3,
                                    background: "linear-gradient(90deg, transparent, #C9A227, transparent)",
                                },

                                "&:hover": {
                                    transform: "translateY(-4px)",
                                    boxShadow: "0 18px 32px -14px rgba(0,0,0,0.45)",
                                    borderColor: "rgba(201,162,39,0.55)",
                                },
                            }}
                        >

                            <CardContent>

                                <span
                                    className="ac-icon-badge"
                                    style={{ background: `${card.color}1F` }}
                                >
                                    <span style={{ color: card.color, display: "flex" }}>
                                        {card.icon}
                                    </span>
                                </span>

                                <Typography
                                    sx={{ color: "rgba(27,27,27,0.6)", mt: 2 }}
                                >

                                    {card.title}

                                </Typography>

                                <Typography
                                    variant="h4"
                                    fontWeight={700}
                                    mt={0.5}
                                    sx={{ color: "#1B1B1B" }}
                                >

                                    {card.value}

                                </Typography>

                            </CardContent>

                        </Card>

                    </Grid>

                ))}

            </Grid>
        </>

    );

}