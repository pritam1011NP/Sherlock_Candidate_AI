import {
    Paper,
    Typography,
    
    Chip,
    Stack,
    LinearProgress,
    Box,
} from "@mui/material";
import Grid from "@mui/material/Grid";

import {
    CheckCircle,
    Cancel,
} from "@mui/icons-material";

export default function SkillsAnalysis({ analysis }) {

    const skills = analysis.skills || [];

    const missingSkills = analysis.missing_skills || [];

    const totalSkills =
        skills.length + missingSkills.length;

    const skillPercentage =
        totalSkills === 0
            ? 0
            : Math.round(
                  (skills.length / totalSkills) * 100
              );

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
                mb={3}
            >
                Skills Analysis
            </Typography>

            {/* Skill Match */}

            <Box mb={4}>

                <Typography
                    fontWeight={600}
                    mb={1}
                >
                    Skill Match
                </Typography>

                <LinearProgress
                    variant="determinate"
                    value={skillPercentage}
                    sx={{
                        height: 12,
                        borderRadius: 6,
                    }}
                />

                <Typography
                    mt={1}
                    color="primary"
                    fontWeight={700}
                >
                    {skillPercentage}% Skills Matched
                </Typography>

            </Box>

            <Grid container spacing={4}>

                {/* Found Skills */}

                <Grid size={{ xs: 12, md: 6 }}>

                    <Typography
                        variant="h6"
                        mb={2}
                    >
                        <CheckCircle
                            color="success"
                            sx={{
                                mr: 1,
                                verticalAlign: "middle",
                            }}
                        />

                        Skills Found

                    </Typography>

                    <Stack
                        direction="row"
                        spacing={1}
                        flexWrap="wrap"
                        useFlexGap
                    >

                        {
                            skills.length > 0 ? (

                                skills.map(skill => (

                                    <Chip
                                        key={skill}
                                        label={skill}
                                        color="success"
                                    />

                                ))

                            ) : (

                                <Typography
                                    color="text.secondary"
                                >
                                    No skills detected.
                                </Typography>

                            )
                        }

                    </Stack>

                </Grid>

                {/* Missing Skills */}

                <Grid size={{ xs: 12, md: 6 }}>

                    <Typography
                        variant="h6"
                        mb={2}
                    >
                        <Cancel
                            color="error"
                            sx={{
                                mr: 1,
                                verticalAlign: "middle",
                            }}
                        />

                        Missing Skills

                    </Typography>

                    <Stack
                        direction="row"
                        spacing={1}
                        flexWrap="wrap"
                        useFlexGap
                    >

                        {
                            missingSkills.length > 0 ? (

                                missingSkills.map(skill => (

                                    <Chip
                                        key={skill}
                                        label={skill}
                                        color="warning"
                                    />

                                ))

                            ) : (

                                <Typography
                                    color="text.secondary"
                                >
                                    No missing skills.
                                </Typography>

                            )
                        }

                    </Stack>

                </Grid>

            </Grid>

        </Paper>

    );

}