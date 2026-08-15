import {
    Avatar,
    Box,
    Button,
    Chip,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import {
    PlayArrow,
    Psychology,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function CandidateInterviewCard({ data }) {

    return (

        <Paper
            elevation={3}
            sx={{
                p: 3,
                borderRadius: 3,
            }}
        >

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    mb: 2,
                }}
            >

                <Avatar
                    src={
                        data.photo_path
                            ? `http://127.0.0.1:8000/${data.photo_path.replace(/\\/g, "/")}`
                            : ""
                    }
                    sx={{
                        width: 140,
                        height: 140,
                    }}
                />

            </Box>

            <Typography
                variant="h5"
                fontWeight={700}
                align="center"
            >
                {data.candidate_name}
            </Typography>

            <Typography
                color="text.secondary"
                align="center"
                mb={3}
            >
                {data.role}
            </Typography>

            <Stack spacing={2}>

                <Paper
                    variant="outlined"
                    sx={{
                        p: 2,
                        textAlign: "center",
                    }}
                >

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        Total Questions
                    </Typography>

                    <Typography
                        variant="h4"
                        fontWeight={700}
                    >
                        {data.total_questions}
                    </Typography>

                </Paper>

                <Chip
                    icon={<Psychology />}
                    label="AI Generated Questions"
                    color="primary"
                    sx={{
                        fontWeight: 600,
                    }}
                />

                <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    startIcon={<PlayArrow />}
                    onClick={() => navigate(`/interview/${data.candidate_id}`)}
                    
                >
                    Start Interview
                </Button>

            </Stack>

        </Paper>

    );

}