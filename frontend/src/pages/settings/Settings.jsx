import { useState } from "react";

import {
    Box,
    Chip,
    Stack,
    Typography,
} from "@mui/material";

import {
    Settings as SettingsIcon,
    Tune,
    CheckCircle,
} from "@mui/icons-material";

import SettingsSidebar from "../../components/settings/SettingsSidebar";

import ProfileSettings from "../../components/settings/ProfileSettings";
import CompanySettings from "../../components/settings/CompanySettings";
import SecuritySettings from "../../components/settings/SecuritySettings";
import AISettings from "../../components/settings/AISettings";
import InterviewSettings from "../../components/settings/InterviewSettings";
import NotificationSettings from "../../components/settings/NotificationSettings";
import AppearanceSettings from "../../components/settings/AppearanceSettings";
import BackupSettings from "../../components/settings/BackupSettings";
import ApiKeySettings from "../../components/settings/ApiKeySettings";
import AuditLogs from "../../components/settings/AuditLogs";
import AboutSettings from "../../components/settings/AboutSettings";

export default function Settings() {

    const [page, setPage] = useState("profile");

    function renderPage() {

        switch (page) {

            case "profile":
                return <ProfileSettings />;

            case "company":
                return <CompanySettings />;

            case "security":
                return <SecuritySettings />;

            case "ai":
                return <AISettings />;

            case "interview":
                return <InterviewSettings />;

            case "notifications":
                return <NotificationSettings />;

            case "appearance":
                return <AppearanceSettings />;

            case "backup":
                return <BackupSettings />;

            case "apikeys":
                return <ApiKeySettings />;

            case "audit":
                return <AuditLogs />;

            case "about":
                return <AboutSettings />;

            default:
                return <ProfileSettings />;

        }

    }

    const bgStyles = (
        <style>{`

            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap');

            @keyframes settingsFade {

                from {
                    opacity: 0;
                    transform: translateY(12px);
                }

                to {
                    opacity: 1;
                    transform: translateY(0);
                }

            }

            @keyframes settingsPanel {

                from {
                    opacity: 0;
                    transform: translateX(8px);
                }

                to {
                    opacity: 1;
                    transform: translateX(0);
                }

            }

            .settings-page {

                width: 100%;
                min-height: 100%;
                box-sizing: border-box;

                padding: 28px;

                background:
                    radial-gradient(
                        circle at 20% 0%,
                        rgba(37, 99, 235, 0.10),
                        transparent 35%
                    ),
                    radial-gradient(
                        circle at 90% 10%,
                        rgba(201, 162, 39, 0.08),
                        transparent 35%
                    ),
                    linear-gradient(
                        180deg,
                        #0B1220 0%,
                        #080D17 100%
                    );

                font-family: 'Inter', sans-serif;

            }

            .settings-container {

                width: 100%;
                max-width: 1500px;

                margin: 0 auto;

            }

            .settings-header {

                animation:
                    settingsFade
                    0.5s
                    cubic-bezier(.2,.8,.2,1)
                    both;

            }

            .settings-layout {

                display: grid;

                grid-template-columns:
                    280px
                    minmax(0, 1fr);

                gap: 24px;

                align-items: stretch;

            }

            .settings-sidebar {

                min-width: 0;

                background:
                    linear-gradient(
                        180deg,
                        #FFFFFF 0%,
                        #F8FAFC 100%
                    );

                border:
                    1px solid
                    rgba(255,255,255,0.8);

                border-radius: 22px;

                box-shadow:
                    0 20px 45px
                    rgba(0,0,0,0.25);

                padding: 12px;

                box-sizing: border-box;

                animation:
                    settingsFade
                    .55s
                    cubic-bezier(.2,.8,.2,1)
                    both;

            }

            .settings-main {

                min-width: 0;

                background:
                    linear-gradient(
                        180deg,
                        #FFFFFF 0%,
                        #F8FAFC 100%
                    );

                border:
                    1px solid
                    rgba(255,255,255,0.8);

                border-radius: 22px;

                box-shadow:
                    0 20px 45px
                    rgba(0,0,0,0.25);

                overflow: hidden;

                min-height: 620px;

                animation:
                    settingsPanel
                    .45s
                    ease
                    both;

            }

            .settings-main-header {

                padding:
                    24px
                    28px
                    20px
                    28px;

                border-bottom:
                    1px solid
                    #E5E7EB;

                background:
                    linear-gradient(
                        180deg,
                        #FFFFFF,
                        #FAFBFC
                    );

            }

            .settings-main-content {

                padding: 28px;

                box-sizing: border-box;

            }

            .settings-sidebar-title {

                padding:
                    12px
                    12px
                    16px
                    12px;

            }

            .settings-sidebar-label {

                font-size: 11px;

                font-weight: 700;

                letter-spacing: 1.3px;

                text-transform: uppercase;

                color: #94A3B8;

            }

            @media (max-width: 1000px) {

                .settings-layout {

                    grid-template-columns:
                        230px
                        minmax(0, 1fr);

                    gap: 18px;

                }

                .settings-page {

                    padding: 22px;

                }

            }

            @media (max-width: 760px) {

                .settings-page {

                    padding: 16px;

                }

                .settings-layout {

                    grid-template-columns: 1fr;

                }

                .settings-sidebar {

                    width: 100%;

                }

                .settings-main {

                    min-height: auto;

                }

                .settings-main-content {

                    padding: 20px;

                }

            }

            @media (prefers-reduced-motion: reduce) {

                .settings-header,
                .settings-sidebar,
                .settings-main {

                    animation: none !important;

                }

            }

        `}</style>
    );

    return (

        <Box className="settings-page">

            {bgStyles}

            <Box className="settings-container">

                {/* ================================================= */}
                {/* PAGE HEADER */}
                {/* ================================================= */}

                <Box
                    className="settings-header"
                    sx={{
                        mb: 3,
                    }}
                >

                    <Stack
                        direction={{
                            xs: "column",
                            sm: "row",
                        }}
                        justifyContent="space-between"
                        alignItems={{
                            xs: "flex-start",
                            sm: "center",
                        }}
                        spacing={2}
                    >

                        <Box>

                            <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                                sx={{ mb: 0.8 }}
                            >

                                <SettingsIcon
                                    sx={{
                                        color: "#D9B84A",
                                        fontSize: 18,
                                    }}
                                />

                                <Typography
                                    sx={{
                                        color: "#D9B84A",
                                        fontSize: 11,
                                        fontWeight: 700,
                                        letterSpacing: 1.8,
                                        textTransform: "uppercase",
                                    }}
                                >
                                    System Configuration
                                </Typography>

                            </Stack>

                            <Typography
                                sx={{
                                    color: "#F8FAFC",
                                    fontFamily:
                                        "'Playfair Display', serif",
                                    fontSize: {
                                        xs: 30,
                                        md: 36,
                                    },
                                    fontWeight: 700,
                                    lineHeight: 1.15,
                                }}
                            >
                                Settings
                            </Typography>

                            <Typography
                                sx={{
                                    mt: 0.8,
                                    color:
                                        "rgba(226,232,240,0.68)",
                                    fontSize: 14,
                                    maxWidth: 600,
                                }}
                            >
                                Manage your profile, company,
                                security, AI preferences and
                                Sherlock Candidate AI settings.
                            </Typography>

                        </Box>

                        <Chip
                            icon={
                                <CheckCircle
                                    sx={{
                                        fontSize: 17,
                                    }}
                                />
                            }
                            label="System Operational"
                            sx={{
                                color: "#86EFAC",
                                background:
                                    "rgba(22,163,74,0.12)",
                                border:
                                    "1px solid rgba(34,197,94,0.25)",
                                fontWeight: 600,
                                "& .MuiChip-icon": {
                                    color: "#22C55E",
                                },
                            }}
                        />

                    </Stack>

                </Box>


                {/* ================================================= */}
                {/* SETTINGS LAYOUT */}
                {/* ================================================= */}

                <Box className="settings-layout">

                    {/* ================================================= */}
                    {/* SIDEBAR */}
                    {/* ================================================= */}

                    <Box className="settings-sidebar">

                        <Box className="settings-sidebar-title">

                            <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                            >

                                <Tune
                                    sx={{
                                        fontSize: 18,
                                        color: "#2563EB",
                                    }}
                                />

                                <Typography
                                    sx={{
                                        fontWeight: 700,
                                        color: "#1E293B",
                                        fontSize: 14,
                                    }}
                                >
                                    Settings Menu
                                </Typography>

                            </Stack>

                            <Typography
                                className="settings-sidebar-label"
                                sx={{
                                    mt: 1,
                                }}
                            >
                                Preferences
                            </Typography>

                        </Box>

                        <SettingsSidebar
                            active={page}
                            onChange={setPage}
                        />

                    </Box>


                    {/* ================================================= */}
                    {/* MAIN CONTENT */}
                    {/* ================================================= */}

                    <Box
                        key={page}
                        className="settings-main"
                    >

                        {/* MAIN HEADER */}

                        <Box className="settings-main-header">

                            <Typography
                                sx={{
                                    color: "#94A3B8",
                                    fontSize: 11,
                                    fontWeight: 700,
                                    letterSpacing: 1.3,
                                    textTransform: "uppercase",
                                    mb: 0.6,
                                }}
                            >
                                Settings
                            </Typography>

                            <Typography
                                sx={{
                                    color: "#0F172A",
                                    fontSize: 24,
                                    fontWeight: 700,
                                }}
                            >
                                {getPageTitle(page)}
                            </Typography>

                            <Typography
                                sx={{
                                    color: "#64748B",
                                    fontSize: 13,
                                    mt: 0.5,
                                }}
                            >
                                Configure your Sherlock Candidate AI
                                preferences.
                            </Typography>

                        </Box>


                        {/* PAGE CONTENT */}

                        <Box className="settings-main-content">

                            {renderPage()}

                        </Box>

                    </Box>

                </Box>

            </Box>

        </Box>

    );

}


/* ========================================================= */
/* PAGE TITLES                                                */
/* ========================================================= */

function getPageTitle(page) {

    const titles = {

        profile: "Profile Settings",

        company: "Company Settings",

        security: "Security",

        ai: "AI Settings",

        interview: "Interview Settings",

        notifications: "Notification Settings",

        appearance: "Appearance",

        backup: "Backup & Recovery",

        apikeys: "API Keys",

        audit: "Audit Logs",

        about: "About Sherlock Candidate AI",

    };

    return titles[page] || "Profile Settings";

}