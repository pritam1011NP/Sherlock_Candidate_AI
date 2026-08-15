import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
    Box,
    Button,
    CircularProgress,
    Alert,
    Stack,
} from "@mui/material";

import {
    ArrowBack,
    Analytics,
    Edit,
} from "@mui/icons-material";

import { getCandidate } from "../../api/candidateApi";

import CandidateProfile from "../../components/candidate/CandidateProfile";
import ResumeCard from "../../components/candidate/ResumeCard";
import CandidateActions from "../../components/candidate/CandidateActions";

export default function CandidateDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [candidate, setCandidate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadCandidate();
    }, [id]);

    async function loadCandidate() {

        try {

            setLoading(true);

            const data = await getCandidate(id);

            setCandidate(data);

        } catch (err) {

            console.error(err);

            setError("Unable to load candidate details.");

        } finally {

            setLoading(false);

        }

    }

    if (loading) {

        return (

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "70vh",
                }}
            >
                <CircularProgress />
            </Box>

        );

    }

    if (error) {

        return (
            <Alert severity="error">
                {error}
            </Alert>
        );

    }

    if (!candidate) {

        return (
            <Alert severity="warning">
                Candidate not found.
            </Alert>
        );

    }

    return (

        <Box>

            <Stack
                direction="row"
                spacing={2}
                mb={3}
            >

                <Button
                    variant="outlined"
                    startIcon={<ArrowBack />}
                    onClick={() => navigate("/candidates")}
                >
                    Back
                </Button>

                <Button
                    variant="contained"
                    color="warning"
                    startIcon={<Edit />}
                    onClick={() =>
                        navigate(`/candidates/edit/${candidate.id}`)
                    }
                >
                    Edit Candidate
                </Button>

                <Button
                    variant="contained"
                    color="success"
                    startIcon={<Analytics />}
                    onClick={() =>
                        navigate(`/resume-analysis/${candidate.id}`)
                    }
                >
                    Analyze Resume
                </Button>
                <Button
                    variant="contained"
                    color="success"
                    sx={{ ml: 2 }}
                    onClick={() =>
                    navigate(`/interview/${candidate.id}`)
                    }
                >
                    Start AI Interview
                </Button>

            </Stack>

            <CandidateProfile
                candidate={candidate}
            />

            <Box mt={3}>
                <ResumeCard
                    candidate={candidate}
                />
            </Box>

            <Box mt={3}>
                <CandidateActions
                    candidate={candidate}
                />
            </Box>

        </Box>

    );

}