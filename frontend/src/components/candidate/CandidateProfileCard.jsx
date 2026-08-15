import {
    Paper,
    Typography,
    Stack,
    Divider,
} from "@mui/material";

export default function CandidateProfileCard({ candidate }) {

    return (

        <Paper
            elevation={0}
            sx={{
                p:3,
                borderRadius:4,
                border:"1px solid #E5E7EB",
                height:"100%",
            }}
        >

            <Typography
                variant="h6"
                fontWeight={700}
                mb={2}
            >
                Profile Information
            </Typography>

            <Stack spacing={2}>

                <div>

                    <Typography
                        variant="caption"
                        color="text.secondary"
                    >
                        Email
                    </Typography>

                    <Typography>
                        {candidate.email}
                    </Typography>

                </div>

                <Divider/>

                <div>

                    <Typography
                        variant="caption"
                        color="text.secondary"
                    >
                        Phone
                    </Typography>

                    <Typography>
                        {candidate.phone || "-"}
                    </Typography>

                </div>

                <Divider/>

                <div>

                    <Typography
                        variant="caption"
                        color="text.secondary"
                    >
                        Position
                    </Typography>

                    <Typography>
                        {candidate.position}
                    </Typography>

                </div>

                <Divider/>

                <div>

                    <Typography
                        variant="caption"
                        color="text.secondary"
                    >
                        Address
                    </Typography>

                    <Typography>
                        {candidate.address || "-"}
                    </Typography>

                </div>

                <Divider/>

                <div>

                    <Typography
                        variant="caption"
                        color="text.secondary"
                    >
                        Status
                    </Typography>

                    <Typography>
                        {candidate.status}
                    </Typography>

                </div>

            </Stack>

        </Paper>

    );

}