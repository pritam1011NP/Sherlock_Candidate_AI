import {
    Paper,
    Typography,
    Grid,
    TextField,
    MenuItem,
} from "@mui/material";

export default function InterviewDifficultyCard() {

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
                Interview Difficulty
            </Typography>

            <Grid container spacing={3}>

                <Grid item xs={12} md={6}>

                    <TextField
                        fullWidth
                        select
                        label="Difficulty"

                        defaultValue="Medium"
                    >

                        <MenuItem value="Easy">
                            Easy
                        </MenuItem>

                        <MenuItem value="Medium">
                            Medium
                        </MenuItem>

                        <MenuItem value="Hard">
                            Hard
                        </MenuItem>

                    </TextField>

                </Grid>

            </Grid>

        </Paper>

    );

}