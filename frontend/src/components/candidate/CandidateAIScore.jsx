import {
    Paper,
    Typography,
    Grid,
    Box,
    LinearProgress,
    Chip,
    Stack,
} from "@mui/material";

import {
    Psychology,
    Verified,
    EmojiEvents,
    Shield,
} from "@mui/icons-material";

export default function CandidateAIScore({ candidate }) {

    // Temporary demo values
    // Later these will come from backend AI analysis

    const ai = {

        overall: 91,

        resume: 95,

        interview: 88,

        face: 97,

        risk: 12,

    };

    const cards = [

        {
            title: "Resume Match",
            value: ai.resume,
            color: "#2563EB",
            icon: <Verified />,
        },

        {
            title: "Interview Prediction",
            value: ai.interview,
            color: "#16A34A",
            icon: <EmojiEvents />,
        },

        {
            title: "Face Verification",
            value: ai.face,
            color: "#EA580C",
            icon: <Shield />,
        },

    ];

    return (

        <Paper
            elevation={0}
            sx={{
                p:3,
                borderRadius:4,
                border:"1px solid #E5E7EB",
            }}
        >

            <Typography
                variant="h6"
                fontWeight={700}
                mb={3}
            >
                AI Candidate Analysis
            </Typography>

            <Grid
                container
                spacing={3}
            >

                {/* Circular Score */}

                <Grid
                    size={{
                        xs:12,
                        md:4,
                    }}
                >

                    <Stack
                        alignItems="center"
                        spacing={2}
                    >

                        <Box
                            sx={{
                                width:180,
                                height:180,
                                borderRadius:"50%",
                                background:
                                `conic-gradient(
                                    #2563EB ${ai.overall*3.6}deg,
                                    #E5E7EB 0deg
                                )`,
                                display:"flex",
                                alignItems:"center",
                                justifyContent:"center",
                            }}
                        >

                            <Box
                                sx={{
                                    width:140,
                                    height:140,
                                    borderRadius:"50%",
                                    bgcolor:"#fff",
                                    display:"flex",
                                    alignItems:"center",
                                    justifyContent:"center",
                                    flexDirection:"column",
                                }}
                            >

                                <Psychology
                                    sx={{
                                        fontSize:35,
                                        color:"#2563EB",
                                    }}
                                />

                                <Typography
                                    variant="h3"
                                    fontWeight={700}
                                >
                                    {ai.overall}
                                </Typography>

                                <Typography
                                    variant="caption"
                                >
                                    AI Score
                                </Typography>

                            </Box>

                        </Box>

                        <Chip
                            color="success"
                            label="Excellent Candidate"
                        />

                    </Stack>

                </Grid>

                {/* Metrics */}

                <Grid
                    size={{
                        xs:12,
                        md:8,
                    }}
                >

                    <Stack spacing={3}>

                        {cards.map((item)=>(

                            <Box
                                key={item.title}
                            >

                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                >

                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        alignItems="center"
                                    >

                                        <Box
                                            sx={{
                                                color:item.color,
                                            }}
                                        >
                                            {item.icon}
                                        </Box>

                                        <Typography
                                            fontWeight={600}
                                        >
                                            {item.title}
                                        </Typography>

                                    </Stack>

                                    <Typography
                                        fontWeight={700}
                                    >
                                        {item.value}%
                                    </Typography>

                                </Stack>

                                <LinearProgress
                                    variant="determinate"
                                    value={item.value}
                                    sx={{
                                        mt:1,
                                        height:10,
                                        borderRadius:10,
                                    }}
                                />

                            </Box>

                        ))}

                        <Box>

                            <Typography
                                fontWeight={700}
                            >
                                Fraud Risk
                            </Typography>

                            <LinearProgress
                                color="error"
                                variant="determinate"
                                value={ai.risk}
                                sx={{
                                    mt:1,
                                    height:10,
                                    borderRadius:10,
                                }}
                            />

                            <Typography
                                mt={1}
                                color="success.main"
                            >
                                Low Risk ({ai.risk}%)
                            </Typography>

                        </Box>

                    </Stack>

                </Grid>

            </Grid>

        </Paper>

    );

}