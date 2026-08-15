import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

import {
    Paper,
    Typography,
} from "@mui/material";

export default function TopSkillsChart({ data = [] }) {

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
                mb={2}
            >
                Top Skills
            </Typography>

            <ResponsiveContainer
                width="100%"
                height="90%"
            >

                <BarChart
                    data={data}
                    layout="vertical"
                    margin={{
                        top: 5,
                        right: 20,
                        left: 20,
                        bottom: 5,
                    }}
                >

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                        type="number"
                    />

                    <YAxis
                        type="category"
                        dataKey="skill"
                        width={120}
                    />

                    <Tooltip />

                    <Bar
                        dataKey="count"
                        fill="#1976d2"
                        radius={[0, 6, 6, 0]}
                    />

                </BarChart>

            </ResponsiveContainer>

        </Paper>

    );

}