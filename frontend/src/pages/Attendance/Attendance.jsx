import { useEffect, useState } from "react";

import {
    Box,
    Typography,
    Grid,
    CircularProgress,
    Alert,
} from "@mui/material";

import AttendanceCards from "../../components/attendance/AttendanceCards";
import AttendanceTable from "../../components/attendance/AttendanceTable";
import AttendanceChart from "../../components/attendance/AttendanceChart";
import AttendanceHeatmap from "../../components/attendance/AttendanceHeatmap";

import { useDashboardSocket } from "../../context/WebSocketContext";
import { getAttendance } from "../../api/attendanceApi";

export default function Attendance() {

    const socket = useDashboardSocket();
    const lastEvent = socket?.lastEvent;

    const [attendance, setAttendance] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState("");

    // Purely visual: briefly flashes the "LIVE" badge whenever a
    // real event comes through, so the live connection feels alive.
    const [pulseFlash, setPulseFlash] = useState(false);

    useEffect(() => {

        loadAttendance();

    }, []);

    async function loadAttendance() {

        try {

            setLoadError("");

            const data = await getAttendance();

            // Handles a plain array response, or a paginated response
            // shaped like { results: [...] } / { data: [...] } (common
            // with DRF-style pagination). Falls back to [] only if
            // neither shape matches.
            const list = Array.isArray(data)
                ? data
                : Array.isArray(data?.results)
                ? data.results
                : Array.isArray(data?.data)
                ? data.data
                : [];

            setAttendance(list);

            if (!Array.isArray(data) && list.length === 0) {
                console.warn(
                    "getAttendance() returned an unexpected shape:",
                    data
                );
            }

        }

        catch (err) {

            console.error("Attendance Error:", err);

            setLoadError("Unable to load attendance records.");

        }

        finally {

            setLoading(false);

        }

    }

    // -----------------------------
    // Live Attendance Updates
    // -----------------------------
    useEffect(() => {

        if (!lastEvent) return;

        switch (lastEvent.event) {

            case "attendance_marked":

                loadAttendance();
                break;

            default:
                break;

        }

    }, [lastEvent]);

    useEffect(() => {

        if (!lastEvent) return;

        setPulseFlash(true);

        const t = setTimeout(() => setPulseFlash(false), 900);

        return () => clearTimeout(t);

    }, [lastEvent]);

    const bgStyles = (
        <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=JetBrains+Mono:wght@400;500&display=swap');

            @keyframes at-pulseTravel {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(0%); }
            }
            @keyframes at-fadeUp {
                from { opacity: 0; transform: translateY(16px); }
                to { opacity: 1; transform: translateY(0); }
            }
            @keyframes at-fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes at-dotPulse {
                0% { box-shadow: 0 0 0 0 rgba(80,200,120,0.55); }
                70% { box-shadow: 0 0 0 9px rgba(80,200,120,0); }
                100% { box-shadow: 0 0 0 0 rgba(80,200,120,0); }
            }
            @keyframes at-flash {
                0% { box-shadow: 0 0 0 0 rgba(201,162,39,0.6); }
                100% { box-shadow: 0 0 0 14px rgba(201,162,39,0); }
            }
            @keyframes at-spin {
                to { transform: rotate(360deg); }
            }
            .at-page {
                position: relative;
                min-height: 100%;
                margin: -24px;
                padding: 24px;
                background: radial-gradient(ellipse at 50% 0%, #16203a 0%, #0b0f1a 60%, #080b12 100%);
                overflow: hidden;
            }
            .at-bg-layer {
                position: absolute;
                inset: 0;
                z-index: 0;
                overflow: hidden;
                pointer-events: none;
            }
            .at-bg-grid {
                position: absolute;
                inset: -20%;
                background-image:
                    linear-gradient(rgba(201,162,39,0.07) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(201,162,39,0.07) 1px, transparent 1px);
                background-size: 46px 46px;
                mask-image: radial-gradient(ellipse 70% 55% at 50% 15%, black 0%, transparent 75%);
            }
            .at-pulse-strip {
                position: absolute;
                top: 130px;
                left: 0;
                width: 220%;
                height: 90px;
                opacity: 0.4;
                animation: at-pulseTravel 9s linear infinite;
            }
            .at-content {
                position: relative;
                z-index: 1;
            }
            .at-fade-up {
                animation: at-fadeUp 0.55s cubic-bezier(0.2,0.8,0.2,1) both;
            }
            .at-fade-in {
                animation: at-fadeIn 0.4s ease both;
            }
            .at-title {
                font-family: 'Playfair Display', serif;
                color: #F5F1E6;
            }
            .at-eyebrow {
                font-family: 'JetBrains Mono', monospace;
                font-size: 11px;
                letter-spacing: 2px;
                text-transform: uppercase;
                color: #D9B84A;
            }
            .at-live-badge {
                display: inline-flex;
                align-items: center;
                gap: 6px;
                font-family: 'JetBrains Mono', monospace;
                font-size: 11px;
                letter-spacing: 1.5px;
                text-transform: uppercase;
                color: rgba(245,241,230,0.75);
                border: 1px solid rgba(80,200,120,0.4);
                background: rgba(80,200,120,0.08);
                padding: 4px 10px;
                border-radius: 999px;
                transition: box-shadow 0.2s ease;
            }
            .at-live-badge.flash {
                animation: at-flash 0.9s ease-out;
                border-color: rgba(201,162,39,0.7);
            }
            .at-live-dot {
                width: 7px;
                height: 7px;
                border-radius: 50%;
                background: #50C878;
                animation: at-dotPulse 2s ease-out infinite;
            }
            .at-section-shell {
                border-radius: 16px;
                background: linear-gradient(180deg, #F7F2E7 0%, #F0E9D8 100%);
                border: 1px solid rgba(201,162,39,0.3);
                box-shadow: 0 20px 40px -18px rgba(0,0,0,0.55);
                position: relative;
                overflow: hidden;
                padding: 8px;
            }
            .at-section-shell::before {
                content: "";
                position: absolute;
                top: 0;
                left: 5%;
                right: 5%;
                height: 3px;
                background: linear-gradient(90deg, transparent, #C9A227, transparent);
                z-index: 1;
            }
            .at-loading-spinner {
                width: 42px;
                height: 42px;
                border-radius: 50%;
                border: 3px solid rgba(201,162,39,0.25);
                border-top-color: #C9A227;
                animation: at-spin 0.8s linear infinite;
            }
            @media (prefers-reduced-motion: reduce) {
                .at-pulse-strip, .at-fade-up, .at-fade-in, .at-live-dot, .at-live-badge.flash, .at-loading-spinner {
                    animation: none !important;
                }
            }
        `}</style>
    );

    // Repeating heartbeat-style waveform, built once as an SVG pattern.
    const pulseSvg = (
        <svg
            className="at-pulse-strip"
            viewBox="0 0 800 90"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <polyline
                points="0,45 60,45 80,45 95,10 110,80 125,45 180,45 260,45 280,45 295,15 310,75 325,45 380,45 460,45 480,45 495,10 510,80 525,45 580,45 660,45 680,45 695,15 710,75 725,45 780,45 800,45"
                fill="none"
                stroke="#C9A227"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
            />
        </svg>
    );

    if (loading) {

        return (

            <div className="at-page">

                {bgStyles}

                <div className="at-bg-layer">
                    <div className="at-bg-grid" />
                    {pulseSvg}
                </div>

                <Box
                    className="at-content at-fade-in"
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 2,
                        mt: 8,
                    }}
                >
                    <div className="at-loading-spinner" />

                    <Typography
                        sx={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: 12,
                            letterSpacing: 1.5,
                            textTransform: "uppercase",
                            color: "rgba(245,241,230,0.65)",
                        }}
                    >
                        Checking the ledger...
                    </Typography>
                </Box>

            </div>

        );

    }

    return (

        <div className="at-page">

            {bgStyles}

            <div className="at-bg-layer">
                <div className="at-bg-grid" />
                {pulseSvg}
            </div>

            <Box className="at-content">

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: 2,
                        mb: 3,
                    }}
                    className="at-fade-up"
                >

                    <Box>
                        <div className="at-eyebrow">Live Monitoring</div>
                        <Typography
                            variant="h4"
                            fontWeight={700}
                            className="at-title"
                        >
                            Attendance Dashboard
                        </Typography>
                    </Box>

                    <span className={`at-live-badge${pulseFlash ? " flash" : ""}`}>
                        <span className="at-live-dot" />
                        {pulseFlash ? "New event" : "Live"}
                    </span>

                </Box>

                {loadError && (
                    <Alert
                        severity="error"
                        className="at-fade-in"
                        sx={{ mb: 3 }}
                    >
                        {loadError}
                    </Alert>
                )}

                <Box className="at-fade-up" sx={{ mb: 3, animationDelay: "0.05s" }}>
                    <AttendanceCards />
                </Box>

                <Grid
                    container
                    spacing={3}
                    sx={{ mb: 3 }}
                >

                    <Grid
                        size={{
                            xs: 12,
                            lg: 8,
                        }}
                        className="at-fade-up"
                        sx={{ animationDelay: "0.1s" }}
                    >

                        <Box className="at-section-shell">
                            <AttendanceChart
                                attendance={attendance}
                            />
                        </Box>

                    </Grid>

                    <Grid
                        size={{
                            xs: 12,
                            lg: 4,
                        }}
                        className="at-fade-up"
                        sx={{ animationDelay: "0.15s" }}
                    >

                        <Box className="at-section-shell">
                            <AttendanceHeatmap
                                attendance={attendance}
                            />
                        </Box>

                    </Grid>

                </Grid>

                <Box className="at-fade-up" sx={{ animationDelay: "0.2s" }}>
                    <Box className="at-section-shell">
                        <AttendanceTable
                            attendance={attendance}
                        />
                    </Box>
                </Box>

            </Box>

        </div>

    );

}