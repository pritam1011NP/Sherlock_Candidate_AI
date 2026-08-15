import {
    Paper,
    Typography,
} from "@mui/material";

import {
    Bar
} from "react-chartjs-2";

import {
    Chart,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from "chart.js";

Chart.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
);

export default function AttendanceChart({ attendance }) {

    const days = [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun",
    ];

    const counts = Array(7).fill(0);

    attendance.forEach((item) => {

        const day = new Date(item.check_in).getDay();

        // JS Sunday=0
        const index = day === 0 ? 6 : day - 1;

        counts[index]++;

    });

    const data = {

        labels: days,

        datasets: [

            {

                label: "Attendance",

                data: counts,

                backgroundColor: "#C9A227",

                hoverBackgroundColor: "#B3901F",

                borderRadius: 8,

            },

        ],

    };

    return (

        // Background/border stripped so this blends into the parchment
        // shell the parent page (Attendance.jsx) already wraps it in.
        // If used standalone elsewhere, restore background:"#fff" and
        // border:"1px solid #E5E7EB".
        <Paper
            elevation={0}
            sx={{
                p: 3,
                borderRadius: 4,
                border: "none",
                backgroundColor: "transparent",
            }}
        >

            <Typography
                variant="h6"
                fontWeight={700}
                mb={2}
                sx={{ color: "#1B1B1B" }}
            >
                Weekly Attendance
            </Typography>

            <Bar
                data={data}
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false,
                        },
                        tooltip: {
                            backgroundColor: "#12172B",
                            titleColor: "#F5F1E6",
                            bodyColor: "#F5F1E6",
                            borderColor: "#C9A227",
                            borderWidth: 1,
                        },
                    },
                    scales: {
                        x: {
                            ticks: { color: "rgba(27,27,27,0.65)" },
                            grid: { color: "rgba(201,162,39,0.12)" },
                        },
                        y: {
                            ticks: { color: "rgba(27,27,27,0.65)" },
                            grid: { color: "rgba(201,162,39,0.12)" },
                        },
                    },
                }}
            />

        </Paper>

    );

}