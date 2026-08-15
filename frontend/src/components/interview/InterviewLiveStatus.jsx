import { useEffect, useState } from "react";

import {
    Paper,
    Typography,
    Box,
    Grid,
    LinearProgress,
    Chip,
    CircularProgress,
} from "@mui/material";

import VideocamIcon from "@mui/icons-material/Videocam";
import FaceIcon from "@mui/icons-material/Face";
import MicIcon from "@mui/icons-material/Mic";
import PsychologyIcon from "@mui/icons-material/Psychology";

import { getInterviewStatus } from "../../api/interviewApi";

export default function InterviewLiveStatus() {

    const [loading, setLoading] = useState(true);

    const [status, setStatus] = useState(null);

    useEffect(() => {

        load();

        const interval = setInterval(load, 3000);

        return () => clearInterval(interval);

    }, []);

    async function load() {

        try {

            const data = await getInterviewStatus();

            setStatus(data);

        }

        catch {

        }

        finally {

            setLoading(false);

        }

    }

    if (loading) {

        return (

            <Paper sx={{ p:4,borderRadius:4 }}>

                <Box
                    display="flex"
                    justifyContent="center"
                >

                    <CircularProgress/>

                </Box>

            </Paper>

        );

    }

    if(!status){

        return (

            <Paper sx={{p:4}}>

                No Interview Running

            </Paper>

        );

    }

    return (

        <Paper
            sx={{
                p:4,
                borderRadius:4,
            }}
        >

            <Typography
                variant="h5"
                fontWeight={700}
                mb={3}
            >

                Live AI Interview

            </Typography>

            <Grid
                container
                spacing={3}
            >

                <Grid item xs={6}>

                    <Chip
                        icon={<VideocamIcon/>}
                        label={status.camera}
                        color="success"
                    />

                </Grid>

                <Grid item xs={6}>

                    <Chip
                        icon={<MicIcon/>}
                        label={status.microphone}
                        color="primary"
                    />

                </Grid>

                <Grid item xs={6}>

                    <Chip
                        icon={<FaceIcon/>}
                        label={status.face}
                        color="success"
                    />

                </Grid>

                <Grid item xs={6}>

                    <Chip
                        icon={<PsychologyIcon/>}
                        label={status.emotion}
                        color="secondary"
                    />

                </Grid>

            </Grid>

            <Box mt={4}>

                <Typography gutterBottom>

                    Confidence

                </Typography>

                <LinearProgress
                    variant="determinate"
                    value={status.confidence}
                    sx={{
                        height:12,
                        borderRadius:10,
                    }}
                />

                <Typography mt={1}>

                    {status.confidence}%

                </Typography>

            </Box>

        </Paper>

    );

}