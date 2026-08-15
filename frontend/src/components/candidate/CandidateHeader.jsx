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
    Email,
    Phone,
    Work,
    Download,
    CheckCircle,
    Close,
} from "@mui/icons-material";

export default function CandidateHeader({ candidate }) {

    const photo = candidate?.photo_path
        ? `http://127.0.0.1:8000/${candidate.photo_path.replace(/\\/g, "/")}`
        : "";

    return (

        <Paper
            elevation={0}
            sx={{
                p:4,
                borderRadius:4,
                border:"1px solid #E5E7EB",
                mb:3,
            }}
        >

            <Stack
                direction={{
                    xs:"column",
                    md:"row",
                }}
                spacing={3}
                alignItems="center"
            >

                <Avatar
                    src={photo}
                    sx={{
                        width:120,
                        height:120,
                        fontSize:40,
                        bgcolor:"#2563EB",
                    }}
                >
                    {candidate.full_name?.charAt(0)}
                </Avatar>

                <Box flex={1}>

                    <Typography
                        variant="h4"
                        fontWeight={700}
                    >
                        {candidate.full_name}
                    </Typography>

                    <Typography
                        color="text.secondary"
                        mt={1}
                    >
                        {candidate.position}
                    </Typography>

                    <Stack
                        direction="row"
                        spacing={2}
                        mt={2}
                        flexWrap="wrap"
                    >

                        <Chip
                            icon={<Email />}
                            label={candidate.email}
                        />

                        <Chip
                            icon={<Phone />}
                            label={candidate.phone || "N/A"}
                        />

                        <Chip
                            icon={<Work />}
                            label={candidate.position}
                        />

                    </Stack>

                </Box>

                <Stack spacing={2}>

                    <Chip
                        label={candidate.status}
                        color={
                            candidate.status==="Verified"
                                ? "success"
                                : candidate.status==="Rejected"
                                ? "error"
                                : "warning"
                        }
                    />

                    <Button
                        variant="contained"
                        startIcon={<Download />}
                        href={
                            candidate.resume_path
                                ? `http://127.0.0.1:8000/${candidate.resume_path.replace(/\\/g, "/")}`
                                : undefined
                        }
                        target="_blank"
                    >
                        Resume
                    </Button>

                    <Button
                        variant="contained"
                        color="success"
                        startIcon={<CheckCircle />}
                    >
                        Hire
                    </Button>

                    <Button
                        variant="outlined"
                        color="error"
                        startIcon={<Close />}
                    >
                        Reject
                    </Button>

                </Stack>

            </Stack>

        </Paper>

    );

}