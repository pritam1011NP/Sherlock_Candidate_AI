import { useEffect, useState } from "react";

import {
    Box,
    Paper,
    Typography,
    Grid,
    TextField,
    MenuItem,
    Slider,
    Switch,
    FormControlLabel,
    Divider,
    Button,
    Stack,
    Snackbar,
    Alert,
    CircularProgress,
} from "@mui/material";

import SaveIcon from "@mui/icons-material/Save";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

import {
    getAISettings,
    updateAISettings,
    resetAISettings,
} from "../../api/aiSettingsApi";

import MatchingSettings from "./MatchingSettings";

export default function AISettings() {

    const [settings, setSettings] = useState(null);

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

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

            const response = await getAISettings();

            setSettings(response);

        } catch {

            setSnackbar({
                open: true,
                severity: "error",
                message: "Unable to load settings",
            });

        } finally {

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

            await updateAISettings(settings);

            setSnackbar({
                open: true,
                severity: "success",
                message: "Settings Saved Successfully",
            });

        } catch {

            setSnackbar({
                open: true,
                severity: "error",
                message: "Unable to save settings",
            });

        } finally {

            setSaving(false);

        }

    }

    async function handleReset() {

        const response = await resetAISettings();

        setSettings(response);

        setSnackbar({
            open: true,
            severity: "success",
            message: "Default Settings Restored",
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
                AI Configuration
            </Typography>

            <Paper
                sx={{
                    p: 4,
                    borderRadius: 4,
                }}
            >

                <Grid container spacing={4}>

                    {/* Provider */}

                    <Grid item xs={12} md={6}>

                        <TextField
                            select
                            fullWidth
                            label="AI Provider"
                            value={settings.provider}
                            onChange={(e) =>
                                handleChange(
                                    "provider",
                                    e.target.value
                                )
                            }
                        >
                            <MenuItem value="OpenAI">
                                OpenAI
                            </MenuItem>

                            <MenuItem value="Gemini">
                                Gemini
                            </MenuItem>

                            <MenuItem value="Claude">
                                Claude
                            </MenuItem>

                        </TextField>

                    </Grid>

                    <Grid item xs={12} md={6}>

                        <TextField
                            fullWidth
                            label="Model"
                            value={settings.model}
                            onChange={(e) =>
                                handleChange(
                                    "model",
                                    e.target.value
                                )
                            }
                        />

                    </Grid>

                    <Grid item xs={12}>

                        <TextField
                            fullWidth
                            type="password"
                            label="API Key"
                            value={settings.api_key || ""}
                            onChange={(e) =>
                                handleChange(
                                    "api_key",
                                    e.target.value
                                )
                            }
                        />

                    </Grid>

                    <Grid item xs={12}>

                        <Typography gutterBottom>
                            Temperature
                        </Typography>

                        <Slider
                            value={settings.temperature}
                            min={0}
                            max={1}
                            step={0.1}
                            valueLabelDisplay="auto"
                            onChange={(e, value) =>
                                handleChange(
                                    "temperature",
                                    value
                                )
                            }
                        />

                    </Grid>

                    <Grid item xs={12} md={6}>

                        <TextField
                            fullWidth
                            type="number"
                            label="Max Tokens"
                            value={settings.max_tokens}
                            onChange={(e) =>
                                handleChange(
                                    "max_tokens",
                                    Number(e.target.value)
                                )
                            }
                        />

                    </Grid>

                    <Grid item xs={12} md={6}>

                        <TextField
                            fullWidth
                            type="number"
                            label="Request Timeout (seconds)"
                            value={settings.timeout || 60}
                            onChange={(e) =>
                                handleChange(
                                    "timeout",
                                    Number(e.target.value)
                                )
                            }
                        />

                    </Grid>

                    {/* Resume AI */}

                    <Grid item xs={12}>

                        <Divider sx={{ my: 2 }} />

                        <Typography
                            variant="h6"
                            mb={2}
                        >
                            Resume AI
                        </Typography>

                    </Grid>

                    <Grid item xs={6}>

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={settings.enable_resume_parser}
                                    onChange={(e) =>
                                        handleChange(
                                            "enable_resume_parser",
                                            e.target.checked
                                        )
                                    }
                                />
                            }
                            label="Resume Parser"
                        />

                    </Grid>

                    <Grid item xs={6}>

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={settings.enable_skill_extraction}
                                    onChange={(e) =>
                                        handleChange(
                                            "enable_skill_extraction",
                                            e.target.checked
                                        )
                                    }
                                />
                            }
                            label="Skill Extraction"
                        />

                    </Grid>

                    <Grid item xs={6}>

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={settings.enable_experience_analysis}
                                    onChange={(e) =>
                                        handleChange(
                                            "enable_experience_analysis",
                                            e.target.checked
                                        )
                                    }
                                />
                            }
                            label="Experience Analysis"
                        />

                    </Grid>

                    <Grid item xs={6}>

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={settings.enable_education_analysis}
                                    onChange={(e) =>
                                        handleChange(
                                            "enable_education_analysis",
                                            e.target.checked
                                        )
                                    }
                                />
                            }
                            label="Education Analysis"
                        />

                    </Grid>

                    {/* Interview AI */}

                    <Grid item xs={12}>

                        <Divider sx={{ my: 2 }} />

                        <Typography
                            variant="h6"
                            mb={2}
                        >
                            Interview AI
                        </Typography>

                    </Grid>

                    <Grid item xs={6}>

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={settings.enable_face_detection}
                                    onChange={(e) =>
                                        handleChange(
                                            "enable_face_detection",
                                            e.target.checked
                                        )
                                    }
                                />
                            }
                            label="Face Detection"
                        />

                    </Grid>

                    <Grid item xs={6}>

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={settings.enable_voice_analysis}
                                    onChange={(e) =>
                                        handleChange(
                                            "enable_voice_analysis",
                                            e.target.checked
                                        )
                                    }
                                />
                            }
                            label="Voice Analysis"
                        />

                    </Grid>

                    <Grid item xs={6}>

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={settings.enable_cheating_detection}
                                    onChange={(e) =>
                                        handleChange(
                                            "enable_cheating_detection",
                                            e.target.checked
                                        )
                                    }
                                />
                            }
                            label="Cheating Detection"
                        />

                    </Grid>

                    <Grid item xs={6}>

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={settings.enable_ai_recommendation}
                                    onChange={(e) =>
                                        handleChange(
                                            "enable_ai_recommendation",
                                            e.target.checked
                                        )
                                    }
                                />
                            }
                            label="AI Recommendation"
                        />

                    </Grid>

                </Grid>

            </Paper>

            <Box mt={4}>
                <MatchingSettings
                settings={settings}

                onChange={handleChange} 
                />
            </Box>

            <Paper
                sx={{
                    mt: 4,
                    p: 3,
                    borderRadius: 4,
                }}
            >

                <Typography
                    variant="h6"
                    mb={2}
                >
                    Actions
                </Typography>

                <Stack
                    direction="row"
                    spacing={2}
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
                        Reset to Default
                    </Button>

                </Stack>

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