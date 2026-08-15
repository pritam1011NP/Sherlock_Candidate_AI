import {
    Paper,
    Typography,
    Box,
    Chip,
    Divider,
} from "@mui/material";

import {
    CircularProgressbar,
    buildStyles,
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

export default function ScoreCard({ analysis }) {

    const score = analysis.overall_score;

    let color = "#ef4444";

    if (score >= 85)
        color = "#16a34a";

    else if (score >= 70)
        color = "#2563eb";

    else if (score >= 50)
        color = "#f59e0b";

    return (

        <Paper
            elevation={3}
            sx={{
                p: 4,
                borderRadius: 4,
                height: "100%",
            }}
        >

            <Typography
                variant="h6"
                fontWeight={700}
                mb={3}
            >
                AI Score
            </Typography>

            <Box
                sx={{
                    width: 180,
                    mx: "auto",
                }}
            >

                <CircularProgressbar
                    value={score}
                    text={`${score}%`}
                    styles={buildStyles({

                        textColor: color,

                        pathColor: color,

                        trailColor: "#e5e7eb",

                        textSize: "18px",

                    })}
                />

            </Box>

            <Divider sx={{ my: 3 }} />

            <Typography
                align="center"
                variant="h5"
                fontWeight={700}
                color={color}
            >
                {analysis.recommendation}
            </Typography>

            <Typography
                align="center"
                color="text.secondary"
                mt={1}
            >
                Confidence
            </Typography>

            <Typography
                align="center"
                variant="h6"
                fontWeight={700}
            >
                {analysis.confidence}%
            </Typography>

            <Box
                mt={3}
                display="flex"
                justifyContent="center"
            >

                <Chip
                    label={analysis.suggested_role}
                    color="primary"
                />

            </Box>

        </Paper>

    );

}