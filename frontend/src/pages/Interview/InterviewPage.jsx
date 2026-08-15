import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    Box,
    Paper,
    Typography,
    Button,
    LinearProgress,
    Stack,
    CircularProgress,
    Chip,
    Grid,
} from "@mui/material";

import PsychologyIcon from "@mui/icons-material/Psychology";
import TimerIcon from "@mui/icons-material/Timer";
import AILiveAnalysis from "../../components/interview/layout/AILiveAnalysis";
import ProctorStatus from "../../components/interview/layout/ProctorStatus";

import InterviewTimer from "../../components/interview/InterviewTimer";
import InterviewRecorder from "../../components/interview/InterviewRecorder";
import WebcamMonitor from "../../components/interview/WebcamMonitor";
import ProctorMonitor from "../../components/interview/ProctorMonitor";
import VoiceAnalyzer from "../../components/interview/VoiceAnalyzer";
import QuestionCard from "../../components/interview/layout/QuestionCard";
import AIScoreDashboard from "../../components/interview/layout/AIScoreDashboard";

import { getInterviewQuestions } from "../../api/interviewApi";

export default function InterviewPage() {

    const navigate = useNavigate();

    const { id } = useParams();

    const candidateId = Number(id);

    const [loading, setLoading] = useState(true);

    const [questions, setQuestions] = useState([]);

    const [candidateName, setCandidateName] = useState("");

    const [role, setRole] = useState("");

    const [currentQuestion, setCurrentQuestion] = useState(0);

    const [seconds, setSeconds] = useState(0);

    const [timerKey, setTimerKey] = useState(0);

    const [violations, setViolations] = useState([]);

    const [voiceEmotion, setVoiceEmotion] = useState("Waiting");

    const [voiceScore, setVoiceScore] = useState(92);

    const [behaviourScore, setBehaviourScore] = useState(96);

    const [overallAI, setOverallAI] = useState(94);

    const [interviewStatus, setInterviewStatus] =
        useState("Excellent");

    useEffect(() => {

        loadQuestions();

    }, [candidateId]);

    useEffect(() => {

        const timer = setInterval(() => {

            setSeconds(prev => prev + 1);

        }, 1000);

        return () => clearInterval(timer);

    }, []);

    useEffect(() => {

        setTimerKey(prev => prev + 1);

    }, [currentQuestion]);

    async function loadQuestions() {

        try {

            const data =
                await getInterviewQuestions(candidateId);

            setQuestions(data.questions || []);

            setCandidateName(data.candidate_name);

            setRole(data.role);

        }

        catch (err) {

            console.error(err);

        }

        finally {

            setLoading(false);

        }

    }

    function nextQuestion() {

        if (currentQuestion < questions.length - 1) {

            setCurrentQuestion(prev => prev + 1);

        }

    }

    function previousQuestion() {

        if (currentQuestion > 0) {

            setCurrentQuestion(prev => prev - 1);

        }

    }

    function finishInterview() {

        navigate(`/interview/result/${candidateId}`);

    }

    function handleTimeUp() {

        if (currentQuestion < questions.length - 1) {

            setCurrentQuestion(prev => prev + 1);

        }

        else {

            finishInterview();

        }

    }

    function handleViolation(violation) {

        setViolations(prev => {

            const exists = prev.find(

                v =>
                    v.type === violation.type &&
                    v.message === violation.message

            );

            if (exists) return prev;

            const updated = [...prev, violation];

            const penalty = updated.length * 4;

            const behaviour =
                Math.max(40, 96 - penalty);

            setBehaviourScore(behaviour);

            const ai =
                Math.round(

                    (behaviour + voiceScore) / 2

                );

            setOverallAI(ai);

            if (behaviour >= 90)

                setInterviewStatus("Excellent");

            else if (behaviour >= 75)

                setInterviewStatus("Good");

            else

                setInterviewStatus("Warning");

            return updated;

        });

    }

    if (loading) {

        return (

            <Box
                sx={{
                    mt: 10,
                    display: "flex",
                    justifyContent: "center",
                }}
            >

                <CircularProgress />

            </Box>

        );

    }

    if (!questions.length) {

        return (

            <Typography>

                No interview questions available.

            </Typography>

        );

    }

    const progress =
        ((currentQuestion + 1) /
            questions.length) *
        100;

    const current =
        questions[currentQuestion] || {};

    return (

        <Box>

            <ProctorMonitor
                onViolation={handleViolation}
            />

            <Typography
                variant="h4"
                fontWeight={700}
                mb={1}
            >

                AI Interview

            </Typography>

            <Typography
                color="text.secondary"
                mb={3}
            >

                {candidateName}

            </Typography>

            <Stack
                direction="row"
                spacing={2}
                mb={3}
                flexWrap="wrap"
            >

                <Chip
                    icon={<PsychologyIcon />}
                    label={role}
                    color="primary"
                />

                <Chip
                    icon={<TimerIcon />}
                    color="warning"
                    label={`${Math.floor(seconds / 60)}m ${seconds % 60}s`}
                />

                <Chip
                    label={`Question ${currentQuestion + 1}/${questions.length}`}
                />

                <Chip
                    color={
                        violations.length
                            ? "error"
                            : "success"
                    }
                    label={`Violations : ${violations.length}`}
                />

            </Stack>

            <InterviewTimer
                key={timerKey}
                duration={120}
                onTimeUp={handleTimeUp}
            />

            <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                    height: 10,
                    borderRadius: 5,
                    mb: 4,
                }}
            />

            <Grid
                container
                spacing={3}
                mb={4}
            >
                                {/* ========================= */}
                {/* Left Side - Question */}
                {/* ========================= */}

                <Grid
                    item
                    xs={12}
                    md={7}
                >

                    <QuestionCard

    questionNumber={currentQuestion + 1}

    question={current.question}

    skill={current.skill}

    difficulty={current.difficulty}

