import {
    Paper,
    Typography,
    Box,
} from "@mui/material";

import {
    CloudUpload,
    PersonAdd,
    Psychology,
    Videocam,
    Assessment,
    Analytics,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

export default function QuickActions() {

    const navigate = useNavigate();

    const actions = [
        {
            title: "Upload Resume",
            subtitle: "Add a new candidate",
            icon: <CloudUpload />,
            color: "#2563EB",
            path: "/upload",
        },
        {
            title: "Candidates",
            subtitle: "View candidate list",
            icon: <PersonAdd />,
            color: "#16A34A",
            path: "/candidates",
        },
        {
            title: "AI Resume",
            subtitle: "Analyze resumes",
            icon: <Psychology />,
            color: "#9333EA",
            path: "/resume-analysis/1",
        },
        {
            title: "Verification",
            subtitle: "Live face verification",
            icon: <Videocam />,
            color: "#F59E0B",
            path: "/verification",
        },
        {
            title: "Reports",
            subtitle: "Recruitment reports",
            icon: <Assessment />,
            color: "#DC2626",
            path: "/reports",
        },
        {
            title: "Analytics",
            subtitle: "Hiring analytics",
            icon: <Analytics />,
            color: "#0891B2",
            path: "/analytics",
        },
    ];

    return (
        <Box
            sx={{
                width: "100%",
                display: "grid",

                /*
                 * 6 cards on desktop
                 * 3 cards on tablet
                 * 2 cards on small screens
                 * 1 card on mobile
                 */
                gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, minmax(0, 1fr))",
                    md: "repeat(3, minmax(0, 1fr))",
                    lg: "repeat(6, minmax(0, 1fr))",
                },

                gap: 2,

                boxSizing: "border-box",
            }}
        >

            {actions.map((item) => (

                <Paper
                    key={item.title}
                    elevation={0}
                    onClick={() => navigate(item.path)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                            navigate(item.path);
                        }
                    }}
                    sx={{
                        width: "100%",
                        minWidth: 0,
                        minHeight: {
                            xs: 190,
                            sm: 190,
                            md: 185,
                            lg: 185,
                        },

                        boxSizing: "border-box",

                        p: {
                            xs: 2.5,
                            sm: 2.5,
                            md: 2.25,
                            lg: 2.25,
                        },

                        cursor: "pointer",

                        borderRadius: 4,

                        border: "1px solid #E5E7EB",

                        background:
                            "linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%)",

                        display: "flex",
                        flexDirection: "column",

                        overflow: "hidden",

                        position: "relative",

                        transition:
                            "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",

                        "&::before": {
                            content: '""',
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            height: 3,
                            background: item.color,
                            opacity: 0,
                            transition: "opacity 0.25s ease",
                        },

                        "&:hover": {
                            transform: "translateY(-5px)",

                            boxShadow:
                                `0 16px 32px ${item.color}22`,

                            borderColor: item.color,

                            "&::before": {
                                opacity: 1,
                            },

                            "& .quick-action-icon": {
                                transform: "translateY(-2px) scale(1.06)",
                                boxShadow:
                                    `0 10px 22px ${item.color}45`,
                            },

                            "& .quick-action-arrow": {
                                opacity: 1,
                                transform: "translateX(0)",
                            },
                        },

                        "&:focus-visible": {
                            outline: `2px solid ${item.color}`,
                            outlineOffset: 2,
                        },
                    }}
                >

                    {/* ICON */}

                    <Box
                        className="quick-action-icon"
                        sx={{
                            width: {
                                xs: 58,
                                sm: 58,
                                md: 56,
                                lg: 56,
                            },

                            height: {
                                xs: 58,
                                sm: 58,
                                md: 56,
                                lg: 56,
                            },

                            flexShrink: 0,

                            borderRadius: 3,

                            bgcolor: item.color,

                            color: "#FFFFFF",

                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",

                            mb: 2,

                            transition:
                                "transform 0.25s ease, box-shadow 0.25s ease",

                            boxShadow:
                                `0 8px 18px ${item.color}35`,

                            "& svg": {
                                fontSize: {
                                    xs: 32,
                                    lg: 30,
                                },
                            },
                        }}
                    >
                        {item.icon}
                    </Box>

                    {/* TITLE */}

                    <Typography
                        className="quick-action-title"
                        fontWeight={700}
                        sx={{
                            color: "#1F2937",

                            fontSize: {
                                xs: 17,
                                sm: 16,
                                md: 15.5,
                                lg: 15.5,
                            },

                            lineHeight: 1.25,

                            overflow: "hidden",

                            textOverflow: "ellipsis",

                            whiteSpace: "nowrap",
                        }}
                    >
                        {item.title}
                    </Typography>

                    {/* SUBTITLE */}

                    <Typography
                        color="text.secondary"
                        sx={{
                            mt: 0.75,

                            fontSize: {
                                xs: 14,
                                sm: 13.5,
                                md: 13,
                                lg: 12.5,
                            },

                            lineHeight: 1.4,

                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 2,

                            overflow: "hidden",

                            minHeight: "2.8em",
                        }}
                    >
                        {item.subtitle}
                    </Typography>

                    {/* ARROW */}

                    <Typography
                        className="quick-action-arrow"
                        sx={{
                            mt: "auto",

                            pt: 1,

                            color: item.color,

                            fontSize: 30,

                            fontWeight: 700,

                            opacity: 0,

                            transform: "translateX(-5px)",

                            transition:
                                "opacity 0.25s ease, transform 0.25s ease",

                            alignSelf: "flex-end",
                        }}
                    >
                        →
                    </Typography>

                </Paper>

            ))}

        </Box>
    );
}