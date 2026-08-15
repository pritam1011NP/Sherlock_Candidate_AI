import {

    Avatar,

    Box,

    Chip,

    Paper,

    Typography,

    

} from "@mui/material";
import Grid from "@mui/material/Grid";

export default function CandidateProfile({

    candidate,

}) {

    return (

        <Paper

            sx={{

                p:4,

                borderRadius:3,

                mb:3,

            }}

        >

            <Grid container spacing={4}>

                <Grid size={{ xs: 12, md: 3 }}>

                    <Avatar

                        src={`http://127.0.0.1:8000/${candidate.photo_path}`}

                        sx={{

                            width:150,

                            height:150,

                        }}

                    />

                </Grid>

                <Grid size={{ xs: 12, md: 9 }}>

                    <Typography

                        variant="h4"

                        fontWeight={700}

                    >

                        {candidate.full_name}

                    </Typography>

                    <Typography

                        color="text.secondary"

                        mb={2}

                    >

                        {candidate.position}

                    </Typography>

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

                    <Box mt={4}>

                        <Typography>

                            <b>Email :</b> {candidate.email}

                        </Typography>

                        <Typography>

                            <b>Phone :</b> {candidate.phone}

                        </Typography>

                        <Typography>

                            <b>Address :</b> {candidate.address}

                        </Typography>

                    </Box>

                </Grid>

            </Grid>

        </Paper>

    );

}