import { useEffect, useRef, useState } from "react";

import {
    Paper,
    Typography,
    Box,
    Chip,
    LinearProgress,
} from "@mui/material";

import MicIcon from "@mui/icons-material/Mic";
import MoodIcon from "@mui/icons-material/Mood";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";

export default function VoiceEmotionMonitor({

    recording,
    onEmotion,

}) {

    const analyserRef = useRef(null);

    const dataArrayRef = useRef(null);

    const [energy, setEnergy] = useState(0);

    const [emotion, setEmotion] =
        useState("Waiting");

    useEffect(() => {

        if (!recording) return;

        initialize();

    }, [recording]);

    async function initialize() {

        try {

            const stream =
                await navigator.mediaDevices.getUserMedia({

                    audio: true,

                });

            const AudioContext =
                window.AudioContext ||
                window.webkitAudioContext;

            const context =
                new AudioContext();

            const analyser =
                context.createAnalyser();

            analyser.fftSize = 512;

            const source =
                context.createMediaStreamSource(stream);

            source.connect(analyser);

            analyserRef.current = analyser;

            dataArrayRef.current =
                new Uint8Array(
                    analyser.frequencyBinCount
                );

        }

        catch (err) {

            console.log(err);

        }

    }

    useEffect(() => {

        if (!recording) return;

        const interval = setInterval(() => {

            analyseVoice();

        },300);

        return ()=>clearInterval(interval);

    },[recording]);

    function analyseVoice(){

        if(!analyserRef.current) return;

        analyserRef.current.getByteFrequencyData(
            dataArrayRef.current
        );

        let sum=0;

        for(let i=0;i<dataArrayRef.current.length;i++){

            sum+=dataArrayRef.current[i];

        }

        const avg=Math.round(

            sum/dataArrayRef.current.length

        );

        setEnergy(avg);

        let detected="Neutral";

        if(avg<15)

            detected="Silent";

        else if(avg<35)

            detected="Calm";

        else if(avg<60)

            detected="Confident";

        else if(avg<90)

            detected="Excited";

        else

            detected="Nervous";

        setEmotion(detected);

        onEmotion?.(detected);

    }

    return(

        <Paper
            sx={{
                p:3,
                borderRadius:4,
            }}
        >

            <Typography
                variant="h6"
                fontWeight={700}
                mb={2}
            >
                Voice Emotion
            </Typography>

            <Typography gutterBottom>

                Voice Energy

            </Typography>

            <LinearProgress

                variant="determinate"

                value={Math.min(100,energy)}

                sx={{
                    height:12,
                    borderRadius:20,
                }}

            />

            <Box mt={3}
                 display="flex"
                 gap={2}
                 flexWrap="wrap">

                <Chip

                    icon={<MicIcon/>}

                    label={`Energy ${energy}`}

                    color="primary"

                />

                <Chip

                    icon={<GraphicEqIcon/>}

                    label="Voice AI"

                    color="secondary"

                />

                <Chip

                    icon={<MoodIcon/>}

                    label={emotion}

                    color={
                        emotion==="Confident"
                            ?"success"
                            :emotion==="Calm"
                            ?"primary"
                            :emotion==="Excited"
                            ?"warning"
                            :"error"
                    }

                />

            </Box>

        </Paper>

    );

}