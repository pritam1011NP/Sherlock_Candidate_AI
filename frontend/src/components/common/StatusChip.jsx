import { Chip } from "@mui/material";

export default function StatusChip({ status }) {

    const colors = {

        Pending: {
            bg: "#FEF3C7",
            color: "#B45309",
        },

        Shortlisted: {
            bg: "#DCFCE7",
            color: "#15803D",
        },

        "Interview Scheduled": {
            bg: "#DBEAFE",
            color: "#1D4ED8",
        },

        Hold: {
            bg: "#FDE68A",
            color: "#92400E",
        },

        Rejected: {
            bg: "#FEE2E2",
            color: "#B91C1C",
        },

    };

    const style = colors[status] || {

        bg: "#E5E7EB",

        color: "#374151",

    };

    return (

        <Chip

            label={status || "Pending"}

            size="small"

            sx={{

                bgcolor: style.bg,

                color: style.color,

                fontWeight: 700,

                borderRadius: 2,

            }}

        />

    );

}