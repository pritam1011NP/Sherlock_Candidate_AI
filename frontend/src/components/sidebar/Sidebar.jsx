import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import {
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    IconButton,
    Divider,
    Box,
} from "@mui/material";

import {
    Dashboard,
    People,
    CloudUpload,
    Videocam,
    FactCheck,
    Analytics,
    Assessment,
    Settings,
    MenuOpen,
    Menu,
} from "@mui/icons-material";

const expandedWidth = 260;
const collapsedWidth = 75;

const menus = [
    {
        section: "MAIN",
    },
    {
        text: "Dashboard",
        icon: <Dashboard />,
        path: "/dashboard",
    },
    {
        text: "Candidates",
        icon: <People />,
        path: "/candidates",
    },

    {
        section: "RECRUITMENT",
    },
    {
        text: "Candidate Upload",
        icon: <CloudUpload />,
        path: "/upload",
    },
    {
        text: "Live Verification",
        icon: <Videocam />,
        path: "/verification",
    },
    {
        text: "Attendance",
        icon: <FactCheck />,
        path: "/attendance",
    },

    {
        section: "ANALYTICS",
    },
    {
        text: "Analytics",
        icon: <Analytics />,
        path: "/analytics",
    },
    {
        text: "Reports",
        icon: <Assessment />,
        path: "/reports",
    },

    {
        section: "SYSTEM",
    },
    {
        text: "Settings",
        icon: <Settings />,
        path: "/settings",
    },
];

export default function Sidebar() {

    const location = useLocation();

    const [collapsed, setCollapsed] = useState(false);

    return (

        <Drawer
            variant="permanent"
            sx={{
                width: collapsed ? collapsedWidth : expandedWidth,
                flexShrink: 0,

                "& .MuiDrawer-paper": {

                    width: collapsed ? collapsedWidth : expandedWidth,

                    transition: "0.3s ease",

                    overflowX: "hidden",

                    background: "#0F172A",

                    color: "#fff",

                    borderRight: "none",

                },
            }}
        >

            {/* Logo */}

            <Toolbar
                sx={{
                    display: "flex",
                    justifyContent: collapsed ? "center" : "space-between",
                    alignItems: "center",
                    px: 2,
                    minHeight: "72px",
                }}
            >

                {!collapsed && (

                    <Typography
                        variant="h6"
                        fontWeight={700}
                    >
                        Sherlock AI
                    </Typography>

                )}

                <IconButton
                    onClick={() => setCollapsed(!collapsed)}
                    sx={{
                        color: "#fff",
                    }}
                >
                    {collapsed ? <Menu /> : <MenuOpen />}
                </IconButton>

            </Toolbar>

            <Divider sx={{ borderColor: "#1E293B" }} />

            <Box
                sx={{
                    mt: 2,
                    px: 1,
                }}
            >

                <List>

                    {menus.map((item, index) => {

                        if (item.section) {

                            return !collapsed ? (

                                <Typography
                                    key={index}
                                    variant="caption"
                                    sx={{
                                        color: "#94A3B8",
                                        px: 2,
                                        py: 1,
                                        display: "block",
                                        fontWeight: 700,
                                        letterSpacing: 1,
                                    }}
                                >
                                    {item.section}
                                </Typography>

                            ) : null;

                        }

                        const active =
                            location.pathname === item.path;

                        return (

                            <ListItemButton
                                key={item.text}
                                component={Link}
                                to={item.path}
                                selected={active}
                                sx={{

                                    my: 0.6,

                                    borderRadius: 2,

                                    color: "#fff",

                                    justifyContent: collapsed
                                        ? "center"
                                        : "flex-start",

                                    position: "relative",

                                    transition: "all .25s",

                                    "&::before": active
                                        ? {
                                            content: '""',
                                            position: "absolute",
                                            left: 0,
                                            top: 8,
                                            bottom: 8,
                                            width: 4,
                                            borderRadius: 2,
                                            backgroundColor: "#3B82F6",
                                        }
                                        : {},

                                    "&.Mui-selected": {
                                        backgroundColor: "#1E3A8A",
                                    },

                                    "&.Mui-selected:hover": {
                                        backgroundColor: "#1E40AF",
                                    },

                                    "&:hover": {
                                        backgroundColor: "#1E293B",
                                    },
                                }}
                            >

                                <ListItemIcon
                                    sx={{
                                        color: "#fff",
                                        minWidth: collapsed ? 0 : 42,
                                        justifyContent: "center",
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>

                                {!collapsed && (

                                    <ListItemText
                                        primary={item.text}
                                        primaryTypographyProps={{
                                            fontSize: 15,
                                            fontWeight: active ? 600 : 500,
                                        }}
                                    />

                                )}

                            </ListItemButton>

                        );

                    })}

                </List>

            </Box>

        </Drawer>

    );

}