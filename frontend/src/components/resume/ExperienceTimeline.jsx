import {
    Paper,
    Typography,
    
    Box,
    LinearProgress,
    Chip,
    Divider,
} from "@mui/material";
import Grid from "@mui/material/Grid";

import {
    WorkHistory,
    Timeline,
    TrendingUp,
    Folder,
} from "@mui/icons-material";

export default function ExperienceTimeline({ analysis }) {

    const experience = analysis.experience || 0;

    const projects = analysis.projects || 0;

    let level = "Fresher";
    let progress = 15;
    let color = "warning";

    if (experience >= 2) {
        level = "Junior";
        progress = 35;
        color = "primary";
    }

    if (experience >= 4) {
        level = "Mid Level";
        progress = 65;
        color = "success";
    }

    if (experience >= 7) {
        level = "Senior";
        progress = 90;
        color = "secondary";
    }

    return (

        <Paper
            elevation={3}
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
                Experience Analysis
            </Typography>

            <Grid container spacing={4}>

                <Grid size={{ xs: 12, md: 6 }}>

                    <Box
                        display="flex"
                        alignItems="center"
                        gap={2}
                        mb={2}
                    >

                        <WorkHistory color="primary" />

                        <Typography
                            fontWeight={700}
                        >
                            Experience
                        </Typography>

                    </Box>

                    <Typography
                        variant="h3"
                        fontWeight={700}
                    >
                        {experience}
                    </Typography>

                    <Typography
                        color="text.secondary"
                    >
                        Years
                    </Typography>

                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>

                    <Box
                        display="flex"
                        alignItems="center"
                        gap={2}
                        mb={2}
                    >

                        <Folder color="warning" />

                        <Typography
                            fontWeight={700}
                        >
                            Projects
                        </Typography>

                    </Box>

                    <Typography
                        variant="h3"
                        fontWeight={700}
                    >
                        {projects}
                    </Typography>

                    <Typography
                        color="text.secondary"
                    >
                        Completed Projects
                    </Typography>

                </Grid>

            </Grid>

            <Divider sx={{ my: 4 }} />

            <Box
                display="flex"
                alignItems="center"
                gap={2}
                mb={2}
            >

                <Timeline color="success" />

                <Typography
                    variant="h6"
                    fontWeight={700}
                >
                    Career Progression
                </Typography>

            </Box>

            <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                    height: 12,
                    borderRadius: 6,
                    mb: 2,
                }}
            />

            <Chip
                label={level}
                color={color}
                sx={{
                    fontWeight: 700,
                    fontSize: 15,
                }}
            />

            <Divider sx={{ my: 4 }} />

            <Box
                display="flex"
                alignItems="center"
                gap={2}
                mb={2}
            >

                <TrendingUp color="secondary" />

                <Typography
                    variant="h6"
                    fontWeight={700}
                >
                    AI Career Insight
                </Typography>

            </Box>

            <Typography
                color="text.secondary"
                lineHeight={1.8}
            >

                Based on the resume, the candidate has approximately{" "}

                <strong>{experience} years</strong>

                {" "}of professional experience and has completed{" "}

                <strong>{projects} projects</strong>.

                The AI estimates the candidate's current career stage as{" "}

                <strong>{level}</strong>.

                This estimation is derived from project count, experience,
                education, certifications, and technical skills detected in
                the resume.

            </Typography>

        </Paper>

    );

}