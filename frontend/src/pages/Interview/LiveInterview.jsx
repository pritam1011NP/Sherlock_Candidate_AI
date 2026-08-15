import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Box,
    Typography,
    Paper,
    Button,
    CircularProgress,
    Alert,
    LinearProgress,
} from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";

import StopIcon from "@mui/icons-material/Stop";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { getInterviewQuestions } from "../../api/interviewApi";
import InterviewRecorder from "../../components/interview/InterviewRecorder";

export default function LiveInterview() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [questions, setQuestions] = useState([]);

    const [currentQuestion, setCurrentQuestion] = useState(0);

    const [uploaded, setUploaded] = useState(false);

    useEffect(() => {

        loadQuestions();

    }, []);

    async function loadQuestions() {

        try {

            const data = await getInterviewQuestions(id);

            setQuestions(data.questions);

        }

        catch (err) {

            console.error(err);

            setError("Unable to load interview.");

        }

        finally {

            setLoading(false);

        }

    }

    function handleUploaded() {

        setUploaded(true);

    }

    function nextQuestion() {

        if (currentQuestion < questions.length - 1) {

            setCurrentQuestion((prev) => prev + 1);

            setUploaded(false);
        } else {
            navigate(`/interview-result/${id}`);
        }

        

    }

    if (loading) {

        return (

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 10,
                }}
            >
                <CircularProgress />
            </Box>

        );

    }

    if (error) {

        return <Alert severity="error">{error}</Alert>;

    }

    const progress =
        ((currentQuestion + 1) / questions.length) * 100;

    return (

        <Box>

            <Typography
                variant="h4"
                fontWeight={700}
                mb={3}
            >
                Live AI Interview
            </Typography>

            <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                    mb: 4,
                    height: 10,
                    borderRadius: 5,
                }}
            />

            <Paper
                sx={{
                    p: 4,
                    borderRadius: 3,
                }}
            >

                <Typography
                    variant="h6"
                    color="text.secondary"
                >
                    Question {currentQuestion + 1}
                </Typography>

                <Typography
                    variant="h5"
                    mt={2}
                    mb={4}
                >
                    {questions[currentQuestion]?.question}
                </Typography>

                <InterviewRecorder

                    candidateId={id}

                    questionNumber={currentQuestion + 1}

                    question={questions[currentQuestion]?.question}

                    onUploaded={handleUploaded}

                />

                <Box mt={4}>

                    <Button

                        variant="contained"

                        endIcon={<ArrowForwardIcon />}

                        disabled={!uploaded}

                        onClick={nextQuestion}

                    >

                        {

                            currentQuestion === questions.length - 1

                                ? "Finish Interview"

                                : "Next Question"

                        }

                    </Button>

                </Box>

            </Paper>

        </Box>

    );

}