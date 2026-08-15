import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
    Box,
    Typography,
    Paper,
    CircularProgress,
    Alert,
    Divider,
    LinearProgress,
    Chip,
    Button,
    Grid,
    Stack,
    Avatar,
} from "@mui/material";

import DownloadIcon from "@mui/icons-material/Download";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PsychologyIcon from "@mui/icons-material/Psychology";
import PersonIcon from "@mui/icons-material/Person";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

import {
    RadarChart,
    Radar,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
} from "recharts";

import { getInterviewResult } from "../../api/interviewApi";

export default function InterviewResult() {

    const { id } = useParams();

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [result, setResult] = useState(null);

    useEffect(() => {
        loadResult();
    }, []);

    async function loadResult() {

        try {

            const data = await getInterviewResult(id);

            setResult(data);

        } catch (err) {

            console.error(err);

            setError("Unable to load interview result.");

        } finally {

            setLoading(false);

        }

    }

    if (loading) {

        return (
            <Box
                display="flex"
                justifyContent="center"
                mt={10}
            >
                <CircularProgress />
            </Box>
        );

    }

    if (error) {

        return <Alert severity="error">{error}</Alert>;

    }

    const avg = (field) => {

        if (!result.answers.length) return 0;

        return (
            result.answers.reduce((s, a) => s + Number(a[field] || 0), 0) /
            result.answers.length
        ).toFixed(1);

    };

    const radarData = [
        {
            subject: "Grammar",
            score: Number(avg("grammar_score")),
        },
        {
            subject: "Confidence",
            score: Number(avg("confidence_score")),
        },
        {
            subject: "Communication",
            score: Number(avg("communication_score")),
        },
        {
            subject: "Relevance",
            score: Number(avg("relevance_score")),
        },
    ];

    return (

        <Box>

            <Typography
                variant="h4"
                fontWeight={700}
                mb={4}
            >
                AI Interview Result
            </Typography>

            <Grid container spacing={3} mb={4}>

                {/* Candidate */}

                <Grid item xs={12} md={4}>

                    <Paper
                        sx={{
                            p:4,
                            borderRadius:4,
                            textAlign:"center",
                            height:"100%",
                        }}
                    >

                        <Avatar
                            sx={{
                                width:80,
                                height:80,
                                mx:"auto",
                                mb:2,
                                bgcolor:"primary.main",
                            }}
                        >
                            <PersonIcon fontSize="large"/>
                        </Avatar>

                        <Typography
                            variant="h5"
                            fontWeight={700}
                        >
                            {result.candidate_name}
                        </Typography>

                        <Typography
                            color="text.secondary"
                            mt={1}
                        >
                            Candidate ID #{result.candidate_id}
                        </Typography>

                    </Paper>

                </Grid>

                {/* Overall */}

                <Grid item xs={12} md={4}>

                    <Paper
                        sx={{
                            p:4,
                            borderRadius:4,
                            textAlign:"center",
                            height:"100%",
                        }}
                    >

                        <EmojiEventsIcon
                            color="warning"
                            sx={{
                                fontSize:50,
                                mb:2,
                            }}
                        />

                        <Typography
                            variant="h3"
                            color="primary"
                            fontWeight={700}
                        >
                            {result.overall_score}%
                        </Typography>

                        <Typography>
                            Overall Performance
                        </Typography>

                        <LinearProgress
                            value={result.overall_score}
                            variant="determinate"
                            sx={{
                                mt:3,
                                height:10,
                                borderRadius:5,
                            }}
                        />

                    </Paper>

                </Grid>

                {/* Recommendation */}

                <Grid item xs={12} md={4}>

                    <Paper
                        sx={{
                            p:4,
                            borderRadius:4,
                            height:"100%",
                            textAlign:"center",
                        }}
                    >

                        <WorkspacePremiumIcon
                            color="success"
                            sx={{
                                fontSize:50,
                                mb:2,
                            }}
                        />

                        <Typography
                            variant="h6"
                            mb={2}
                        >
                            AI Recommendation
                        </Typography>

                        <Chip
                            size="medium"
                            label={result.recommendation}
                            color={
                                result.recommendation==="Hire"
                                    ? "success"
                                    : result.recommendation==="Maybe"
                                    ? "warning"
                                    : "error"
                            }
                        />

                        <Button
                            fullWidth
                            sx={{mt:4}}
                            variant="contained"
                            startIcon={<DownloadIcon/>}
                            href={`http://127.0.0.1:8000/interview/report/${id}`}
                        >
                            Download PDF
                        </Button>

                    </Paper>

                </Grid>

            </Grid>

            {/* Skills */}

            <Grid container spacing={3} mb={4}>

                <Grid item xs={12} md={6}>

                    <Paper
                        sx={{
                            p:4,
                            borderRadius:4,
                            height:420,
                        }}
                    >

                        <Typography
                            variant="h6"
                            fontWeight={700}
                            mb={2}
                        >
                            AI Skill Analysis
                        </Typography>

                        <ResponsiveContainer
                            width="100%"
                            height={320}
                        >

                            <RadarChart
                                data={radarData}
                            >

                                <PolarGrid/>

                                <PolarAngleAxis
                                    dataKey="subject"
                                />

                                <PolarRadiusAxis
                                    angle={90}
                                    domain={[0,100]}
                                />

                                <Radar
                                    dataKey="score"
                                    stroke="#1976d2"
                                    fill="#1976d2"
                                    fillOpacity={0.5}
                                />

                            </RadarChart>

                        </ResponsiveContainer>

                    </Paper>

                </Grid>

                <Grid item xs={12} md={6}>

                    <Paper
                        sx={{
                            p:4,
                            borderRadius:4,
                            height:420,
                        }}
                    >

                        <Typography
                            variant="h6"
                            fontWeight={700}
                            mb={3}
                        >
                            Average Scores
                        </Typography>

                        {[
                            ["Grammar", avg("grammar_score")],
                            ["Confidence", avg("confidence_score")],
                            ["Communication", avg("communication_score")],
                            ["Relevance", avg("relevance_score")]
                        ].map(([title,value])=>(

                            <Box key={title} mb={3}>

                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                >

                                    <Typography>
                                        {title}
                                    </Typography>

                                    <Typography fontWeight={700}>
                                        {value}%
                                    </Typography>

                                </Stack>

                                <LinearProgress
                                    variant="determinate"
                                    value={Number(value)}
                                    sx={{
                                        mt:1,
                                        height:10,
                                        borderRadius:5,
                                    }}
                                />

                            </Box>

                        ))}

                    </Paper>

                </Grid>

            </Grid>

            {/* Question Cards */}

            {result.answers.map((answer)=>(

                <Paper
                    key={answer.id}
                    sx={{
                        p:4,
                        mb:3,
                        borderRadius:4,
                    }}
                >

                    <Typography
                        variant="h6"
                        fontWeight={700}
                        mb={2}
                    >
                        Question {answer.question_number}
                    </Typography>

                    <Typography
                        mb={2}
                    >
                        {answer.question}
                    </Typography>

                    <Divider sx={{mb:3}}/>

                    <Typography
                        variant="subtitle2"
                        fontWeight={700}
                    >
                        Transcript
                    </Typography>

                    <Typography
                        color="text.secondary"
                        mb={3}
                    >
                        {answer.transcript}
                    </Typography>

                    <Grid container spacing={2}>

                        <Grid item xs={6} md={3}>
                            <Chip
                                fullWidth
                                label={`Grammar ${answer.grammar_score}`}
                                color="primary"
                            />
                        </Grid>

                        <Grid item xs={6} md={3}>
                            <Chip
                                label={`Confidence ${answer.confidence_score}`}
                                color="success"
                            />
                        </Grid>

                        <Grid item xs={6} md={3}>
                            <Chip
                                label={`Communication ${answer.communication_score}`}
                                color="warning"
                            />
                        </Grid>

                        <Grid item xs={6} md={3}>
                            <Chip
                                label={`Relevance ${answer.relevance_score}`}
                                color="secondary"
                            />
                        </Grid>

                    </Grid>

                    <Typography
                        mt={3}
                        variant="h6"
                        color="primary"
                    >
                        AI Score : {answer.ai_score}%
                    </Typography>

                    <Typography
                        mt={2}
                    >
                        <PsychologyIcon
                            sx={{
                                mr:1,
                                verticalAlign:"middle",
                            }}
                        />
                        {answer.feedback}
                    </Typography>

                </Paper>

            ))}

        </Box>

    );

}