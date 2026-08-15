import { useState } from "react";

import {
    Avatar,
    Box,
    Button,
    Divider,
    Grid,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import {
    Person,
    Email,
    Phone,
    Save,
    CameraAlt,
} from "@mui/icons-material";

export default function ProfileSettings() {
    const [profile, setProfile] = useState({
        firstName: "Sherlock",
        lastName: "Admin",
        email: "admin@sherlockcandidate.ai",
        phone: "+91 98765 43210",
        role: "Recruitment Administrator",
    });

    const [saved, setSaved] = useState(false);

    const handleChange = (field) => (event) => {
        setProfile((prev) => ({
            ...prev,
            [field]: event.target.value,
        }));

        setSaved(false);
    };

    const handleSave = () => {
        setSaved(true);

        setTimeout(() => {
            setSaved(false);
        }, 2500);
    };

    const fieldSx = {
        "& .MuiOutlinedInput-root": {
            borderRadius: 2.5,
            backgroundColor: "#FFFFFF",
            minHeight: 54,

            "& fieldset": {
                borderColor: "#D8DEE8",
            },

            "&:hover fieldset": {
                borderColor: "#94A3B8",
            },

            "&.Mui-focused fieldset": {
                borderColor: "#2563EB",
                borderWidth: 1.5,
            },
        },

        "& .MuiInputLabel-root": {
            color: "#64748B",
        },

        "& .MuiInputLabel-root.Mui-focused": {
            color: "#2563EB",
        },

        "& .MuiInputBase-input": {
            minWidth: 0,
            overflow: "hidden",
            textOverflow: "ellipsis",
        },
    };

    return (
        <Box
            sx={{
                width: "100%",
                minWidth: 0,
                boxSizing: "border-box",
            }}
        >
            {/* HEADER */}
            <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{ mb: 3 }}
            >
                <Box
                    sx={{
                        width: 48,
                        height: 48,
                        flexShrink: 0,
                        borderRadius: 2.5,
                        bgcolor: "#EFF6FF",
                        color: "#2563EB",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Person />
                </Box>

                <Box sx={{ minWidth: 0 }}>
                    <Typography
                        fontSize={18}
                        fontWeight={700}
                        color="#0F172A"
                    >
                        Personal Information
                    </Typography>

                    <Typography
                        fontSize={13}
                        color="#64748B"
                        mt={0.3}
                    >
                        Manage your account and contact information.
                    </Typography>
                </Box>
            </Stack>

            {/* PROFILE SUMMARY */}
            <Box
                sx={{
                    p: {
                        xs: 2,
                        sm: 2.5,
                    },
                    mb: 3,
                    borderRadius: 3,
                    background:
                        "linear-gradient(135deg,#EFF6FF,#F8FAFC)",
                    border: "1px solid #DBEAFE",
                }}
            >
                <Stack
                    direction={{
                        xs: "column",
                        sm: "row",
                    }}
                    spacing={2}
                    alignItems={{
                        xs: "flex-start",
                        sm: "center",
                    }}
                >
                    <Box
                        sx={{
                            position: "relative",
                            flexShrink: 0,
                        }}
                    >
                        <Avatar
                            sx={{
                                width: 72,
                                height: 72,
                                bgcolor: "#2563EB",
                                fontSize: 27,
                                fontWeight: 700,
                            }}
                        >
                            SA
                        </Avatar>

                        <Box
                            sx={{
                                position: "absolute",
                                bottom: -2,
                                right: -2,
                                width: 27,
                                height: 27,
                                borderRadius: "50%",
                                bgcolor: "#FFFFFF",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow:
                                    "0 3px 10px rgba(0,0,0,.12)",
                            }}
                        >
                            <CameraAlt
                                sx={{
                                    fontSize: 15,
                                    color: "#2563EB",
                                }}
                            />
                        </Box>
                    </Box>

                    <Box sx={{ minWidth: 0 }}>
                        <Typography
                            fontSize={19}
                            fontWeight={700}
                            color="#0F172A"
                        >
                            {profile.firstName} {profile.lastName}
                        </Typography>

                        <Typography
                            fontSize={13}
                            color="#64748B"
                            mt={0.4}
                        >
                            {profile.role}
                        </Typography>

                        <Typography
                            fontSize={12}
                            color="#94A3B8"
                            mt={0.5}
                        >
                            Sherlock Candidate AI Administrator
                        </Typography>
                    </Box>
                </Stack>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* ACCOUNT DETAILS */}
            <Typography
                fontSize={15}
                fontWeight={700}
                color="#0F172A"
                mb={2}
            >
                Account Details
            </Typography>

                        <Box
                           sx={{
                               display: "grid",
           
                               gridTemplateColumns: {
                                   xs: "1fr",
                                   sm: "repeat(2, minmax(0, 1fr))",
                               },
           
                               gap: 2,
           
                               width: "100%",
                           }}
                       >
                {/* FIRST NAME */}
                <Grid
                    size={{
                        xs: 12,
                        sm: 6,
                    }}
                    sx={{
                        minWidth: 0,
                    }}
                >
                    <TextField
                        fullWidth
                        label="First Name"
                        value={profile.firstName}
                        onChange={handleChange("firstName")}
                        sx={fieldSx}
                        InputProps={{
                            startAdornment: (
                                <Person
                                    sx={{
                                        mr: 1,
                                        color: "#2563EB",
                                        fontSize: 20,
                                        flexShrink: 0,
                                    }}
                                />
                            ),
                        }}
                    />
                </Grid>

                {/* LAST NAME */}
                <Grid
                    size={{
                        xs: 12,
                        sm: 6,
                    }}
                    sx={{
                        minWidth: 0,
                    }}
                >
                    <TextField
                        fullWidth
                        label="Last Name"
                        value={profile.lastName}
                        onChange={handleChange("lastName")}
                        sx={fieldSx}
                    />
                </Grid>

                {/* EMAIL */}
                <Grid
                    size={{
                        xs: 12,
                        sm: 6,
                    }}
                    sx={{
                        minWidth: 0,
                    }}
                >
                    <TextField
                        fullWidth
                        label="Email Address"
                        value={profile.email}
                        onChange={handleChange("email")}
                        sx={fieldSx}
                        InputProps={{
                            startAdornment: (
                                <Email
                                    sx={{
                                        mr: 1,
                                        color: "#EA580C",
                                        fontSize: 20,
                                        flexShrink: 0,
                                    }}
                                />
                            ),
                        }}
                    />
                </Grid>

                {/* PHONE */}
                <Grid
                    size={{
                        xs: 12,
                        sm: 6,
                    }}
                    sx={{
                        minWidth: 0,
                    }}
                >
                    <TextField
                        fullWidth
                        label="Phone Number"
                        value={profile.phone}
                        onChange={handleChange("phone")}
                        sx={fieldSx}
                        InputProps={{
                            startAdornment: (
                                <Phone
                                    sx={{
                                        mr: 1,
                                        color: "#16A34A",
                                        fontSize: 20,
                                        flexShrink: 0,
                                    }}
                                />
                            ),
                        }}
                    />
                </Grid>

                {/* ROLE */}
                <Grid
                    size={{
                        xs: 12,
                    }}
                    sx={{
                        minWidth: 0,
                    }}
                >
                    <TextField
                        fullWidth
                        label="Role"
                        value={profile.role}
                        onChange={handleChange("role")}
                        sx={fieldSx}
                    />
                </Grid>
            
            </Box>

            {/* ACTIONS */}
            <Stack
                direction={{
                    xs: "column",
                    sm: "row",
                }}
                justifyContent="flex-end"
                alignItems={{
                    xs: "stretch",
                    sm: "center",
                }}
                spacing={2}
                sx={{ mt: 4 }}
            >
                {saved && (
                    <Typography
                        fontSize={13}
                        color="#16A34A"
                        fontWeight={600}
                    >
                        ✓ Changes saved successfully
                    </Typography>
                )}

                <Button
                    variant="contained"
                    startIcon={<Save />}
                    onClick={handleSave}
                    sx={{
                        minWidth: 150,
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: 700,
                        bgcolor: "#2563EB",

                        "&:hover": {
                            bgcolor: "#1D4ED8",
                        },
                    }}
                >
                    Save Changes
                </Button>
            </Stack>
        </Box>
    );
}