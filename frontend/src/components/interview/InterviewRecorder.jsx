import { useState, useRef } from "react";

import {
    Paper,
    Typography,
    Button,
    Stack,
    Alert,
    CircularProgress,
    Chip,
    Box,
    LinearProgress,
    Avatar,
    Divider,
} from "@mui/material";

import {
    Mic,
    Stop,
    Replay,
    CloudUpload,
    CheckCircle,
    PlayArrow,
    Delete,
} from "@mui/icons-material";

import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";

import { uploadInterviewAnswer } from "../../api/interviewApi";

export default function InterviewRecorder({

    candidateId,
    questionNumber,
    question,
    onUploaded,

}) {

    const [recording, setRecording] = useState(false);

    const [uploading, setUploading] = useState(false);

    const [uploaded, setUploaded] = useState(false);

    const [audioURL, setAudioURL] = useState("");

    const [error, setError] = useState("");

    const [seconds, setSeconds] = useState(0);

    const recorderRef = useRef(null);

    const chunksRef = useRef([]);

    const timerRef = useRef(null);

    function formatTime(sec) {

        const m = Math.floor(sec / 60);

        const s = sec % 60;

        return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;

    }

    async function startRecording() {

        setUploaded(false);

        setAudioURL("");

        setError("");

        try {

            const stream = await navigator.mediaDevices.getUserMedia({

                audio: true,

            });

            const recorder = new MediaRecorder(stream);

            recorderRef.current = recorder;

            chunksRef.current = [];

            recorder.ondataavailable = (event) => {

                if (event.data.size > 0) {

                    chunksRef.current.push(event.data);

                }

            };

            recorder.onstop = async () => {

                const blob = new Blob(chunksRef.current, {

                    type: "audio/webm",

                });

                setAudioURL(URL.createObjectURL(blob));

                try {

                    setUploading(true);

                    const formData = new FormData();

                    formData.append("candidate_id", candidateId);

                    formData.append("question_number", questionNumber);

                    formData.append("question", question);

                    formData.append("audio", blob, "answer.webm");

                    const response = await uploadInterviewAnswer(formData);

                    setUploaded(true);

                    onUploaded?.(response);

                }

                catch (err) {

                    console.error(err);

                    setError("Failed to upload answer.");

                }

                finally {

                    setUploading(false);

                    stream.getTracks().forEach(track => track.stop());

                }

            };

            recorder.start();

            setRecording(true);

            setSeconds(0);

            timerRef.current = setInterval(() => {

                setSeconds(prev => prev + 1);

            }, 1000);

        }

        catch (err) {

            console.error(err);

            setError(err.message);

        }

    }

    function stopRecording() {

        recorderRef.current?.stop();

        clearInterval(timerRef.current);

        setRecording(false);

    }

    function reRecord() {

        setAudioURL("");

        setUploaded(false);

        setSeconds(0);

    }

    return (

        <Paper

            elevation={0}

            sx={{

                mt: 3,

                p: 4,

                borderRadius: 5,

                border: "1px solid #E5E7EB",

                bgcolor: "#fff",

                "@keyframes pulse": {

                    "0%": {

                        transform: "scale(1)",

                        opacity: 1,

                    },

                    "50%": {

                        transform: "scale(1.15)",

                        opacity: .5,

                    },

                    "100%": {

                        transform: "scale(1)",

                        opacity: 1,

                    },

                },

            }}

        >

            {/* Header */}

            <Stack

                direction="row"

                justifyContent="space-between"

                alignItems="center"

                mb={3}

            >

                <Box>

                    <Typography

                        variant="h5"

                        fontWeight={700}

                    >

                        Record Your Answer

                    </Typography>

                    <Typography

                        color="text.secondary"

                    >

                        Speak clearly and confidently.

                    </Typography>

                </Box>

                <Chip

                    icon={<GraphicEqIcon />}

                    label="AI Voice Recording"

                    color="primary"

                />

            </Stack>

            <Divider sx={{ mb: 4 }} />

            {/* Recording Status */}

            <Stack

                direction="row"

                spacing={2}

                alignItems="center"

                justifyContent="center"

                mb={4}

            >

                <Avatar

                    sx={{

                        width: 70,

                        height: 70,

                        bgcolor: recording

                            ? "#ef4444"

                            : "#2563eb",

                        animation: recording

                            ? "pulse 1.2s infinite"

                            : "none",

                    }}

                >

                    {recording ?

                        <FiberManualRecordIcon sx={{ fontSize: 38 }} />

                        :

                        <Mic sx={{ fontSize: 38 }} />

                    }

                </Avatar>

                <Box>

                    <Typography

                        variant="h3"

                        fontWeight={700}

                    >

                        {formatTime(seconds)}

                    </Typography>

                    <Typography

                        color="text.secondary"

                    >

                        {recording ?

                            "Recording..."

                            :

                            "Ready to Record"}

                    </Typography>

                </Box>

            </Stack>

            {/* Voice Level */}

            {

                recording &&

                <Box mb={4}>

                    <Typography

                        mb={1}

                        fontWeight={600}

                    >

                        Voice Activity

                    </Typography>

                    <LinearProgress

                        sx={{

                            height: 10,

                            borderRadius: 20,

                        }}

                    />

                </Box>

            }

            {

                error &&

                <Alert

                    severity="error"

                    sx={{ mb: 3 }}

                >

                    {error}

                </Alert>

            }

            {

                uploaded &&

                <Alert

                    icon={<CheckCircle />}

                    severity="success"

                    sx={{ mb: 3 }}

                >

                    Answer uploaded successfully.

                </Alert>

            }

            {/* Buttons */}

            <Stack

                direction="row"

                spacing={2}

                flexWrap="wrap"

            >

                {

                    !recording ?

                        <Button

                            variant="contained"

                            size="large"

                            startIcon={<Mic />}

                            onClick={startRecording}

                            disabled={uploading}

                        >

                            Start Recording

                        </Button>

                        :

                        <Button

                            variant="contained"

                            color="error"

                            size="large"

                            startIcon={<Stop />}

                            onClick={stopRecording}

                        >

                            Stop Recording

                        </Button>

                }

                <Button

                    variant="outlined"

                    startIcon={<Replay />}

                    disabled={!audioURL}

                    onClick={reRecord}

                >

                    Re-record

                </Button>

                <Button

                    variant="outlined"

                    startIcon={<Delete />}

                    disabled={!audioURL}

                    color="error"

                    onClick={() => {

                        setAudioURL("");

                        setUploaded(false);

                    }}

                >

                    Delete

                </Button>

            </Stack>

            {/* Preview */}

            {

                audioURL &&

                <Paper

                    variant="outlined"

                    sx={{

                        mt: 4,

                        p: 3,

                        borderRadius: 3,

                    }}

                >

                    <Typography

                        fontWeight={700}

                        mb={2}

                    >

                        Recording Preview

                    </Typography>

                    <audio

                        controls

                        src={audioURL}

                        style={{

                            width: "100%",

                        }}

                    />

                </Paper>

            }

            {/* Upload */}

            {

                uploading &&

                <Stack

                    direction="row"

                    spacing={2}

                    alignItems="center"

                    mt={4}

                >

                    <CircularProgress size={24} />

                    <Box>

                        <Typography

                            fontWeight={600}

                        >

                            Uploading Recording...

                        </Typography>

                        <Typography

                            color="text.secondary"

                            variant="body2"

                        >

                            AI is processing your answer.

                        </Typography>

                    </Box>

                </Stack>

            }

        </Paper>

    );

}