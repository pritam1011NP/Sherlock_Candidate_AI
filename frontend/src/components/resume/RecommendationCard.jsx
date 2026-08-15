import { useState } from "react";

import {
    Paper,
    Typography,
    Box,
    Chip,
    Divider,
    Stack,
    Button,
    LinearProgress,
    Snackbar,
    Alert,
} from "@mui/material";

import {
    CheckCircle,
    Cancel,
    Psychology,
    ThumbUp,
    Event,
    PauseCircle,
    Close,
} from "@mui/icons-material";

import StatusChip from "../common/StatusChip";
import { updateCandidateStatus } from "../../api/candidateApi";

export default function RecommendationCard({ analysis }) {

    const [loading, setLoading] = useState("");

    const [success, setSuccess] = useState("");

    const [error, setError] = useState("");

    const [status, setStatus] = useState(
        analysis.status || "Pending"
    );

    const score = analysis.overall_score;

    let color = "#16A34A";

    if (score < 70) color = "#F59E0B";

    if (score < 50) color = "#DC2626";

    async function changeStatus(newStatus) {

        try {

            setLoading(newStatus);

            await updateCandidateStatus(

                analysis.candidate_id,

                newStatus

            );

            setStatus(newStatus);

            setSuccess(`Candidate marked as ${newStatus}`);

        }

        catch {

            setError("Failed to update candidate.");

        }

        finally {

            setLoading("");

        }

    }

    return (

        <Paper

            elevation={0}

            sx={{

                borderRadius:4,

                border:"1px solid #E5E7EB",

                p:4,

            }}

        >

            {/* Header */}

            <Stack

                direction="row"

                justifyContent="space-between"

                alignItems="center"

                mb={3}

            >

                <Stack

                    direction="row"

                    spacing={1}

                    alignItems="center"

                >

                    <Psychology color="primary"/>

                    <Typography

                        variant="h5"

                        fontWeight={700}

                    >

                        AI Hiring Decision

                    </Typography>

                </Stack>

                <StatusChip status={status}/>

            </Stack>

            {/* Recommendation */}

            <Box

                sx={{

                    bgcolor:color,

                    color:"#fff",

                    borderRadius:3,

                    p:3,

                    mb:3,

                }}

            >

                <Typography variant="h6">

                    Recommendation

                </Typography>

                <Typography

                    variant="h3"

                    fontWeight={700}

                >

                    {analysis.recommendation}

                </Typography>

                <Typography>

                    Confidence : {analysis.confidence}%

                </Typography>

            </Box>

            {/* Score */}

            <Typography

                fontWeight={700}

                mb={1}

            >

                Resume Match Score

            </Typography>

            <LinearProgress

                variant="determinate"

                value={score}

                sx={{

                    height:12,

                    borderRadius:10,

                    mb:1,

                    "& .MuiLinearProgress-bar":{

                        backgroundColor:color,

                    },

                }}

            />

            <Typography

                color="text.secondary"

                mb={4}

            >

                {score}% Resume Match

            </Typography>

            <Divider sx={{mb:4}}/>

            {/* Strengths */}

            <Typography

                variant="h6"

                fontWeight={700}

                mb={2}

            >

                Candidate Strengths

            </Typography>

            <Stack spacing={1.5} mb={4}>

                {analysis.strengths.map(item=>(

                    <Paper

                        key={item}

                        variant="outlined"

                        sx={{

                            p:1.5,

                            borderRadius:2,

                            display:"flex",

                            alignItems:"center",

                            gap:1,

                            borderColor:"#DCFCE7",

                            bgcolor:"#F0FDF4",

                        }}

                    >

                        <CheckCircle

                            sx={{

                                color:"#16A34A"

                            }}

                        />

                        <Typography>

                            {item}

                        </Typography>

                    </Paper>

                ))}

            </Stack>

            {/* Weakness */}

            <Typography

                variant="h6"

                fontWeight={700}

                mb={2}

            >

                Missing Skills / Weaknesses

            </Typography>

            <Stack spacing={1.5} mb={4}>

                {analysis.weaknesses.map(item=>(

                    <Paper

                        key={item}

                        variant="outlined"

                        sx={{

                            p:1.5,

                            borderRadius:2,

                            display:"flex",

                            gap:1,

                            alignItems:"center",

                            bgcolor:"#FEF2F2",

                            borderColor:"#FECACA",

                        }}

                    >

                        <Cancel

                            sx={{

                                color:"#DC2626"

                            }}

                        />

                        <Typography>

                            {item}

                        </Typography>

                    </Paper>

                ))}

            </Stack>

            <Divider sx={{mb:3}}/>

            <Typography

                variant="h6"

                fontWeight={700}

                mb={2}

            >

                Recruiter Actions

            </Typography>

            <Stack spacing={2}>

                <Button

                    variant="contained"

                    color="success"

                    size="large"

                    startIcon={<ThumbUp/>}

                    disabled={loading!==""}

                    onClick={()=>changeStatus("Shortlisted")}

                >

                    {loading==="Shortlisted"

                        ? "Updating..."

                        :"Shortlist"}

                </Button>

                <Button

                    variant="contained"

                    color="primary"

                    size="large"

                    startIcon={<Event/>}

                    disabled={loading!==""}

                    onClick={()=>changeStatus("Interview Scheduled")}

                >

                    {loading==="Interview Scheduled"

                        ?"Updating..."

                        :"Schedule Interview"}

                </Button>

                <Button

                    variant="outlined"

                    color="warning"

                    size="large"

                    startIcon={<PauseCircle/>}

                    disabled={loading!==""}

                    onClick={()=>changeStatus("Hold")}

                >

                    {loading==="Hold"

                        ?"Updating..."

                        :"Put On Hold"}

                </Button>

                <Button

                    variant="outlined"

                    color="error"

                    size="large"

                    startIcon={<Close/>}

                    disabled={loading!==""}

                    onClick={()=>changeStatus("Rejected")}

                >

                    {loading==="Rejected"

                        ?"Updating..."

                        :"Reject Candidate"}

                </Button>

            </Stack>

            <Snackbar

                open={Boolean(success)}

                autoHideDuration={3000}

                onClose={()=>setSuccess("")}

            >

                <Alert

                    severity="success"

                    variant="filled"

                >

                    {success}

                </Alert>

            </Snackbar>

            <Snackbar

                open={Boolean(error)}

                autoHideDuration={3000}

                onClose={()=>setError("")}

            >

                <Alert

                    severity="error"

                    variant="filled"

                >

                    {error}

                </Alert>

            </Snackbar>

        </Paper>

    );

}