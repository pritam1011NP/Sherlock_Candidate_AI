import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
    Box,
    Grid,
    CircularProgress,
    Alert,
    Typography,
    Paper,
} from "@mui/material";

import {
    Psychology,
    Description,
    Work,
    Folder,
} from "@mui/icons-material";

import { getResumeAnalysis } from "../../api/resumeApi";

import CandidateSummary from "../../components/resume/CandidateSummary";
import RecommendationCard from "../../components/resume/RecommendationCard";
import SkillsCard from "../../components/resume/SkillsCard";
import ResumePreview from "../../components/resume/ResumePreview";
import ResumeTextViewer from "../../components/resume/ResumeTextViewer";
import DashboardCard from "../../components/dashboard/DashboardCard";
import ScoreGauge from "../../components/resume/ScoreGauge";
export default function ResumeAnalysis() {

    const { id } = useParams();

    const [analysis, setAnalysis] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        loadAnalysis();

    }, [id]);

    async function loadAnalysis() {

        try {

            setLoading(true);

            const data = await getResumeAnalysis(id);

            setAnalysis(data);

        }

        catch {

            setError("Unable to load Resume Analysis");

        }

        finally {

            setLoading(false);

        }

    }

    if (loading)

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

    if (error)

        return (

            <Alert severity="error">

                {error}

            </Alert>

        );

    return (

        <Box>

            <Typography
                variant="h4"
                fontWeight={700}
                mb={3}
            >

                AI Resume Analysis

            </Typography>

            {/* KPI Cards */}

            <Grid container spacing={3} mb={3}>

                <Grid item xs={12} sm={6} md={3}>

                    <ScoreGauge

                        title="Resume Score"

                        value={analysis.overall_score}

                        color="#2563EB"

                    />

                </Grid>

                <Grid item xs={12} sm={6} md={3}>

                    <ScoreGauge

                        title="AI Confidence"

                        value={analysis.confidence}

                        color="#16A34A"

                    />
                    

                </Grid>

                <Grid item xs={12} sm={6} md={3}>

                    <DashboardCard
                        title="Experience"
                        value={analysis.experience}
                        subtitle="Years"
                        icon={<Work />}
                        color="#EA580C"
                    />

                </Grid>

                <Grid item xs={12} sm={6} md={3}>

                    <DashboardCard
                        title="Projects"
                        value={analysis.projects}
                        subtitle="Completed"
                        icon={<Folder />}
                        color="#7C3AED"
                    />

                </Grid>

            </Grid>

            {/* Candidate */}

            <Box mb={3}>

                <CandidateSummary
                    analysis={analysis}
                />

            </Box>

            {/* Skills */}

            <Grid container spacing={3} mb={3}>

                <Grid item xs={12} md={6}>

                    <SkillsCard
                        title="✓ Detected Skills"
                        skills={analysis.skills}
                        color="success"
                    />

                </Grid>

                <Grid item xs={12} md={6}>

                    <SkillsCard
                        title="⚠ Missing Skills"
                        skills={analysis.weaknesses}
                        color="warning"
                    />

                </Grid>

            </Grid>

            {/* Recommendation + Resume */}

            <Grid container spacing={3} mb={3}>

                <Grid item xs={12} lg={5}>

                    <RecommendationCard
                        analysis={analysis}
                    />

                </Grid>

                <Grid item xs={12} lg={7}>

                    <ResumePreview
                        analysis={analysis}
                    />

                </Grid>

            </Grid>

            {/* Resume Text */}

            <Paper
                elevation={0}
                sx={{
                    borderRadius:4,
                    border:"1px solid #e5e7eb",
                }}
            >

                <ResumeTextViewer
                    analysis={analysis}
                />

            </Paper>

        </Box>

    );

}