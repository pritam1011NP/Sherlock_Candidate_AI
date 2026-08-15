import {
    Paper,
    Typography,
    Grid,
    Switch,
    FormControlLabel,
} from "@mui/material";

export default function InterviewEvaluationCard() {

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
                AI Evaluation Modules
            </Typography>

            <Grid container spacing={2}>

                <Grid item xs={6}>
                    <FormControlLabel
                        control={<Switch defaultChecked />}
                        label="Technical Evaluation"
                    />
                </Grid>

                <Grid item xs={6}>
                    <FormControlLabel
                        control={<Switch defaultChecked />}
                        label="Communication Evaluation"
                    />
                </Grid>

                <Grid item xs={6}>
                    <FormControlLabel
                        control={<Switch defaultChecked />}
                        label="Confidence Analysis"
                    />
                </Grid>

                <Grid item xs={6}>
                    <FormControlLabel
                        control={<Switch defaultChecked />}
                        label="Behavior Analysis"
                    />
                </Grid>

                <Grid item xs={6}>
                    <FormControlLabel
                        control={<Switch defaultChecked />}
                        label="Emotion Detection"
                    />
                </Grid>

                <Grid item xs={6}>
                    <FormControlLabel
                        control={<Switch defaultChecked />}
                        label="Eye Contact Detection"
                    />
                </Grid>

            </Grid>

        </Paper>

    );

}