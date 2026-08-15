import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
    Box,
    Typography,
    CircularProgress,
    Alert,
    
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { getInterviewQuestions } from "../../api/interviewApi";

import CandidateInterviewCard from "../../components/interview/CandidateInterviewCard";
import InterviewQuestionList from "../../components/interview/InterviewQuestionList";

export default function InterviewQuestions() {

    const { id } = useParams();

    const [data, setData] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        loadQuestions();

    }, [id]);

    async function loadQuestions() {

        try {

            setLoading(true);

            const response = await getInterviewQuestions(id);

            setData(response);

        }

        catch (err) {

            console.error(err);

            setError("Unable to load interview questions.");

        }

        finally {

            setLoading(false);

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

    return (

        <Box>

            <Typography
                variant="h4"
                fontWeight={700}
                mb={3}
            >
                AI Interview Questions
            </Typography>

            <Grid container spacing={3}>

                <Grid size={{ xs: 12, md: 4 }}>

                    <CandidateInterviewCard
                        data={data}
                    />

                </Grid>

                <Grid size={{ xs: 12, md: 8 }}>

                    <InterviewQuestionList
                        questions={data.questions}
                    />

                </Grid>

            </Grid>

        </Box>

    );

}