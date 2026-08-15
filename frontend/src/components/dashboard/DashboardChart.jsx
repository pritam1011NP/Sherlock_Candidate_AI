import { useEffect, useState } from "react";

import {
    Box,
    Stack,
    Typography,
    Paper,
    Chip,
} from "@mui/material";

import {
    TrendingUp,
    CloudUpload,
    Psychology,
} from "@mui/icons-material";

import {
    ResponsiveContainer,
    AreaChart,
    Area,
    CartesianGrid,
    Tooltip,
    XAxis,
    YAxis,
    Legend,
} from "recharts";

import {
    getDailyUploads,
    getDailyMatches,
} from "../../api/dashboardApi";

export default function DashboardChart() {

    const [chartData, setChartData] = useState([]);

    useEffect(() => {

        loadChart();

        

    }, []);

    async function loadChart() {

        try {

            const uploads = await getDailyUploads();
            const matches = await getDailyMatches();

            const uploadArray = Array.isArray(uploads)
                ? uploads
                : [];

            const matchArray = Array.isArray(matches)
                ? matches
                : [];

            const merged = uploadArray.map((u) => {

                const match = matchArray.find(
                    (m) => m.day === u.day
                );

                return {

                    day: u.day,

                    uploads: u.count,

                    matches: match ? match.count : 0,

                };

            });

            setChartData(merged);

        }

        catch (err) {

            console.log(err);

        }

    }

    const totalUploads =
        chartData.reduce(
            (a, b) => a + b.uploads,
            0
        );

    const totalMatches =
        chartData.reduce(
            (a, b) => a + b.matches,
            0
        );

    return (

        <Paper
            elevation={0}
            sx={{
                p: 3,
                borderRadius: 4,
                border: "1px solid #E5E7EB",
                background:
                    "linear-gradient(180deg,#FFFFFF,#F8FAFC)",
            }}
        >

            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mb={3}
            >

                <Box>

                    <Typography
                        variant="h6"
                        fontWeight={700}
                    >
                        Weekly Candidate Activity
                    </Typography>

                    <Typography
                        color="text.secondary"
                        fontSize={14}
                    >
                        Resume uploads vs AI matches
                    </Typography>

                </Box>

                <TrendingUp
                    sx={{
                        color: "#2563EB",
                        fontSize: 34,
                    }}
                />

            </Stack>

            <Stack
                direction="row"
                spacing={2}
                mb={3}
            >

                <Chip
                    icon={<CloudUpload />}
                    label={`Uploads : ${totalUploads}`}
                    color="primary"
                />

                <Chip
                    icon={<Psychology />}
                    label={`Matches : ${totalMatches}`}
                    color="success"
                />

            </Stack>

            <ResponsiveContainer
                width="100%"
                height={360}
            >

                <AreaChart data={chartData}>

                    <defs>

                        <linearGradient
                            id="uploadGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop
                                offset="5%"
                                stopColor="#2563EB"
                                stopOpacity={0.45}
                            />
                            <stop
                                offset="95%"
                                stopColor="#2563EB"
                                stopOpacity={0}
                            />
                        </linearGradient>

                        <linearGradient
                            id="matchGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop
                                offset="5%"
                                stopColor="#16A34A"
                                stopOpacity={0.45}
                            />
                            <stop
                                offset="95%"
                                stopColor="#16A34A"
                                stopOpacity={0}
                            />
                        </linearGradient>

                    </defs>

                    <CartesianGrid
                        strokeDasharray="4 4"
                        vertical={false}
                    />

                    <XAxis dataKey="day" />

                    <YAxis />

                    <Tooltip
                        contentStyle={{
                            borderRadius: 12,
                            border: "none",
                            boxShadow:
                                "0 8px 20px rgba(0,0,0,.15)",
                        }}
                    />

                    <Legend />

                    <Area
                        type="monotone"
                        dataKey="uploads"
                        stroke="#2563EB"
                        strokeWidth={3}
                        fill="url(#uploadGradient)"
                    />

                    <Area
                        type="monotone"
                        dataKey="matches"
                        stroke="#16A34A"
                        strokeWidth={3}
                        fill="url(#matchGradient)"
                    />

                </AreaChart>

            </ResponsiveContainer>

        </Paper>

    );

}