import { useEffect, useRef, useState } from "react";

import {
    Paper,
    Typography,
    Box,
    Chip,
    LinearProgress,
} from "@mui/material";

import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import SyncIcon from "@mui/icons-material/Sync";

import {
    loadLipSyncModel,
    detectLipMovement,
} from "../../utils/lipsync";

export default function LipSyncMonitor({

    videoRef,

    recording,

    onViolation,

}) {

    const [micLevel, setMicLevel] = useState(0);

    const [lipMovement, setLipMovement] = useState(0);

    const [syncScore, setSyncScore] = useState(100);

    const [status, setStatus] = useState("Loading AI...");

    const analyserRef = useRef(null);

    const audioContextRef = useRef(null);

    const dataArrayRef = useRef(null);

    const streamRef = useRef(null);

    const lastViolation = useRef(0);

    useEffect(() => {

        initialize();

        return () => {

            if (audioContextRef.current) {

                audioContextRef.current.close();

            }

            if (streamRef.current) {

                streamRef.current
                    .getTracks()
                    .forEach(track => track.stop());

            }

        };

    }, []);

    async function initialize() {

        try {

            await loadLipSyncModel();

            setStatus("Waiting");

        }

        catch (err) {

            console.error(err);

            setStatus("Model Error");

        }

    }

    useEffect(() => {

        if (!recording) return;

        startAudio();

    }, [recording]);

    async function startAudio() {

        try {

            const stream =
                await navigator.mediaDevices.getUserMedia({

                    audio: true,

                });

            streamRef.current = stream;

            const AudioContext =
                window.AudioContext ||
                window.webkitAudioContext;

            const context = new AudioContext();

            const analyser = context.createAnalyser();

            analyser.fftSize = 256;

            const source =
                context.createMediaStreamSource(stream);

            source.connect(analyser);

            const bufferLength =
                analyser.frequencyBinCount;

            const dataArray =
                new Uint8Array(bufferLength);

            analyserRef.current = analyser;

            audioContextRef.current = context;

            dataArrayRef.current = dataArray;

        }

        catch (err) {

            console.error(err);

            setStatus("Microphone Error");

        }

    }

    useEffect(() => {

        if (!recording) return;

        const interval = setInterval(async () => {

            await updateLipSync();

        }, 500);

        return () => clearInterval(interval);

    }, [recording]);

    async function updateLipSync() {

        if (!analyserRef.current) return;

        if (!videoRef?.current) return;

        analyserRef.current.getByteFrequencyData(
            dataArrayRef.current
        );

        let total = 0;

        for (let i = 0; i < dataArrayRef.current.length; i++) {

            total += dataArrayRef.current[i];

        }

        const audioLevel = Math.round(

            total / dataArrayRef.current.length

        );

        setMicLevel(audioLevel);

        const movement =
            await detectLipMovement(videoRef.current);

        if (!movement) {

            setStatus("No Face");

            return;

        }

        const lips = Math.min(
            100,
            Math.round(movement.openness)
        );

        setLipMovement(lips);

        let score =
            100 -
            Math.abs(lips - audioLevel);

        score = Math.max(0, Math.min(score, 100));

        setSyncScore(score);

        if (score >= 85) {

            setStatus("Excellent Sync");

        }

        else if (score >= 65) {

            setStatus("Normal");

        }

        else {

            setStatus("Possible Fake Video");

            const now = Date.now();

            if (now - lastViolation.current > 5000) {

                lastViolation.current = now;

                onViolation?.({

                    type: "LIPSYNC",

                    message:
                        "Lip movement does not match microphone activity.",

                    timestamp: new Date().toISOString(),

                });

            }

        }

    }

    return (

        <Paper
            sx={{
                p: 3,
                borderRadius: 4,
            }}
        >

            <Typography
                variant="h6"
                fontWeight={700}
                mb={3}
            >
                AI Lip Sync Monitor
            </Typography>

            <Box mb={3}>

                <Typography gutterBottom>
                    Microphone Activity
                </Typography>

                <LinearProgress
                    variant="determinate"
                    value={micLevel}
                    sx={{
                        height: 12,
                        borderRadius: 20,
                    }}
                />

                <Typography mt={1}>
                    {micLevel}%
                </Typography>

            </Box>

            <Box mb={3}>

                <Typography gutterBottom>
                    Lip Movement
                </Typography>

                <LinearProgress
                    variant="determinate"
                    value={lipMovement}
                    sx={{
                        height: 12,
                        borderRadius: 20,
                    }}
                />

                <Typography mt={1}>
                    {lipMovement}%
                </Typography>

            </Box>

            <Box mb={3}>

                <Typography gutterBottom>
                    Lip Sync Score
                </Typography>

                <LinearProgress
                    variant="determinate"
                    value={syncScore}
                    sx={{
                        height: 14,
                        borderRadius: 20,
                    }}
                />

                <Typography mt={1}>
                    {syncScore}%
                </Typography>

            </Box>

            <Box
                display="flex"
                gap={2}
                flexWrap="wrap"
            >

                <Chip
                    icon={<GraphicEqIcon />}
                    label={`Mic ${micLevel}%`}
                    color="primary"
                />

                <Chip
                    icon={<RecordVoiceOverIcon />}
                    label={`Lip ${lipMovement}%`}
                    color="secondary"
                />

                <Chip
                    icon={<SyncIcon />}
                    label={status}
                    color={
                        syncScore >= 85
                            ? "success"
                            : syncScore >= 65
                            ? "warning"
                            : "error"
                    }
                />

            </Box>

        </Paper>

    );

}