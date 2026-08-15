import {
    Box,
    Typography,
    Paper,
    Grid,
} from "@mui/material";

export default function InterviewAnalytics() {

    return (

        <Box sx={{ p: 4 }}>

            <Typography
                variant="h4"
                fontWeight={700}
                mb={4}
            >
                AI Interview Analytics
            </Typography>

            <Grid
                container
                spacing={3}
            >

                <Grid
                    item
                    xs={12}
                    md={6}
                >

                    <Paper
                        sx={{
                            p:4,
                            borderRadius:3,
                        }}
                    >

                        <Typography
                            variant="h6"
                        >
                            Average Interview Score
                        </Typography>

                        <Typography
                            variant="h2"
                            color="primary"
                            mt={2}
                        >
                            86%
                        </Typography>

                    </Paper>

                </Grid>

                <Grid
                    item
                    xs={12}
                    md={6}
                >

                    <Paper
                        sx={{
                            p:4,
                            borderRadius:3,
                        }}
                    >

                        <Typography
                            variant="h6"
                        >
                            Total Interviews
                        </Typography>

                        <Typography
                            variant="h2"
                            color="success.main"
                            mt={2}
                        >
                            124
                        </Typography>

                    </Paper>

                </Grid>

            </Grid>

        </Box>

    );

}