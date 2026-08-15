import { useState } from "react";

import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Avatar,
    Badge,
    Box,
    TextField,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";

import {
    Notifications,
    Search,
    Menu,
    Dashboard,
    CloudUpload,
    Videocam,
    FactCheck,
    Analytics,
    Assessment,
    Settings,
    People,
} from "@mui/icons-material";

import { Link } from "react-router-dom";

const menuItems = [
    {
        text: "Dashboard",
        icon: <Dashboard />,
        path: "/dashboard",
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
        text: "Settings",
        icon: <Settings />,
        path: "/settings",
    },
];

const Navbar = () => {

    const [mobileOpen, setMobileOpen] = useState(false);

    const toggleDrawer = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <>
            <AppBar
                position="sticky"
                elevation={1}
                sx={{
                    background: "#fff",
                    color: "#222",
                    zIndex: 1300,
                }}
            >
                <Toolbar
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 2,
                    }}
                >

                    {/* Left */}

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                        }}
                    >

                        {/* Mobile Menu */}

                        <IconButton
                            onClick={toggleDrawer}
                            sx={{
                                display: {
                                    xs: "flex",
                                    md: "none",
                                },
                            }}
                        >
                            <Menu />
                        </IconButton>

                        <Typography
                            variant="h5"
                            fontWeight="bold"
                            sx={{
                                display: {
                                    xs: "none",
                                    sm: "block",
                                },
                            }}
                        >
                            Sherlock Candidate AI
                        </Typography>

                    </Box>

                    {/* Search */}

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            background: "#f5f5f5",
                            borderRadius: 2,
                            px: 2,
                            flex: 1,
                            maxWidth: 450,
                        }}
                    >

                        <Search sx={{ color: "gray", mr: 1 }} />

                        <TextField
                            fullWidth
                            placeholder="Search..."
                            variant="standard"
                            InputProps={{
                                
                                disableUnderline: true,
                                
                            }}
                        />

                    </Box>

                    {/* Right */}

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                        }}
                    >

                        <IconButton>

                            <Badge
                                badgeContent={4}
                                color="error"
                            >
                                <Notifications />
                            </Badge>

                        </IconButton>

                        <Avatar
                            sx={{
                                bgcolor: "#1976d2",
                            }}
                        >
                            A
                        </Avatar>

                    </Box>

                </Toolbar>
            </AppBar>

            {/* Mobile Drawer */}

            <Drawer
                open={mobileOpen}
                onClose={toggleDrawer}
                sx={{
                    display: {
                        xs: "block",
                        md: "none",
                    },
                }}
            >
                <Box
                    sx={{
                        width: 260,
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            p: 2,
                            fontWeight: "bold",
                        }}
                    >
                        Sherlock AI
                    </Typography>

                    <List>

                        {menuItems.map((item) => (

                            <ListItem
                                key={item.text}
                                disablePadding
                            >

                                <ListItemButton
                                    component={Link}
                                    to={item.path}
                                    onClick={toggleDrawer}
                                >

                                    <ListItemIcon>
                                        {item.icon}
                                    </ListItemIcon>

                                    <ListItemText
                                        primary={item.text}
                                    />

                                </ListItemButton>

                            </ListItem>

                        ))}

                    </List>

                </Box>

            </Drawer>
        </>
    );
};

export default Navbar;