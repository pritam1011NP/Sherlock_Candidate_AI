import {
    Paper,
    
    Typography,
    CircularProgress,
    Box,
    Chip,
    Divider,
} from "@mui/material";
import Grid from "@mui/material/Grid";
export default function ScoreCard({ analysis }) {

    const score = analysis.overall_score || 0;

    const scoreColor =
        score >= 80
            ? "success"
            : score >= 60
            ? "warning"
            : "error";

    return (

        <Paper
            elevation={4}
            sx={{
                p: 4,
                borderRadius: 4,
            }}
        >

            <Typography
                variant="h5"
                fontWeight={700}
                mb={4}
            >
                AI Resume Evaluation
            </Typography>

            <Grid
                container
                spacing={4}
                alignItems="center"
            >

                {/* Left Side */}

                <Grid
                    size={{ xs: 12, md: 6 }}
                    textAlign="center"
                >

                    <Box
                        position="relative"
                        display="inline-flex"
                    >

                        <CircularProgress
                            variant="determinate"
                            value={score}
                            size={170}
                            thickness={4}
                            color={scoreColor}
                        />

                        <Box
                            sx={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexDirection: "column",
                            }}
                        >

                            <Typography
                                variant="h3"
                                fontWeight={700}
                            >
                                {score}%
                            </Typography>

                            <Typography
                                color="text.secondary"
                            >
                                Resume Match
                            </Typography>

                        </Box>

                    </Box>

                </Grid>

                {/* Right Side */}

                <Grid
                    size={{ xs: 12, md: 6 }}
                >

                    <Typography
                        variant="h6"
                        fontWeight={700}
                    >
                        Recommendation
                    </Typography>

                    <Chip
                        label={analysis.recommendation}
                        color={
                            analysis.recommendation === "Hire"
                                ? "success"
                                : analysis.recommendation === "Maybe"
                                ? "warning"
                                : "error"
                        }
                        sx={{
                            mt: 1,
                            mb: 3,
                            fontWeight: 700,
                            fontSize: 15,
                        }}
                    />

                    <Divider sx={{ mb: 3 }} />

                    <Grid container spacing={3}>

                        <Grid size={{ xs: 12 }}>

                            <Typography
                                color="text.secondary"
                            >
                                Confidence
                            </Typography>

                            <Typography
                                variant="h5"
                                fontWeight={700}
                            >
                                {analysis.confidence}%
                            </Typography>

                        </Grid>

                        <Grid size={{ xs: 12 }}>

                            <Typography
                                color="text.secondary"
                            >
                                Suggested Role
                            </Typography>

                            <Typography
                                variant="h5"
                                fontWeight={700}
                            >
                                {analysis.suggested_role}
                            </Typography>

                        </Grid>

                    </Grid>

                </Grid>

            </Grid>

        </Paper>

    );

}