import { useEffect, useState } from "react";

import {
    Paper,
    Typography,
    Grid,
    Switch,
    FormControlLabel,
    Divider,
    Button,
    Stack,
    Snackbar,
    Alert,
    CircularProgress,
    Box,
} from "@mui/material";

import SaveIcon from "@mui/icons-material/Save";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

import {
    getNotificationSettings,
    updateNotificationSettings,
    resetNotificationSettings,
} from "../../api/notificationSettingsApi";

export default function NotificationSettings() {

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

            const data = await getNotificationSettings();

            setSettings(data);

        }

        catch {

            setSnackbar({

                open: true,

                severity: "error",

                message: "Unable to load settings",

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

            await updateNotificationSettings(settings);

            setSnackbar({

                open: true,

                severity: "success",

                message: "Settings Saved",

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

        try {

            const data = await resetNotificationSettings();

            setSettings(data);

            setSnackbar({

                open: true,

                severity: "success",

                message: "Default Settings Restored",

            });

        }

        catch {

            setSnackbar({

                open: true,

                severity: "error",

                message: "Reset Failed",

            });

        }

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

                Notification Settings

            </Typography>

            <Paper

                sx={{

                    p:4,

                    borderRadius:4,

                }}

            >

                <Grid container spacing={3}>

                    <Grid item xs={12}>

                        <Typography variant="h6">

                            General Notifications

                        </Typography>

                        <Divider sx={{ mt:1, mb:2 }} />

                    </Grid>

                    <Grid item xs={12} md={6}>

                        <FormControlLabel

                            control={

                                <Switch

                                    checked={settings.email_notifications}

                                    onChange={(e)=>

                                        handleChange(

                                            "email_notifications",

                                            e.target.checked,

                                        )

                                    }

                                />

                            }

                            label="Email Notifications"

                        />

                    </Grid>

                    <Grid item xs={12} md={6}>

                        <FormControlLabel

                            control={

                                <Switch

                                    checked={settings.sms_notifications}

                                    onChange={(e)=>

                                        handleChange(

                                            "sms_notifications",

                                            e.target.checked,

                                        )

                                    }

                                />

                            }

                            label="SMS Notifications"

                        />

                    </Grid>

                    <Grid item xs={12} md={6}>

                        <FormControlLabel

                            control={

                                <Switch

                                    checked={settings.push_notifications}

                                    onChange={(e)=>

                                        handleChange(

                                            "push_notifications",

                                            e.target.checked,

                                        )

                                    }

                                />

                            }

                            label="Push Notifications"

                        />

                    </Grid>

                    <Grid item xs={12}>

                        <Typography
                            variant="h6"
                            mt={3}
                        >

                            Recruitment Alerts

                        </Typography>

                        <Divider sx={{ mt:1, mb:2 }} />

                    </Grid>

                    {[
                        ["candidate_uploaded","Candidate Uploaded"],
                        ["interview_completed","Interview Completed"],
                        ["candidate_shortlisted","Candidate Shortlisted"],
                        ["candidate_rejected","Candidate Rejected"],
                        ["weekly_report","Weekly Report"],
                        ["monthly_report","Monthly Report"],
                        ["security_alerts","Security Alerts"],
                    ].map(([key,label])=>(

                        <Grid
                            item
                            xs={12}
                            md={6}
                            key={key}
                        >

                            <FormControlLabel

                                control={

                                    <Switch

                                        checked={settings[key]}

                                        onChange={(e)=>

                                            handleChange(

                                                key,

                                                e.target.checked,

                                            )

                                        }

                                    />

                                }

                                label={label}

                            />

                        </Grid>

                    ))}

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

                onClose={()=>

                    setSnackbar({

                        ...snackbar,

                        open:false,

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