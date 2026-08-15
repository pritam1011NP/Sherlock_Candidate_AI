import { useEffect, useState } from "react";

import {
    Box,
    Typography,
    Alert,
    CircularProgress,
} from "@mui/material";

import CandidateTable from "../../components/candidate/CandidateTable";
import { getCandidates } from "../../api/candidateApi";

export default function Candidates() {

    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchCandidates();
    }, []);

    const fetchCandidates = async () => {

        try {

            setLoading(true);

            const data = await getCandidates();

            setCandidates(data);

        } catch (err) {

            console.error(err);

            setError(
                "Failed to load candidate list."
            );

        } finally {

            setLoading(false);

        }

    };

    const bgStyles = (
        <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=JetBrains+Mono:wght@400;500&display=swap');

            @keyframes cd-scan {
                0% { transform: translateY(-10%); opacity: 0; }
                8% { opacity: 1; }
                92% { opacity: 1; }
                100% { transform: translateY(110%); opacity: 0; }
            }
            @keyframes cd-float {
                0% { transform: translateY(0) translateX(0); opacity: 0; }
                10% { opacity: 0.8; }
                90% { opacity: 0.6; }
                100% { transform: translateY(-140px) translateX(var(--drift, 12px)); opacity: 0; }
            }
            @keyframes cd-fadeUp {
                from { opacity: 0; transform: translateY(16px); }
                to { opacity: 1; transform: translateY(0); }
            }
            @keyframes cd-fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes cd-spin {
                to { transform: rotate(360deg); }
            }
            .cd-page {
                position: relative;
                min-height: 100%;
                margin: -24px;
                padding: 24px;
                background: radial-gradient(ellipse at 50% 0%, #16203a 0%, #0b0f1a 60%, #080b12 100%);
                overflow: hidden;
            }
            .cd-bg-layer {
                position: absolute;
                inset: 0;
                z-index: 0;
                overflow: hidden;
                pointer-events: none;
            }
            .cd-bg-grid {
                position: absolute;
                inset: -20%;
                background-image:
                    linear-gradient(rgba(201,162,39,0.08) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(201,162,39,0.08) 1px, transparent 1px);
                background-size: 46px 46px;
                mask-image: radial-gradient(ellipse 70% 55% at 50% 20%, black 0%, transparent 75%);
            }
            .cd-scanline {
                position: absolute;
                left: 0;
                right: 0;
                height: 140px;
                background: linear-gradient(
                    180deg,
                    transparent 0%,
                    rgba(201,162,39,0.10) 45%,
                    rgba(201,162,39,0.22) 50%,
                    rgba(201,162,39,0.10) 55%,
                    transparent 100%
                );
                animation: cd-scan 7s ease-in-out infinite;
            }
            .cd-mote {
                position: absolute;
                bottom: 0;
                width: 3px;
                height: 3px;
                border-radius: 50%;
                background: #D9B84A;
                box-shadow: 0 0 6px 1px rgba(201,162,39,0.7);
                animation: cd-float linear infinite;
            }
            .cd-content {
                position: relative;
                z-index: 1;
            }
            .cd-fade-up {
                animation: cd-fadeUp 0.55s cubic-bezier(0.2,0.8,0.2,1) both;
            }
            .cd-fade-in {
                animation: cd-fadeIn 0.4s ease both;
            }
            .cd-title {
                font-family: 'Playfair Display', serif;
                color: #F5F1E6;
            }
            .cd-eyebrow {
                font-family: 'JetBrains Mono', monospace;
                font-size: 11px;
                letter-spacing: 2px;
                text-transform: uppercase;
                color: #D9B84A;
                margin-bottom: 6px;
            }
            .cd-table-shell {
                border-radius: 16px;
                overflow: hidden;
                background: linear-gradient(180deg, #F7F2E7 0%, #F0E9D8 100%);
                border: 1px solid rgba(201,162,39,0.3);
                box-shadow: 0 20px 40px -18px rgba(0,0,0,0.55);
                position: relative;
            }
            .cd-table-shell::before {
                content: "";
                position: absolute;
                top: 0;
                left: 5%;
                right: 5%;
                height: 3px;
                background: linear-gradient(90deg, transparent, #C9A227, transparent);
                z-index: 1;
            }
            .cd-loading-spinner {
                width: 42px;
                height: 42px;
                border-radius: 50%;
                border: 3px solid rgba(201,162,39,0.25);
                border-top-color: #C9A227;
                animation: cd-spin 0.8s linear infinite;
            }
            @media (prefers-reduced-motion: reduce) {
                .cd-scanline, .cd-mote, .cd-fade-up, .cd-fade-in, .cd-loading-spinner {
                    animation: none !important;
                }
            }
        `}</style>
    );

    // A handful of drifting motes with randomized position/speed/delay,
    // generated once per render of this literal (cheap — only ~14 nodes).
    const motes = Array.from({ length: 14 }).map((_, i) => ({
        left: `${(i * 7.3) % 100}%`,
        duration: 9 + (i % 5) * 2,
        delay: -(i * 1.3),
        drift: `${(i % 2 === 0 ? 1 : -1) * (8 + (i % 4) * 6)}px`,
    }));

    return (

        <div className="cd-page">

            {bgStyles}

            <div className="cd-bg-layer">
                <div className="cd-bg-grid" />
                <div className="cd-scanline" />
                {motes.map((m, i) => (
                    <span
                        key={i}
                        className="cd-mote"
                        style={{
                            left: m.left,
                            animationDuration: `${m.duration}s`,
                            animationDelay: `${m.delay}s`,
                            "--drift": m.drift,
                        }}
                    />
                ))}
            </div>

            <Box className="cd-content" sx={{ width: "100%" }}>

                {/* Page Header */}

                <Box sx={{ mb: 3 }} className="cd-fade-up">
                    <div className="cd-eyebrow">Active Cases</div>
                    <Typography
                        variant="h4"
                        fontWeight={700}
                        className="cd-title"
                    >
                        Candidate Management
                    </Typography>
                </Box>

                {/* Error */}

                {error && (
                    <Alert
                        severity="error"
                        className="cd-fade-in"
                        sx={{ mb: 2 }}
                    >
                        {error}
                    </Alert>
                )}

                {/* Loading */}

                {loading ? (

                    <Box
                        className="cd-fade-in"
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 2,
                            mt: 8,
                        }}
                    >
                        <div className="cd-loading-spinner" />

                        <Typography
                            sx={{
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: 12,
                                letterSpacing: 1.5,
                                textTransform: "uppercase",
                                color: "rgba(245, 230, 230, 0.65)",
                            }}
                        >
                            Pulling case files...
                        </Typography>
                    </Box>

                ) : (

                    <Box className="cd-table-shell cd-fade-up" sx={{ animationDelay: "0.1s" }}>
                        <CandidateTable
                            rows={candidates}
                            loading={loading}
                        />
                    </Box>

                )}

            </Box>

        </div>

    );

}