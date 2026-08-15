import { useState } from "react";
import Grid from "@mui/material/Grid";
import {
    TextField,
    Button,
    Box,
    Paper,
    Typography,
    Snackbar,
    Alert,
} from "@mui/material";

import ResumeUpload from "./ResumeUpload";
import PhotoUpload from "./PhotoUpload";
import { uploadCandidate } from "../../api/candidateApi";

const initialCandidate = {
    full_name: "",
    email: "",
    phone: "",
    position: "",
    address: "",
};

// Shared field styling so every TextField gets the same brass
// focus ring used on the login page, instead of MUI's default blue.
const fieldSx = {
    "& .MuiOutlinedInput-root": {
        borderRadius: "8px",
        transition: "box-shadow 0.2s ease, background 0.2s ease",
        backgroundColor: "rgba(255,255,255,0.5)",
    },
    "& .MuiOutlinedInput-root:hover": {
        backgroundColor: "rgba(255,255,255,0.75)",
    },
    "& .MuiOutlinedInput-root.Mui-focused": {
        backgroundColor: "#ffffff",
        boxShadow: "0 0 0 3px rgba(201,162,39,0.25)",
    },
    "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "rgba(20,24,38,0.16)",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#C9A227",
        borderWidth: "1.5px",
    },
    "& .MuiInputLabel-root.Mui-focused": {
        color: "#8A6A12",
    },
};

export default function CandidateForm() {

    const [candidate, setCandidate] = useState(initialCandidate);

    const [resume, setResume] = useState(null);
    const [photo, setPhoto] = useState(null);

    const [loading, setLoading] = useState(false);

    const [snackbar, setSnackbar] = useState({
        open: false,
        severity: "success",
        message: "",
    });

    const handleChange = (e) => {
        setCandidate({
            ...candidate,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!resume) {
            setSnackbar({
                open: true,
                severity: "warning",
                message: "Please upload a resume.",
            });
            return;
        }

        if (!photo) {
            setSnackbar({
                open: true,
                severity: "warning",
                message: "Please upload a profile photo.",
            });
            return;
        }

        try {
            setLoading(true);

            const formData = new FormData();

            formData.append("full_name", candidate.full_name);
            formData.append("email", candidate.email);
            formData.append("phone", candidate.phone);
            formData.append("position", candidate.position);
            formData.append("address", candidate.address);

            formData.append("resume", resume);
            formData.append("photo", photo);

            await uploadCandidate(formData);

            setSnackbar({
                open: true,
                severity: "success",
                message: "Candidate uploaded successfully.",
            });

            setCandidate(initialCandidate);
            setResume(null);
            setPhoto(null);

        } catch (error) {

            console.error(error);

            setSnackbar({
                open: true,
                severity: "error",
                message:
                    error.response?.data?.detail ||
                    "Failed to upload candidate.",
            });

        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <style>{`
                @keyframes cf-spin {
                    to { transform: rotate(360deg); }
                }
                .cf-spinner {
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    border: 2px solid rgba(27,27,27,0.25);
                    border-top-color: #1B1B1B;
                    animation: cf-spin 0.7s linear infinite;
                    display: inline-block;
                    margin-right: 10px;
                    vertical-align: middle;
                }
                .cf-submit-btn {
                    transition: transform 0.15s ease, box-shadow 0.25s ease, filter 0.2s ease;
                }
                .cf-submit-btn:hover:not(:disabled) {
                    transform: translateY(-1px);
                    box-shadow: 0 10px 24px rgba(201,162,39,0.35);
                    filter: brightness(1.06);
                }
                .cf-submit-btn:active:not(:disabled) {
                    transform: translateY(0) scale(0.99);
                }
                @media (prefers-reduced-motion: reduce) {
                    .cf-spinner, .cf-submit-btn { animation: none !important; }
                }
            `}</style>

            {/*
                elevation 0, transparent background, no border: this form is
                meant to sit inside the parchment card the parent page already
                provides, instead of stacking a second white card on top of it.
                If this component is ever used somewhere without that outer
                card, swap backgroundColor back to "#fff" and add a border.
            */}
            <Paper
                elevation={0}
                sx={{
                    p: 0,
                    borderRadius: 3,
                    border: "none",
                    backgroundColor: "transparent",
                }}
            >

                <Typography
                    variant="h5"
                    fontWeight={700}
                    mb={1}
                    sx={{ color: "#1B1B1B" }}
                >
                    Candidate Information
                </Typography>

                <Typography
                    mb={4}
                    sx={{ color: "rgba(27,27,27,0.6)" }}
                >
                    Fill in the candidate details and upload the required files.
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                >

                    <Grid container spacing={3}>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                required
                                label="Full Name"
                                name="full_name"
                                value={candidate.full_name}
                                onChange={handleChange}
                                sx={fieldSx}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                required
                                type="email"
                                label="Email Address"
                                name="email"
                                value={candidate.email}
                                onChange={handleChange}
                                sx={fieldSx}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                required
                                label="Phone Number"
                                name="phone"
                                value={candidate.phone}
                                onChange={handleChange}
                                sx={fieldSx}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                required
                                label="Applied Position"
                                name="position"
                                value={candidate.position}
                                onChange={handleChange}
                                sx={fieldSx}
                            />
                        </Grid>

                        <Grid size={{ xs: 12}}>
                            <TextField
                                fullWidth
                                multiline
                                rows={3}
                                label="Address"
                                name="address"
                                value={candidate.address}
                                onChange={handleChange}
                                sx={fieldSx}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <ResumeUpload
                                file={resume}
                                setFile={setResume}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <PhotoUpload
                                file={photo}
                                setFile={setPhoto}
                            />
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    mt: 2,
                                }}
                            >
                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    disabled={loading}
                                    className="cf-submit-btn"
                                    sx={{
                                        px: 6,
                                        py: 1.5,
                                        borderRadius: 2,
                                        textTransform: "none",
                                        fontSize: 16,
                                        fontWeight: 600,
                                        minWidth: 260,
                                        background: "linear-gradient(180deg, #D9B84A 0%, #B3901F 100%)",
                                        color: "#1B1B1B",
                                        boxShadow: "0 6px 16px rgba(179,144,31,0.35)",
                                        "&:hover": {
                                            background: "linear-gradient(180deg, #E0C158 0%, #BC9A28 100%)",
                                        },
                                        "&.Mui-disabled": {
                                            color: "#1B1B1B",
                                            opacity: 0.75,
                                        },
                                    }}
                                >
                                    {loading ? (
                                        <>
                                            <span className="cf-spinner" />
                                            Uploading...
                                        </>
                                    ) : (
                                        "Upload Candidate"
                                    )}
                                </Button>
                            </Box>
                        </Grid>

                    </Grid>

                </Box>

            </Paper>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() =>
                    setSnackbar({
                        ...snackbar,
                        open: false,
                    })
                }
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
            >
                <Alert
                    severity={snackbar.severity}
                    variant="filled"
                    onClose={() =>
                        setSnackbar({
                            ...snackbar,
                            open: false,
                        })
                    }
                    sx={{
                        borderRadius: 2,
                        boxShadow: "0 12px 24px rgba(0,0,0,0.25)",
                    }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    );
}