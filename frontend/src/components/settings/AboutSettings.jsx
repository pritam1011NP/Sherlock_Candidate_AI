import {
    Paper,
    Typography,
    Divider,
} from "@mui/material";

export default function AboutSettings() {
    return (
        <Paper
            elevation={0}
            sx={{
                p:4,
                borderRadius:3,
                border:"1px solid #E5E7EB",
            }}
        >
            <Typography variant="h5" fontWeight={700}>
                About Sherlock Candidate AI
            </Typography>

            <Divider sx={{ my:3 }} />

            <Typography>
                Version: 1.0.0
            </Typography>

            <Typography mt={1}>
                AI-powered Candidate Identification & Interview Platform
            </Typography>

            <Typography mt={1}>
                Developed using React, FastAPI, SQLite and Material UI.
            </Typography>
        </Paper>
    );
}