/>
<Box mt={3}>

    <InterviewRecorder

        candidateId={candidateId}

        questionNumber={currentQuestion + 1}

        question={current.question}

        onUploaded={() => {

            console.log("Uploaded");

        }}

    />

</Box>

                </Grid>

                {/* ========================= */}
                {/* Right Side */}
                {/* ========================= */}

                <Grid
                    item
                    xs={12}
                    md={5}
                >

                    <Stack spacing={2}>

                        <WebcamMonitor
                            onViolation={handleViolation}
                        />

                        <VoiceAnalyzer
    onVoiceUpdate={(data) => {

        setVoiceEmotion(data.emotion);

        setVoiceScore(data.confidence);

        setOverallAI(
            Math.round(
                (behaviourScore + data.confidence) / 2
            )
        );

    }}
/>

                        <AILiveAnalysis

    faceStatus="Detected"

    eyeStatus="Looking Center"

    emotion="Happy"

    voiceEmotion={voiceEmotion}

    behaviourScore={behaviourScore}

    overallAI={overallAI}

    headDirection="Center"

/>

<ProctorStatus

    camera={true}

    microphone={true}

    browser={true}

    faces={1}

/>

                    </Stack>

                </Grid>

            </Grid>
                      {/* ====================================== */}
            {/* AI Dashboard */}
            {/* ====================================== */}

           <AIScoreDashboard

                behaviour={behaviourScore}

                voice={voiceScore}

                overall={overallAI}

            />

            

            {/* ====================================== */}
            {/* Proctor Violation Log */}
            {/* ====================================== */}

            {

                violations.length > 0 && (

                    <Paper
                        elevation={0}
                        sx={{
                            mt: 4,
                            p: 3,
                            borderRadius: 4,
                            border: "1px solid #FECACA",
                            background: "#FEF2F2",
                        }}
                    >

                        <Typography
                            variant="h6"
                            color="error"
                            mb={3}
                        >

                            Live Proctoring Events

                        </Typography>

                        <Stack spacing={2}>

                            {

                                violations.map((item, index) => (

                                    <Paper
                                        key={index}
                                        sx={{
                                            p: 2,
                                            borderRadius: 3,
                                            bgcolor: "#fff",
                                        }}
                                    >

                                        <Typography
                                            fontWeight={600}
                                        >

                                            {item.type}

                                        </Typography>

                                        <Typography
                                            color="text.secondary"
                                        >

                                            {item.message}

                                        </Typography>

                                    </Paper>

                                ))

                            }

                        </Stack>

                    </Paper>

                )

            }
                         {/* ====================================== */}
            {/* Navigation Buttons */}
            {/* ====================================== */}

            <Stack
                direction="row"
                spacing={2}
                mt={4}
                justifyContent="space-between"
            >

                <Button
                    variant="outlined"
                    size="large"
                    disabled={currentQuestion === 0}
                    onClick={previousQuestion}
                >

                    Previous Question

                </Button>

                {

                    currentQuestion === questions.length - 1 ?

                        (

                            <Button
                                variant="contained"
                                color="success"
                                size="large"
                                onClick={finishInterview}
                            >

                                Finish Interview

                            </Button>

                        )

                        :

                        (

                            <Button
                                variant="contained"
                                size="large"
                                onClick={nextQuestion}
                            >

                                Next Question

                            </Button>

                        )

                }

            </Stack>

        </Box>

    );

}