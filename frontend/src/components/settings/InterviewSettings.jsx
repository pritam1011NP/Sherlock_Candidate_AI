import { useEffect, useState } from "react";

import {
    Box,
    Paper,
    Typography,
    Grid,
    TextField,
    Slider,
    Switch,
    FormControlLabel,
    Divider,
    Stack,
    Button,
    Snackbar,
    Alert,
    CircularProgress,
} from "@mui/material";

import SaveIcon from "@mui/icons-material/Save";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

import {
    getInterviewSettings,
    updateInterviewSettings,
    resetInterviewSettings,
} from "../../api/interviewSettingsApi";

export default function InterviewSettings() {

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [settings, setSettings] = useState(null);

    const [snackbar, setSnackbar] = useState({

        open: false,

        severity: "success",

        message: "",

    });

    useEffect(() => {

        loadSettings();

    }, []);

    async function loadSettings() {

        try {

            const data = await getInterviewSettings();

            setSettings(data);

        }

        catch {

            setSnackbar({

                open: true,

                severity: "error",

                message: "Unable to load Interview Settings",

            });

        }

        finally {

            setLoading(false);

        }

    }

    function handleChange(field, value) {

        setSettings({

            ...settings,

            [field]: value,

        });

    }

    async function handleSave() {

        setSaving(true);

        try {

            await updateInterviewSettings(settings);

            setSnackbar({

                open: true,

                severity: "success",

                message: "Interview Settings Saved",

            });

        }

        catch {

            setSnackbar({

                open: true,

                severity: "error",

                message: "Save Failed",

            });

        }

        finally {

            setSaving(false);

        }

    }

    async function handleReset() {

        const data = await resetInterviewSettings();

        setSettings(data);

        setSnackbar({

            open: true,

            severity: "success",

            message: "Defaults Restored",

        });

    }

    if (loading) {

        return (

            <Box
                display="flex"
                justifyContent="center"
                mt={8}
            >

                <CircularProgress />

            </Box>

        );

    }

    return (

        <Box>

            <Typography
                variant="h5"
                fontWeight={700}
                mb={3}
            >
                Interview Configuration
            </Typography>

            <Paper
                sx={{
                    p: 4,
                    borderRadius: 4,
                }}
            >

                <Grid container spacing={4}>

                    <Grid item xs={12} md={6}>

                        <TextField
                            fullWidth
                            label="Interview Duration (minutes)"
                            type="number"
                            value={settings.interview_duration}
                            onChange={(e) =>
                                handleChange(
                                    "interview_duration",
                                    Number(e.target.value)
                                )
                            }
                        />

                    </Grid>

                    <Grid item xs={12} md={6}>

                        <TextField
                            fullWidth
                            label="Maximum Warnings"
                            type="number"
                            value={settings.max_warnings}
                            onChange={(e) =>
                                handleChange(
                                    "max_warnings",
                                    Number(e.target.value)
                                )
                            }
                        />

                    </Grid>

                    <Grid item xs={12}>

                        <Typography gutterBottom>
                            Passing Score
                        </Typography>

                        <Slider
                            value={settings.passing_score}
                            min={0}
                            max={100}
                            valueLabelDisplay="auto"
                            onChange={(e, value) =>
                                handleChange(
                                    "passing_score",
                                    value
                                )
                            }
                        />

                    </Grid>

                    <Grid item xs={12}>

                        <Divider sx={{ my: 1 }} />

                        <Typography
                            variant="h6"
                            mb={2}
                        >
                            AI Monitoring
                        </Typography>

                    </Grid>

                    <Grid item xs={6}>

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={settings.face_verification}
                                    onChange={(e) =>
                                        handleChange(
                                            "face_verification",
                                            e.target.checked
                                        )
                                    }
                                />
                            }
                            label="Face Verification"
                        />

                    </Grid>

                    <Grid item xs={6}>

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={settings.eye_tracking}
                                    onChange={(e) =>
                                        handleChange(
                                            "eye_tracking",
                                            e.target.checked
                                        )
                                    }
                                />
                            }
                            label="Eye Tracking"
                        />

                    </Grid>

                    <Grid item xs={6}>

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={settings.multiple_face_detection}
                                    onChange={(e) =>
                                        handleChange(
                                            "multiple_face_detection",
                                            e.target.checked
                                        )
                                    }
                                />
                            }
                            label="Multiple Face Detection"
                        />

                    </Grid>

                    <Grid item xs={6}>

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={settings.tab_switch_detection}
                                    onChange={(e) =>
                                        handleChange(
                                            "tab_switch_detection",
                                            e.target.checked
                                        )
                                    }
                                />
                            }
                            label="Tab Switching Detection"
                        />

                    </Grid>

                    <Grid item xs={6}>

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={settings.fullscreen_required}
                                    onChange={(e) =>
                                        handleChange(
                                            "fullscreen_required",
                                            e.target.checked
                                        )
                                    }
                                />
                            }
                            label="Require Fullscreen"
                        />

                    </Grid>

                    <Grid item xs={6}>

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={settings.block_copy_paste}
                                    onChange={(e) =>
                                        handleChange(
                                            "block_copy_paste",
                                            e.target.checked
                                        )
                                    }
                                />
                            }
                            label="Block Copy / Paste"
                        />

                    </Grid>

                    <Grid item xs={6}>

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={settings.auto_submit}
                                    onChange={(e) =>
                                        handleChange(
                                            "auto_submit",
                                            e.target.checked
                                        )
                                    }
                                />
                            }
                            label="Auto Submit"
                        />

                    </Grid>

                    <Grid item xs={6}>

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={settings.record_video}
                                    onChange={(e) =>
                                        handleChange(
                                            "record_video",
                                            e.target.checked
                                        )
                                    }
                                />
                            }
                            label="Record Video"
                        />

                    </Grid>

                    <Grid item xs={12}>

                        <Stack
                            direction="row"
                            spacing={2}
                            mt={2}
                        >

                            <Button
                                variant="contained"
                                startIcon={<SaveIcon />}
                                onClick={handleSave}
                                disabled={saving}
                            >
                                Save Settings
                            </Button>

                            <Button
                                variant="outlined"
                                color="error"
                                startIcon={<RestartAltIcon />}
                                onClick={handleReset}
                            >
                                Reset
                            </Button>

                        </Stack>

                    </Grid>

                </Grid>

            </Paper>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() =>
                    setSnackbar({
                        ...snackbar,
                        open: false,
                    })
                }
            >

                <Alert
                    severity={snackbar.severity}
                    variant="filled"
                >
                    {snackbar.message}
                </Alert>

            </Snackbar>

        </Box>

    );

}