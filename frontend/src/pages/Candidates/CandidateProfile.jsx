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
    ArrowBack,
    Email,
    Phone,
    Work,
} from "@mui/icons-material";

import { useNavigate, useParams } from "react-router-dom";

export default function CandidateProfile() {

    const navigate = useNavigate();

    const { id } = useParams();

    return (

        <Box p={3}>

            <Button
                startIcon={<ArrowBack />}
                onClick={() => navigate(-1)}
                sx={{ mb: 3 }}
            >
                Back
            </Button>

            <Paper
                elevation={0}
                sx={{
                    p:4,
                    borderRadius:4,
                    border:"1px solid #E5E7EB",
                }}
            >

                <Stack
                    direction="row"
                    spacing={3}
                    alignItems="center"
                >

                    <Avatar
                        sx={{
                            width:100,
                            height:100,
                            fontSize:40,
                            bgcolor:"#2563EB",
                        }}
                    >
                        C
                    </Avatar>

                    <Box flex={1}>

                        <Typography
                            variant="h4"
                            fontWeight={700}
                        >
                            Candidate #{id}
                        </Typography>

                        <Typography color="text.secondary">
                            Candidate Profile
                        </Typography>

                        <Stack
                            direction="row"
                            spacing={1}
                            mt={2}
                            flexWrap="wrap"
                        >

                            <Chip
                                color="success"
                                label="Face Verified"
                            />

                            <Chip
                                color="primary"
                                label="Resume Uploaded"
                            />

                            <Chip
                                color="warning"
                                label="Interview Completed"
                            />

                        </Stack>

                    </Box>

                </Stack>

            </Paper>

        </Box>

    );

}