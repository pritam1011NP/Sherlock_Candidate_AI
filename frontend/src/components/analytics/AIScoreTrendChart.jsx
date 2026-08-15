import {
    Paper,
    Typography,
} from "@mui/material";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

export default function AIScoreTrendChart({

    data = [],

}) {

    return (

        <Paper
            elevation={0}
            sx={{
                p: 3,
                borderRadius: 4,
                border: "1px solid #E5E7EB",
                height: 420,
            }}
        >

            <Typography
                variant="h6"
                fontWeight={700}
                mb={3}
            >
                AI Score Trend
            </Typography>

            <ResponsiveContainer
                width="100%"
                height="90%"
            >

                <LineChart data={data}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="month" />

                    <YAxis />

                    <Tooltip />

                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#2563EB"
                        strokeWidth={3}
                        dot={{
                            r: 5,
                        }}
                    />

                </LineChart>

            </ResponsiveContainer>

        </Paper>

    );

}