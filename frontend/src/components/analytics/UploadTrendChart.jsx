import {
    ResponsiveContainer,
    AreaChart,
    Area,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";

import {
    Paper,
    Typography,
} from "@mui/material";

export default function UploadTrendChart({ data = [] }) {

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
                Candidate Upload Trend
            </Typography>

            <ResponsiveContainer
                width="100%"
                height="90%"
            >

                <AreaChart data={data}>

                    <defs>

                        <linearGradient
                            id="upload"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >

                            <stop
                                offset="5%"
                                stopColor="#1976d2"
                                stopOpacity={0.7}
                            />

                            <stop
                                offset="95%"
                                stopColor="#1976d2"
                                stopOpacity={0}
                            />

                        </linearGradient>

                    </defs>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="month" />

                    <YAxis />

                    <Tooltip />

                    <Area
                        type="monotone"
                        dataKey="uploads"
                        stroke="#1976d2"
                        fillOpacity={1}
                        fill="url(#upload)"
                    />

                </AreaChart>

            </ResponsiveContainer>

        </Paper>

    );

}