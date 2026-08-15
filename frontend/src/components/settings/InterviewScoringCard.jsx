import {
    Paper,
    Typography,
    Grid,
    Slider,
} from "@mui/material";

export default function InterviewScoringCard() {

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
                Interview Passing Score
            </Typography>

            <Grid container spacing={3}>

                <Grid item xs={12}>

                    <Typography gutterBottom>
                        Minimum Passing Score (%)
                    </Typography>

                    <Slider
                        defaultValue={70}
                        min={40}
                        max={100}
                        step={5}
                        valueLabelDisplay="on"
                    />

                </Grid>

            </Grid>

        </Paper>

    );

}