import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

import {
    Paper,
    Typography,
} from "@mui/material";

const COLORS = [

    "#2563EB",
    "#16A34A",
    "#EA580C",
    "#DC2626",
    "#9333EA",

];

export default function CandidateStatusChart({

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
                Candidate Status
            </Typography>

            <ResponsiveContainer
                width="100%"
                height="90%"
            >

                <PieChart>

                    <Pie

                        data={data}

                        dataKey="value"

                        nameKey="name"

                        outerRadius={120}

                        label

                    >

                        {

                            data.map((entry, index) => (

                                <Cell

                                    key={index}

                                    fill={
                                        COLORS[
                                            index %
                                            COLORS.length
                                        ]
                                    }

                                />

                            ))

                        }

                    </Pie>

                    <Tooltip />

                    <Legend />

                </PieChart>

            </ResponsiveContainer>

        </Paper>

    );

}