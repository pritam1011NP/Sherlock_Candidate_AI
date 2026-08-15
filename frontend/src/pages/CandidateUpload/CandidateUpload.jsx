import {
    Box,
    Typography,
    Paper,
} from "@mui/material";

import CandidateForm from "../../components/candidate/CandidateForm";

export default function CandidateUpload() {

    const bgStyles = (
        <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=JetBrains+Mono:wght@400;500&display=swap');

            @keyframes cu-sweep {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            @keyframes cu-drift {
                0%, 100% { transform: translate(0, 0); }
                50% { transform: translate(24px, -18px); }
            }
            @keyframes cu-fadeUp {
                from { opacity: 0; transform: translateY(16px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .cu-page {
                position: relative;
                min-height: 100%;
                margin: -24px;
                padding: 24px;
                background: radial-gradient(ellipse at 50% 0%, #16203a 0%, #0b0f1a 60%, #080b12 100%);
                overflow: hidden;
            }
            .cu-bg-layer {
                position: absolute;
                inset: 0;
                z-index: 0;
                overflow: hidden;
                pointer-events: none;
            }
            .cu-bg-grid {
                position: absolute;
                inset: -20%;
                background-image:
                    linear-gradient(rgba(201,162,39,0.08) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(201,162,39,0.08) 1px, transparent 1px);
                background-size: 46px 46px;
                mask-image: radial-gradient(ellipse 65% 45% at 30% 0%, black 0%, transparent 70%);
            }
            .cu-bg-sweep {
                position: absolute;
                top: -400px;
                left: -300px;
                width: 900px;
                height: 900px;
                background: conic-gradient(from 0deg, rgba(201,162,39,0.14), transparent 20%, transparent 100%);
                animation: cu-sweep 22s linear infinite;
            }
            .cu-bg-blob {
                position: absolute;
                border-radius: 50%;
                filter: blur(70px);
                opacity: 0.25;
                animation: cu-drift 11s ease-in-out infinite;
            }
            .cu-blob-1 {
                width: 300px;
                height: 300px;
                top: -70px;
                right: 10%;
                background: radial-gradient(circle, #C9A227 0%, transparent 70%);
            }
            .cu-blob-2 {
                width: 240px;
                height: 240px;
                bottom: 8%;
                left: 6%;
                background: radial-gradient(circle, #2D9CDB 0%, transparent 70%);
                animation-duration: 14s;
                animation-delay: 1.2s;
            }
            .cu-content {
                position: relative;
                z-index: 1;
            }
            .cu-fade-up {
                animation: cu-fadeUp 0.55s cubic-bezier(0.2,0.8,0.2,1) both;
            }
            .cu-title {
                font-family: 'Playfair Display', serif;
                color: #F5F1E6;
            }
            .cu-eyebrow {
                font-family: 'JetBrains Mono', monospace;
                font-size: 11px;
                letter-spacing: 2px;
                text-transform: uppercase;
                color: #D9B84A;
                margin-bottom: 6px;
            }
            .cu-subtext {
                color: rgba(245,241,230,0.65) !important;
            }
            .cu-form-shell {
                background: linear-gradient(180deg, #F7F2E7 0%, #F0E9D8 100%) !important;
                border: 1px solid rgba(201,162,39,0.3);
                position: relative;
                overflow: hidden;
                transition: box-shadow 0.25s ease, transform 0.25s ease;
            }
            .cu-form-shell::before {
                content: "";
                position: absolute;
                top: 0;
                left: 6%;
                right: 6%;
                height: 3px;
                background: linear-gradient(90deg, transparent, #C9A227, transparent);
            }
            .cu-form-shell:hover {
                box-shadow: 0 26px 50px -20px rgba(0,0,0,0.6);
            }
            @media (prefers-reduced-motion: reduce) {
                .cu-bg-sweep, .cu-bg-blob, .cu-fade-up {
                    animation: none !important;
                }
            }
        `}</style>
    );

    return (

        <div className="cu-page">

            {bgStyles}

            <div className="cu-bg-layer">
                <div className="cu-bg-grid" />
                <div className="cu-bg-sweep" />
                <div className="cu-bg-blob cu-blob-1" />
                <div className="cu-bg-blob cu-blob-2" />
            </div>

            <Box className="cu-content">

                {/* Header */}

                <Box sx={{ mb: 4 }} className="cu-fade-up">

                    <div className="cu-eyebrow">New Case File</div>

                    <Typography
                        variant="h4"
                        fontWeight={700}
                        className="cu-title"
                    >
                        Candidate Upload
                    </Typography>

                    <Typography className="cu-subtext">
                        Upload candidate information, resume and profile photo.
                    </Typography>

                </Box>

                {/* Form */}

                <Paper
                    elevation={0}
                    className="cu-form-shell cu-fade-up"
                    sx={{
                        p: 4,
                        borderRadius: 3,
                        animationDelay: "0.1s",
                    }}
                >

                    <CandidateForm />

                </Paper>

            </Box>

        </div>

    );

}