import {
    Paper,
    Typography,
    Stack,
    Chip,
    Divider,
} from "@mui/material";

import FaceIcon from "@mui/icons-material/Face";
import VisibilityIcon from "@mui/icons-material/Visibility";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";

export default function AILiveAnalysis({

    faceStatus,

    eyeStatus,

    emotion,

    voiceEmotion,

    behaviourScore,

    overallAI,

    headDirection,

}) {

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

                🤖 AI Live Analysis

            </Typography>

            <Stack spacing={2}>

                <Chip
                    icon={<FaceIcon />}
                    color="success"
                    label={`Face : ${faceStatus}`}
                />

                <Chip
                    icon={<VisibilityIcon />}
                    color="primary"
                    label={`Eyes : ${eyeStatus}`}
                />

                <Chip
                    icon={<SentimentSatisfiedAltIcon />}
                    color="secondary"
                    label={`Emotion : ${emotion}`}
                />

                <Chip
                    icon={<GraphicEqIcon />}
                    color="info"
                    label={`Voice : ${voiceEmotion}`}
                />

                <Chip
                    icon={<PsychologyAltIcon />}
                    color="warning"
                    label={`Head : ${headDirection}`}
                />

                <Divider />

                <Chip
                    icon={<MonitorHeartIcon />}
                    color="primary"
                    label={`Behaviour ${behaviourScore}%`}
                />

                <Chip
                    color="success"
                    label={`Overall AI ${overallAI}%`}
                />

            </Stack>

        </Paper>

    );

}