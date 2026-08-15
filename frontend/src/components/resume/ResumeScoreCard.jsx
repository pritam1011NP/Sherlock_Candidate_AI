import {
    Paper,
    Typography,
    LinearProgress,
    Stack,
} from "@mui/material";

function ScoreBar({ label, value }) {

    return (

        <Stack spacing={1}>

            <Typography>

                {label}

            </Typography>

            <LinearProgress
                variant="determinate"
                value={value}
                sx={{
                    height:10,
                    borderRadius:5,
                }}
            />

            <Typography
                fontWeight={700}
            >
                {value}%
            </Typography>

        </Stack>

    );

}

export default function ResumeScoreCard({

    score = {

        overall:92,
        skills:95,
        experience:89,
        education:90,
        communication:84,

    }

}) {

    return (

        <Paper
            elevation={3}
            sx={{
                p:4,
                borderRadius:3,
            }}
        >

            <Typography
                variant="h5"
                fontWeight={700}
                mb={3}
            >
                AI Resume Score
            </Typography>

            <Typography
                variant="h2"
                align="center"
                color="primary"
                fontWeight={700}
                mb={4}
            >
                {score.overall}%
            </Typography>

            <Stack spacing={3}>

                <ScoreBar
                    label="Skills"
                    value={score.skills}
                />

                <ScoreBar
                    label="Experience"
                    value={score.experience}
                />

                <ScoreBar
                    label="Education"
                    value={score.education}
                />

                <ScoreBar
                    label="Communication"
                    value={score.communication}
                />

            </Stack>

        </Paper>

    );

}