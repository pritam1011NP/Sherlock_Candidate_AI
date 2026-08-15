import {
    Paper,
    Typography,
} from "@mui/material";

import {
    ResponsiveContainer,
    RadarChart,
    Radar,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
} from "recharts";

export default function ResumeCharts() {

    const data = [

        {
            subject: "Skills",
            value: 95,
        },

        {
            subject: "Experience",
            value: 88,
        },

        {
            subject: "Education",
            value: 90,
        },

        {
            subject: "Projects",
            value: 92,
        },

        {
            subject: "Communication",
            value: 82,
        },

    ];

    return (

        <Paper
            elevation={3}
            sx={{
                p:3,
                borderRadius:3,
                height:450,
            }}
        >

            <Typography
                variant="h5"
                fontWeight={700}
                mb={2}
            >
                Resume Analytics
            </Typography>

            <ResponsiveContainer
                width="100%"
                height="90%"
            >

                <RadarChart
                    data={data}
                >

                    <PolarGrid />

                    <PolarAngleAxis
                        dataKey="subject"
                    />

                    <PolarRadiusAxis
                        angle={30}
                        domain={[0,100]}
                    />

                    <Radar
                        dataKey="value"
                        stroke="#1976d2"
                        fill="#1976d2"
                        fillOpacity={0.5}
                    />

                </RadarChart>

            </ResponsiveContainer>

        </Paper>

    );

}