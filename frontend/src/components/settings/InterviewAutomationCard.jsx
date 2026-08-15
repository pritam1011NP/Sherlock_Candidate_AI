import {
    Paper,
    Typography,
    Grid,
    FormControlLabel,
    Switch,
} from "@mui/material";

export default function InterviewAutomationCard() {

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
                Automation
            </Typography>

            <Grid container spacing={2}>

                <Grid item xs={6}>
                    <FormControlLabel
                        control={<Switch defaultChecked />}
                        label="Auto Score Candidate"
                    />
                </Grid>

                <Grid item xs={6}>
                    <FormControlLabel
                        control={<Switch defaultChecked />}
                        label="Auto Save Interview"
                    />
                </Grid>

                <Grid item xs={6}>
                    <FormControlLabel
                        control={<Switch defaultChecked />}
                        label="Auto Generate PDF Report"
                    />
                </Grid>

                <Grid item xs={6}>
                    <FormControlLabel
                        control={<Switch defaultChecked />}
                        label="Auto Notify Recruiter"
                    />
                </Grid>

            </Grid>

        </Paper>

    );

}