import {
    Paper,
    Typography,
    Box,
    Tooltip,
} from "@mui/material";

export default function AttendanceHeatmap({ attendance = [] }) {

    const counts = {};

    attendance.forEach((item) => {

        if (!item.check_in) return;

        const day = new Date(item.check_in)
            .toISOString()
            .split("T")[0];

        counts[day] = (counts[day] || 0) + 1;

    });

    const today = new Date();

    const days = [];

    for (let i = 34; i >= 0; i--) {

        const d = new Date(today);

        d.setDate(today.getDate() - i);

        const key = d.toISOString().split("T")[0];

        days.push({

            date: key,

            value: counts[key] || 0,

        });

    }

    function getColor(value) {

        if (value === 0) return "#EDE7D6";

        if (value <= 2) return "#E3CD86";

        if (value <= 4) return "#D9B84A";

        if (value <= 7) return "#C9A227";

        return "#8A6A12";

    }

    return (

        // Background/border stripped so this blends into the parchment
        // shell the parent page (Attendance.jsx) already wraps it in.
        // If used standalone elsewhere, restore background:"#fff" and
        // border:"1px solid #E5E7EB".
        <Paper
            elevation={0}
            sx={{
                mt: 0,
                p: 3,
                borderRadius: 4,
                border: "none",
                backgroundColor: "transparent",
            }}
        >

            <Typography
                variant="h6"
                fontWeight={700}
                mb={3}
                sx={{ color: "#1B1B1B" }}
            >
                Attendance Heatmap
            </Typography>

            <Box
                sx={{
                    display:"grid",
                    gridTemplateColumns:"repeat(7, 22px)",
                    gap:1,
                    justifyContent:"center",
                }}
            >

                {days.map((day) => (

                    <Tooltip
                        key={day.date}
                        title={`${day.date} • ${day.value} attendance`}
                    >

                        <Box
                            sx={{
                                width:20,
                                height:20,
                                borderRadius:1,
                                background:getColor(day.value),
                                transition:"0.25s",

                                "&:hover":{

                                    transform:"scale(1.3)",

                                    boxShadow: "0 4px 10px rgba(0,0,0,0.25)",

                                    cursor:"pointer",

                                }

                            }}
                        />

                    </Tooltip>

                ))}

            </Box>

        </Paper>

    );

}