import { useEffect, useState } from "react";

import {
    Paper,
    Typography,
    TextField,
    MenuItem,
    FormControlLabel,
    Switch,
    Button,
    Stack,
    Snackbar,
    Alert,
    CircularProgress,
    Box,
    Divider,
} from "@mui/material";

import SaveIcon from "@mui/icons-material/Save";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import PaletteIcon from "@mui/icons-material/Palette";
import FormatSizeIcon from "@mui/icons-material/FormatSize";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";

import {
    getAppearanceSettings,
    updateAppearanceSettings,
    resetAppearanceSettings,
} from "../../api/appearanceSettingsApi";

import { useAppearance } from "../../context/AppearanceContext";

export default function AppearanceSettings() {

    /*
     * Global appearance context.
     *
     * updateSettings() updates the settings used by
     * ThemeProvider.jsx.
     */
    const {
        updateSettings,
    } = useAppearance();

    const [settings, setSettings] = useState(null);

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [snackbar, setSnackbar] = useState({
        open: false,
        severity: "success",
        message: "",
    });


    /* --------------------------------------------------
       LOAD SETTINGS
    -------------------------------------------------- */

    useEffect(() => {

        loadSettings();

    }, []);


    async function loadSettings() {

        try {

            const data =
                await getAppearanceSettings();

            setSettings(data);

        } catch (error) {

            console.error(
                "Appearance settings load error:",
                error
            );

            setSnackbar({
                open: true,
                severity: "error",
                message:
                    error?.response?.data?.detail ||
                    "Unable to load appearance settings",
            });

        } finally {

            setLoading(false);

        }

    }


    /* --------------------------------------------------
       HANDLE FIELD CHANGE
    -------------------------------------------------- */

    function handleChange(field, value) {

        setSettings((prev) => ({

            ...prev,

            [field]: value,

        }));

    }


    /* --------------------------------------------------
       SAVE SETTINGS
    -------------------------------------------------- */

    async function handleSave() {

        if (!settings) return;

        setSaving(true);

        try {

            console.log(
                "Saving appearance settings:",
                settings
            );

            /*
             * Send settings to FastAPI backend.
             */
            const updated =
                await updateAppearanceSettings(
                    settings
                );

            console.log(
                "Appearance settings updated:",
                updated
            );

            /*
             * IMPORTANT:
             *
             * Update the global AppearanceContext.
             *
             * This causes:
             *
             * AppearanceContext
             *        ↓
             * AppTheme
             *        ↓
             * buildTheme()
             *        ↓
             * MUI ThemeProvider
             *
             * to update immediately.
             */
            updateSettings(updated);

            /*
             * Keep local state synchronized.
             */
            setSettings(updated);

            setSnackbar({
                open: true,
                severity: "success",
                message:
                    "Appearance settings saved successfully",
            });

        } catch (error) {

            console.error(
                "Appearance settings save error:",
                error
            );

            console.error(
                "Backend response:",
                error?.response?.data
            );

            setSnackbar({
                open: true,
                severity: "error",
                message:
                    error?.response?.data?.detail ||
                    "Failed to save appearance settings",
            });

        } finally {

            setSaving(false);

        }

    }


    /* --------------------------------------------------
       RESET SETTINGS
    -------------------------------------------------- */

    async function handleReset() {

        setSaving(true);

        try {

            const data =
                await resetAppearanceSettings();

            console.log(
                "Appearance settings reset:",
                data
            );

            /*
             * Update local settings.
             */
            setSettings(data);

            /*
             * IMPORTANT:
             *
             * Update global appearance context too.
             */
            updateSettings(data);

            setSnackbar({
                open: true,
                severity: "success",
                message:
                    "Default settings restored",
            });

        } catch (error) {

            console.error(
                "Appearance settings reset error:",
                error
            );

            console.error(
                "Backend response:",
                error?.response?.data
            );

            setSnackbar({
                open: true,
                severity: "error",
                message:
                    error?.response?.data?.detail ||
                    "Unable to reset appearance settings",
            });

        } finally {

            setSaving(false);

        }

    }


    /* --------------------------------------------------
       LOADING
    -------------------------------------------------- */

    if (loading) {

        return (

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: 300,
                }}
            >

                <CircularProgress />

            </Box>

        );

    }


    /* --------------------------------------------------
       ERROR STATE
    -------------------------------------------------- */

    if (!settings) {

        return (

            <Alert severity="error">

                Appearance settings could not be loaded.

            </Alert>

        );

    }


    /* --------------------------------------------------
       UI
    -------------------------------------------------- */

    return (

        <Box>

            {/* HEADER */}

            <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{ mb: 1 }}
            >

                <Box
                    sx={{
                        width: 46,
                        height: 46,
                        borderRadius: 2.5,
                        bgcolor: "#EFF6FF",
                        color: "#2563EB",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >

                    <PaletteIcon />

                </Box>

                <Box>

                    <Typography
                        variant="h5"
                        fontWeight={700}
                    >
                        Appearance
                    </Typography>

                    <Typography
                        color="text.secondary"
                        fontSize={14}
                    >
                        Customize the look and behaviour of
                        Sherlock Candidate AI.
                    </Typography>

                </Box>

            </Stack>


            <Paper
                elevation={0}
                sx={{
                    mt: 3,
                    p: 3,
                    borderRadius: 3,
                    border:
                        "1px solid #E2E8F0",
                    backgroundColor:
                        "background.paper",
                }}
            >

                {/* --------------------------------------------------
                    BASIC APPEARANCE
                -------------------------------------------------- */}

                <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ mb: 2 }}
                >

                    <PaletteIcon
                        sx={{
                            fontSize: 20,
                            color: "primary.main",
                        }}
                    />

                    <Typography
                        fontWeight={700}
                    >
                        Basic Appearance
                    </Typography>

                </Stack>


                <Divider sx={{ mb: 3 }} />


                {/* THEME */}

                <TextField
                    select
                    fullWidth
                    label="Theme"
                    value={
                        settings.theme ||
                        "Light"
                    }
                    onChange={(e) =>
                        handleChange(
                            "theme",
                            e.target.value
                        )
                    }
                    sx={{ mb: 3 }}
                >

                    <MenuItem value="Light">
                        Light
                    </MenuItem>

                    <MenuItem value="Dark">
                        Dark
                    </MenuItem>

                    <MenuItem value="System">
                        System
                    </MenuItem>

                </TextField>


                {/* PRIMARY COLOR */}

                <TextField
                    fullWidth
                    label="Primary Color"
                    value={
                        settings.primary_color ||
                        "#2563EB"
                    }
                    onChange={(e) =>
                        handleChange(
                            "primary_color",
                            e.target.value
                        )
                    }
                    sx={{ mb: 3 }}
                />


                {/* FONT SIZE */}

                <TextField
                    select
                    fullWidth
                    label="Font Size"
                    value={
                        settings.font_size ||
                        "Medium"
                    }
                    onChange={(e) =>
                        handleChange(
                            "font_size",
                            e.target.value
                        )
                    }
                    sx={{ mb: 3 }}
                    InputProps={{
                        startAdornment: (
                            <FormatSizeIcon
                                sx={{
                                    mr: 1,
                                    color:
                                        "text.secondary",
                                }}
                            />
                        ),
                    }}
                >

                    <MenuItem value="Small">
                        Small
                    </MenuItem>

                    <MenuItem value="Medium">
                        Medium
                    </MenuItem>

                    <MenuItem value="Large">
                        Large
                    </MenuItem>

                </TextField>


                {/* --------------------------------------------------
                    DISPLAY OPTIONS
                -------------------------------------------------- */}

                <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{
                        mt: 4,
                        mb: 2,
                    }}
                >

                    <DashboardCustomizeIcon
                        sx={{
                            fontSize: 20,
                            color: "primary.main",
                        }}
                    />

                    <Typography
                        fontWeight={700}
                    >
                        Display Options
                    </Typography>

                </Stack>


                <Divider sx={{ mb: 2 }} />


                <Stack spacing={0.5}>

                    <FormControlLabel
                        control={
                            <Switch
                                checked={
                                    Boolean(
                                        settings.compact_mode
                                    )
                                }
                                onChange={(e) =>
                                    handleChange(
                                        "compact_mode",
                                        e.target.checked
                                    )
                                }
                            />
                        }
                        label="Compact Mode"
                    />


                    <FormControlLabel
                        control={
                            <Switch
                                checked={
                                    Boolean(
                                        settings.sidebar_collapsed
                                    )
                                }
                                onChange={(e) =>
                                    handleChange(
                                        "sidebar_collapsed",
                                        e.target.checked
                                    )
                                }
                            />
                        }
                        label="Collapsed Sidebar"
                    />


                    <FormControlLabel
                        control={
                            <Switch
                                checked={
                                    Boolean(
                                        settings.animations
                                    )
                                }
                                onChange={(e) =>
                                    handleChange(
                                        "animations",
                                        e.target.checked
                                    )
                                }
                            />
                        }
                        label="Animations"
                    />


                    <FormControlLabel
                        control={
                            <Switch
                                checked={
                                    Boolean(
                                        settings.rounded_corners
                                    )
                                }
                                onChange={(e) =>
                                    handleChange(
                                        "rounded_corners",
                                        e.target.checked
                                    )
                                }
                            />
                        }
                        label="Rounded Cards"
                    />


                    <FormControlLabel
                        control={
                            <Switch
                                checked={
                                    Boolean(
                                        settings.card_shadow
                                    )
                                }
                                onChange={(e) =>
                                    handleChange(
                                        "card_shadow",
                                        e.target.checked
                                    )
                                }
                            />
                        }
                        label="Card Shadow"
                    />


                    <FormControlLabel
                        control={
                            <Switch
                                checked={
                                    Boolean(
                                        settings.dense_tables
                                    )
                                }
                                onChange={(e) =>
                                    handleChange(
                                        "dense_tables",
                                        e.target.checked
                                    )
                                }
                            />
                        }
                        label="Dense Tables"
                    />


                    <FormControlLabel
                        control={
                            <Switch
                                checked={
                                    Boolean(
                                        settings.show_dashboard_background
                                    )
                                }
                                onChange={(e) =>
                                    handleChange(
                                        "show_dashboard_background",
                                        e.target.checked
                                    )
                                }
                            />
                        }
                        label="Dashboard Background"
                    />

                </Stack>


                {/* --------------------------------------------------
                    ACTIONS
                -------------------------------------------------- */}

                <Stack
                    direction={{
                        xs: "column",
                        sm: "row",
                    }}
                    spacing={2}
                    justifyContent="flex-end"
                    sx={{ mt: 4 }}
                >

                    <Button
                        variant="outlined"
                        color="error"
                        startIcon={
                            <RestartAltIcon />
                        }
                        onClick={handleReset}
                        disabled={saving}
                        sx={{
                            minWidth: 120,
                            borderRadius: 2,
                            textTransform:
                                "none",
                            fontWeight: 700,
                        }}
                    >
                        Reset
                    </Button>


                    <Button
                        variant="contained"
                        startIcon={
                            saving ? (
                                <CircularProgress
                                    size={18}
                                    color="inherit"
                                />
                            ) : (
                                <SaveIcon />
                            )
                        }
                        onClick={handleSave}
                        disabled={saving}
                        sx={{
                            minWidth: 140,
                            borderRadius: 2,
                            textTransform:
                                "none",
                            fontWeight: 700,
                        }}
                    >

                        {saving
                            ? "Saving..."
                            : "Save Changes"}

                    </Button>

                </Stack>

            </Paper>


            {/* --------------------------------------------------
                SNACKBAR
            -------------------------------------------------- */}

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() =>
                    setSnackbar((prev) => ({
                        ...prev,
                        open: false,
                    }))
                }
            >

                <Alert
                    severity={
                        snackbar.severity
                    }
                    variant="filled"
                    onClose={() =>
                        setSnackbar((prev) => ({
                            ...prev,
                            open: false,
                        }))
                    }
                >

                    {snackbar.message}

                </Alert>

            </Snackbar>

        </Box>

    );
}