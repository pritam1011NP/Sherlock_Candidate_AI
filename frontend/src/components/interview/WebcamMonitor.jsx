import { useEffect, useRef, useState } from "react";

import {
    Paper,
    Typography,
    Box,
    Chip,
    LinearProgress,
} from "@mui/material";

import VideocamIcon from "@mui/icons-material/Videocam";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import FaceIcon from "@mui/icons-material/Face";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";

import {
    loadModels,
    detectFaces,
} from "../../utils/faceDetection";
import {
    estimateHeadPose,
} from "../../utils/headPose";

import { loadEyeTracker } from "../../utils/eyeTracking";

export default function WebcamMonitor({ onViolation }) {

    const videoRef = useRef(null);

    const [cameraReady, setCameraReady] = useState(false);

    const [status, setStatus] = useState("Loading AI...");

    const [confidence, setConfidence] = useState(100);

    const [eyeStatus, setEyeStatus] =
        useState("Looking Center");

    const [emotion, setEmotion] =
        useState("Neutral");

    const [headDirection, setHeadDirection] =
    useState("Center");

    const [emotionStats, setEmotionStats] = useState({
        happy: 0,
        neutral: 0,
        sad: 0,
        angry: 0,
        fearful: 0,
        surprised: 0,
        disgusted: 0,
    });

    useEffect(() => {

        initializeCamera();

    }, []);

    async function initializeCamera() {

        try {

            await loadModels();

            await loadEyeTracker();

            const stream =
                await navigator.mediaDevices.getUserMedia({

                    video: true,

                    audio: false,

                });

            videoRef.current.srcObject = stream;

            setCameraReady(true);

            setStatus("Monitoring");

        }

        catch (err) {

            console.error(err);

            setStatus("Camera Not Available");

        }

    }

    useEffect(() => {

        if (!cameraReady) return;

        const interval = setInterval(async () => {

            if (!videoRef.current) return;

            if (videoRef.current.readyState !== 4) return;

            const faces =
                await detectFaces(videoRef.current);

            if (faces.length === 0) {

                setStatus("No Face");

                setConfidence(0);

                setEyeStatus("Unknown");

                onViolation?.({

                    type: "NO_FACE",

                    message: "No face detected",

                });

                return;

            }

            if (faces.length > 1) {

                setStatus("Multiple Faces");

                setConfidence(60);

                setEyeStatus("Unknown");

                onViolation?.({

                    type: "MULTIPLE_FACE",

                    message: "Multiple faces detected",

                });

                return;

            }

            const face = faces[0];

            setStatus("Face Detected");

            const score = Math.round(
    (face.detection.score || 1) * 100
);

setConfidence(score);

// ======================
// Head Pose Detection
// ======================

const direction = estimateHeadPose(face);

setHeadDirection(direction);

if (direction !== "Center") {

    onViolation?.({

        type: "HEAD_POSE",

        message: `Candidate looking ${direction}`,

    });

}

            // ======================
            // Emotion Detection
            // ======================

            if (face.expressions) {

                const dominant =
                    Object.entries(face.expressions)
                        .sort((a, b) => b[1] - a[1])[0][0];

                setEmotion(dominant);

                setEmotionStats(prev => ({

                    ...prev,

                    [dominant]:
                        prev[dominant] + 1,

                }));

                if (
                    dominant === "angry" ||
                    dominant === "fearful"
                ) {

                    onViolation?.({

                        type: "EMOTION",

                        message:
                            `Detected emotion : ${dominant}`,

                    });

                }

            }

            // ======================
            // Eye Direction
            // ======================

            const box = face.detection.box;

            const centerX =
                box.x + box.width / 2;

            const videoWidth =
                videoRef.current.videoWidth;

            if (centerX < videoWidth * 0.35) {

                setEyeStatus("Looking Left");

                onViolation?.({

                    type: "LOOK_LEFT",

                    message:
                        "Candidate looking left",

                });

            }

            else if (centerX > videoWidth * 0.65) {

                setEyeStatus("Looking Right");

                onViolation?.({

                    type: "LOOK_RIGHT",

                    message:
                        "Candidate looking right",

                });

            }

            else {

                setEyeStatus("Looking Center");

            }

        }, 1000);

        return () => clearInterval(interval);

    }, [cameraReady, onViolation]);

    return (

        <Paper
            sx={{
                p: 3,
                borderRadius: 4,
            }}
        >

            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
            >

                <Typography
                    variant="h6"
                    fontWeight={700}
                >
                    Live Camera
                </Typography>

                <Chip
                    color={
                        status === "Face Detected"
                            ? "success"
                            : status === "Monitoring"
                            ? "primary"
                            : "error"
                    }
                    label={status}
                />

            </Box>

            <Box
                sx={{
                    borderRadius: 3,
                    overflow: "hidden",
                    bgcolor: "#000",
                }}
            >

                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    style={{
                        width: "100%",
                        height: 420,
                        objectFit: "cover",
                    }}
                />

            </Box>

            <Box mt={3}>

                <Typography gutterBottom>

                    AI Face Confidence

                </Typography>

                <LinearProgress
                    variant="determinate"
                    value={confidence}
                    sx={{
                        height: 12,
                        borderRadius: 20,
                    }}
                />

                <Typography mt={1}>

                    {confidence}%

                </Typography>

            </Box>

            <Box
                mt={3}
                display="flex"
                gap={2}
                flexWrap="wrap"
            >   <Chip
                    icon={<FaceIcon />}
                    color={
                        headDirection === "Center"
                            ? "success"
                            : "warning"
                    }
                    label={`Head : ${headDirection}`}
                />

                <Chip
                    icon={<VideocamIcon />}
                    color={
                        cameraReady
                            ? "success"
                            : "error"
                    }
                    label={
                        cameraReady
                            ? "Camera Active"
                            : "Camera Offline"
                    }
                />

                <Chip
                    icon={<FaceIcon />}
                    color={
                        status === "Face Detected"
                            ? "primary"
                            : "warning"
                    }
                    label={status}
                />

                <Chip
                    icon={<VisibilityIcon />}
                    color={
                        eyeStatus === "Looking Center"
                            ? "success"
                            : "warning"
                    }
                    label={eyeStatus}
                />

                <Chip
                    icon={<SentimentSatisfiedAltIcon />}
                    color={
                        emotion === "happy"
                            ? "success"
                            : emotion === "neutral"
                            ? "primary"
                            : emotion === "surprised"
                            ? "warning"
                            : "error"
                    }
                    label={`Emotion : ${emotion}`}
                />

                <Chip
                    icon={<WarningAmberIcon />}
                    color="warning"
                    label="AI Monitoring Enabled"
                />

            </Box>

        </Paper>

    );

}