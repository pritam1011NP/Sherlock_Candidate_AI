import Grid from "@mui/material/Grid";

import {
    Card,
    CardContent,
    Typography,
    Stack,
} from "@mui/material";

import {
    People,
    CompareArrows,
    VideoCall,
    CloudUpload,
} from "@mui/icons-material";

export default function ReportsCards({ summary }) {

    const cards = [

        {
            title: "Candidates",
            value:
                summary?.candidate_report
                    ?.total_candidates ?? 0,
            icon: <People fontSize="large" />,
            color: "#2563EB",
        },

        {
            title: "Uploads",
            value:
                summary?.candidate_report
                    ?.total_uploads ?? 0,
            icon: <CloudUpload fontSize="large" />,
            color: "#0EA5E9",
        },

        {
            title: "Matches",
            value:
                summary?.match_report
                    ?.total_matches ?? 0,
            icon: <CompareArrows fontSize="large" />,
            color: "#16A34A",
        },

        {
            title: "Interviews",
            value:
                summary?.interview_report
                    ?.total_interviews ?? 0,
            icon: <VideoCall fontSize="large" />,
            color: "#EA580C",
        },

    ];

    return (

        <Grid
            container
            spacing={3}
            sx={{ mb: 3 }}
        >

            {cards.map((card) => (

                <Grid
                    item
                    xs={12}
                    sm={6}
                    lg={3}
                    key={card.title}
                >

                    <Card
                        elevation={0}
                        sx={{
                            borderRadius: 4,
                            border: "1px solid #E5E7EB",
                            height: "100%",
                        }}
                    >

                        <CardContent>

                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                            >

                                <div>

                                    <Typography
                                        color="text.secondary"
                                        variant="body2"
                                    >
                                        {card.title}
                                    </Typography>

                                    <Typography
                                        variant="h4"
                                        fontWeight={700}
                                        mt={1}
                                    >
                                        {card.value}
                                    </Typography>

                                </div>

                                <Stack
                                    justifyContent="center"
                                    alignItems="center"
                                    sx={{
                                        width: 60,
                                        height: 60,
                                        borderRadius: "50%",
                                        bgcolor: `${card.color}15`,
                                        color: card.color,
                                    }}
                                >
                                    {card.icon}
                                </Stack>

                            </Stack>

                        </CardContent>

                    </Card>

                </Grid>

            ))}

        </Grid>

    );

}