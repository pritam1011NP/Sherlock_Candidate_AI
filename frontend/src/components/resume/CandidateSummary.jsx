import Grid from "@mui/material/Grid";
import {
    Avatar,
    Box,
    Chip,
    Divider,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import {
    Email,
    Phone,
    School,
    Work,
    Folder,
    EmojiEvents,
    Person,
} from "@mui/icons-material";
import StatusChip from "../common/StatusChip";

export default function CandidateSummary({ analysis }) {

    const photoUrl = analysis?.photo_path
        ? `http://127.0.0.1:8000/${analysis.photo_path.replace(/\\/g, "/")}`
        : "";

    return (

        <Paper
            elevation={4}
            sx={{
                borderRadius: 4,
                overflow: "hidden",
            }}
        >

            {/* Header */}

            <Box
                sx={{
                    background:
                        "linear-gradient(90deg,#1976d2,#42a5f5)",
                    color: "white",
                    p: 4,
                }}
            >

                <Grid container spacing={4} alignItems="center">

                    <Grid size={{ xs: 2, mb: 6}}>

                        <Avatar
                            src={photoUrl}
                            sx={{
                                width: 150,
                                height: 150,
                                border: "5px solid white",
                                mx: "auto",
                            }}
                        >
                            <Person sx={{ fontSize: 80 }} />
                        </Avatar>

                    </Grid>

                    <Grid size={{xs:12, md: 9}}>

                        <Typography
                            variant="h5"
                            fontWeight={700}
                        >
                            {analysis.candidate_name}
                        </Typography>
                        <StatusChip

                            status={analysis.status}

                        />



                        <Typography
                            sx={{
                                mt: 1,
                                opacity: 0.9,
                            }}
                        >
                            AI Suggested Role
                        </Typography>

                        <Chip
                            label={analysis.suggested_role}
                            sx={{
                                mt: 2,
                                bgcolor: "white",
                                color: "#1947d2",
                                fontWeight: 700,
                                fontSize: 15,
                            }}
                        />

                    </Grid>

                </Grid>

            </Box>

            {/* Details */}

            <Box sx={{ p: 4 }}>

                <Typography
                    variant="h5"
                    fontWeight={700}
                    mb={3}
                >
                    Candidate Information
                </Typography>

                <Divider sx={{ mb: 4 }} />

                <Grid container spacing={4}>

                    <Grid size={{xs: 12, md: 6}}>

                        <Paper
                            variant="outlined"
                            sx={{
                                p: 2,
                                borderRadius: 3,
                            }}
                        >

                            <Stack direction="row" spacing={2}>

                                <Email color="primary" />

                                <Box>

                                    <Typography
                                        fontWeight={700}
                                    >
                                        Email
                                    </Typography>

                                    <Typography
                                        color="text.secondary"
                                    >
                                        {analysis.email || "Not Available"}
                                    </Typography>

                                </Box>

                            </Stack>

                        </Paper>

                    </Grid>

                    <Grid size={{xs: 12, md: 6}}>

                        <Paper
                            variant="outlined"
                            sx={{
                                p: 2,
                                borderRadius: 3,
                            }}
                        >

                            <Stack direction="row" spacing={2}>

                                <Phone color="success" />

                                <Box>

                                    <Typography fontWeight={700}>
                                        Phone
                                    </Typography>

                                    <Typography color="text.secondary">
                                        {analysis.phone || "Not Available"}
                                    </Typography>

                                </Box>

                            </Stack>

                        </Paper>

                    </Grid>

                    <Grid size={{xs: 12, md: 6}}>

                        <Paper
                            variant="outlined"
                            sx={{
                                p: 2,
                                borderRadius: 3,
                            }}
                        >

                            <Stack direction="row" spacing={2}>

                                <School color="secondary" />

                                <Box>

                                    <Typography fontWeight={700}>
                                        Education
                                    </Typography>

                                    <Typography color="text.secondary">
                                        {analysis.education?.length
                                            ? analysis.education.join(", ")
                                            : "Not Available"}
                                    </Typography>

                                </Box>

                            </Stack>

                        </Paper>

                    </Grid>

                    <Grid size={{xs: 12, md: 6}}>

                        <Paper
                            variant="outlined"
                            sx={{
                                p: 2,
                                borderRadius: 3,
                            }}
                        >

                            <Stack direction="row" spacing={2}>

                                <Work color="warning" />

                                <Box>

                                    <Typography fontWeight={700}>
                                        Experience
                                    </Typography>

                                    <Typography color="text.secondary">
                                        {analysis.experience} Years
                                    </Typography>

                                </Box>

                            </Stack>

                        </Paper>

                    </Grid>

                    <Grid size={{xs: 12, md: 6}}>

                        <Paper
                            variant="outlined"
                            sx={{
                                p: 2,
                                borderRadius: 3,
                            }}
                        >

                            <Stack direction="row" spacing={2}>

                                <Folder color="primary" />

                                <Box>

                                    <Typography fontWeight={700}>
                                        Projects
                                    </Typography>

                                    <Typography color="text.secondary">
                                        {analysis.projects}
                                    </Typography>

                                </Box>

                            </Stack>

                        </Paper>

                    </Grid>

                    <Grid size={{xs: 12, md: 6}}>

                        <Paper
                            variant="outlined"
                            sx={{
                                p: 2,
                                borderRadius: 3,
                            }}
                        >

                            <Stack direction="row" spacing={2}>

                                <EmojiEvents color="error" />

                                <Box>

                                    <Typography fontWeight={700}>
                                        Certifications
                                    </Typography>

                                    <Typography color="text.secondary">
                                        {analysis.certifications?.length}
                                    </Typography>

                                </Box>

                            </Stack>

                        </Paper>

                    </Grid>

                </Grid>

                <Divider sx={{ my: 4 }} />

                <Typography
                    variant="h5"
                    fontWeight={700}
                    mb={3}
                >
                    Certifications
                </Typography>

                <Stack
                    direction="row"
                    spacing={1}
                    flexWrap="wrap"
                    useFlexGap
                >

                    {analysis.certifications?.length ? (

                        analysis.certifications.map((cert) => (

                            <Chip
                                key={cert}
                                label={cert}
                                color="success"
                            />

                        ))

                    ) : (

                        <Chip
                            label="No Certifications"
                            color="default"
                        />

                    )}

                </Stack>

            </Box>

        </Paper>

    );

}