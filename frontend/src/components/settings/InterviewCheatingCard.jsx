import {
    Paper,
    Typography,
    Grid,
    Switch,
    FormControlLabel,
} from "@mui/material";

export default function InterviewCheatingCard() {

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
                Proctoring & Cheating Detection
            </Typography>

            <Grid container spacing={2}>

                <Grid item xs={6}>
                    <FormControlLabel
                        control={<Switch defaultChecked />}
                        label="Face Verification"
                    />
                </Grid>

                <Grid item xs={6}>
                    <FormControlLabel
                        control={<Switch defaultChecked />}
                        label="Multiple Face Detection"
                    />
                </Grid>

                <Grid item xs={6}>
                    <FormControlLabel
                        control={<Switch defaultChecked />}
                        label="Tab Switching Detection"
                    />
                </Grid>

                <Grid item xs={6}>
                    <FormControlLabel
                        control={<Switch defaultChecked />}
                        label="Voice Monitoring"
                    />
                </Grid>

            </Grid>

        </Paper>

    );

}