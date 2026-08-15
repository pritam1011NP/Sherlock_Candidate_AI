import { useEffect, useState } from "react";

import {
    Paper,
    Typography,
    
    CircularProgress,
    Box,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    BarChart,
    Bar,
} from "recharts";

import { getReportsDashboard } from "../../api/reportApi";

export default function ReportsCharts() {

    const [loading, setLoading] = useState(true);

    const [data, setData] = useState({
    candidate_growth: [],
    interviews: [],
});

    useEffect(() => {

        loadDashboard();

    }, []);

    async function loadDashboard() {

        try {

            const response =
                await getReportsDashboard();

            setData(response);

        }

        catch (e) {

            console.error(e);

        }

        finally {

            setLoading(false);

        }

    }

    if (loading) {

        return (

            <Paper
                sx={{
                    p: 4,
                    borderRadius: 3,
                    height: 460,
                }}
            >

                <Box
                    display="flex"
                    justifyContent="center"
                    mt={12}
                >

                    <CircularProgress />

                </Box>

            </Paper>

        );

    }

    return (

        <Grid
            container
            spacing={3}
        >

            <Grid
                size={{ xs: 12 }}
            >

                <Paper
                    sx={{
                        p: 3,
                        borderRadius: 3,
                    }}
                >

                    <Typography
                        variant="h6"
                        mb={2}
                        fontWeight={700}
                    >
                        Candidate Growth
                    </Typography>

                    <ResponsiveContainer
                        width="100%"
                        height={300}
                    >

                        <LineChart
                            data={data?.candidate_growth || []}
                        >

                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis dataKey="month" />

                            <YAxis />

                            <Tooltip />

                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke="#2563EB"
                                strokeWidth={3}
                            />

                        </LineChart>

                    </ResponsiveContainer>

                </Paper>

            </Grid>

            <Grid
                size={{ xs: 12 }}
            >

                <Paper
                    sx={{
                        p: 3,
                        borderRadius: 3,
                    }}
                >

                    <Typography
                        variant="h6"
                        mb={2}
                        fontWeight={700}
                    >
                        Interview Success
                    </Typography>

                    <ResponsiveContainer
                        width="100%"
                        height={300}
                    >

                        <BarChart
                            data={data?.interviews || []}
                        >

                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis dataKey="month" />

                            <YAxis />

                            <Tooltip />

                            <Bar
                                dataKey="value"
                                fill="#10B981"
                            />

                        </BarChart>

                    </ResponsiveContainer>

                </Paper>

            </Grid>

        </Grid>

    );

}