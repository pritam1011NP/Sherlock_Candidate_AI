import {
    Paper,
    Typography,
} from "@mui/material";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";

export default function InterviewStatisticsChart({

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
                Interview Statistics
            </Typography>

            <ResponsiveContainer
                width="100%"
                height="90%"
            >

                <BarChart
                    data={data}
                >

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="status" />

                    <YAxis />

                    <Tooltip />

                    <Bar
                        dataKey="count"
                        fill="#2563EB"
                        radius={[6, 6, 0, 0]}
                    />

                </BarChart>

            </ResponsiveContainer>

        </Paper>

    );

}