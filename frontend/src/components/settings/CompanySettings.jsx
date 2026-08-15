import { useState } from "react";

import {
    Box,
    Button,
    Divider,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import {
    Business,
    Language,
    LocationOn,
    Save,
} from "@mui/icons-material";

export default function CompanySettings() {
    const [company, setCompany] = useState({
        name: "Sherlock Candidate AI",
        industry: "Artificial Intelligence & Recruitment",
        website: "www.sherlockcandidate.ai",
        location: "India",
        employees: "50 - 100",
        description:
            "AI-powered candidate identification, resume analysis and recruitment intelligence platform.",
    });

    const [saved, setSaved] = useState(false);

    const handleChange = (field) => (event) => {
        setCompany((prev) => ({
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
            minHeight: 56,

            "& fieldset": {
                borderColor: "#CBD5E1",
            },

            "&:hover fieldset": {
                borderColor: "#94A3B8",
            },

            "&.Mui-focused fieldset": {
                borderColor: "#16A34A",
                borderWidth: 2,
            },
        },

        "& .MuiInputLabel-root": {
            color: "#64748B",
        },

        "& .MuiInputLabel-root.Mui-focused": {
            color: "#16A34A",
        },
    };

    return (
        <Box
            sx={{
                width: "100%",
                minWidth: 0,
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
                        borderRadius: 2.5,
                        bgcolor: "#F0FDF4",
                        color: "#16A34A",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                    }}
                >
                    <Business />
                </Box>

                <Box sx={{ minWidth: 0 }}>
                    <Typography
                        fontSize={18}
                        fontWeight={700}
                        color="#0F172A"
                    >
                        Company Information
                    </Typography>

                    <Typography
                        fontSize={13}
                        color="#64748B"
                        mt={0.3}
                    >
                        Manage your organisation details and recruitment
                        profile.
                    </Typography>
                </Box>
            </Stack>

            {/* COMPANY OVERVIEW */}
            <Box
                sx={{
                    p: 2.5,
                    mb: 3,
                    borderRadius: 3,
                    background:
                        "linear-gradient(135deg,#F0FDF4,#F8FAFC)",
                    border: "1px solid #DCFCE7",
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
                            width: 60,
                            height: 60,
                            borderRadius: 2.5,
                            bgcolor: "#16A34A",
                            color: "#FFFFFF",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 25,
                            fontWeight: 800,
                            flexShrink: 0,
                        }}
                    >
                        S
                    </Box>

                    <Box sx={{ minWidth: 0 }}>
                        <Typography
                            fontSize={19}
                            fontWeight={700}
                            color="#0F172A"
                        >
                            {company.name}
                        </Typography>

                        <Typography
                            fontSize={13}
                            color="#64748B"
                            mt={0.4}
                        >
                            {company.industry}
                        </Typography>
                    </Box>
                </Stack>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* FORM TITLE */}
            <Typography
                fontSize={20}
                fontWeight={700}
                color="#0F172A"
                mb={2}
            >
                Organisation Details
            </Typography>

            {/* FORM */}
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
                {/* COMPANY NAME */}
                <TextField
                    fullWidth
                    label="Company Name"
                    value={company.name}
                    onChange={handleChange("name")}
                    sx={fieldSx}
                    InputProps={{
                        startAdornment: (
                            <Business
                                sx={{
                                    mr: 1,
                                    color: "#2F82F6",
                                    fontSize: 20,
                                }}
                            />
                        ),
                    }}
                />

                {/* INDUSTRY */}
                <TextField
                    fullWidth
                    label="Industry"
                    value={company.industry}
                    onChange={handleChange("industry")}
                    sx={fieldSx}
                />

                {/* WEBSITE */}
                <TextField
                    fullWidth
                    label="Website"
                    value={company.website}
                    onChange={handleChange("website")}
                    sx={fieldSx}
                    InputProps={{
                        startAdornment: (
                            <Language
                                sx={{
                                    mr: 1,
                                    color: "#EA580C",
                                    fontSize: 20,
                                }}
                            />
                        ),
                    }}
                />

                {/* LOCATION */}
                <TextField
                    fullWidth
                    label="Location"
                    value={company.location}
                    onChange={handleChange("location")}
                    sx={fieldSx}
                    InputProps={{
                        startAdornment: (
                            <LocationOn
                                sx={{
                                    mr: 1,
                                    color: "#16A34A",
                                    fontSize: 20,
                                }}
                            />
                        ),
                    }}
                />

                {/* EMPLOYEES */}
                <TextField
                    fullWidth
                    label="Number of Employees"
                    value={company.employees}
                    onChange={handleChange("employees")}
                    sx={fieldSx}
                />

                {/* DESCRIPTION */}
                <TextField
                    fullWidth
                    multiline
                    minRows={5}
                    label="Company Description"
                    value={company.description}
                    onChange={handleChange("description")}
                    sx={{
                        ...fieldSx,

                        gridColumn: {
                            xs: "1",
                            sm: "1 / -1",
                        },

                        "& .MuiOutlinedInput-root": {
                            ...fieldSx["& .MuiOutlinedInput-root"],
                            alignItems: "flex-start",
                        },

                        "& textarea": {
                            lineHeight: 1.6,
                        },
                    }}
                />
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
                        bgcolor: "#16A34A",

                        "&:hover": {
                            bgcolor: "#15803D",
                        },
                    }}
                >
                    Save Changes
                </Button>
            </Stack>
        </Box>
    );
}