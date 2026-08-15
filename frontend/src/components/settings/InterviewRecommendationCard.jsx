import {
    Paper,
    Typography,
    FormControlLabel,
    Switch,
} from "@mui/material";

export default function InterviewRecommendationCard() {

    return (

        <Paper
            sx={{
                p:4,
                borderRadius:4,
            }}
        >

            <Typography
                variant="h6"
                fontWeight={700}
                mb={3}
            >
                AI Recommendation
            </Typography>

            <FormControlLabel
                control={<Switch defaultChecked />}
                label="Generate Hire / Reject Recommendation"
            />

            <FormControlLabel
                control={<Switch defaultChecked />}
                label="Generate AI Interview Summary"
            />

        </Paper>

    );

}