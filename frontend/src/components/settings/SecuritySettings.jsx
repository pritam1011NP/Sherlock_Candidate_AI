import { useState } from "react";

import {
    Box,
    Button,
    Divider,
    FormControlLabel,
    Switch,
    TextField,
    Typography,
    Stack,
} from "@mui/material";

import {
    Security,
    Lock,
    Key,
    Shield,
    Save,
} from "@mui/icons-material";

export default function SecuritySettings() {

    const [twoFactor, setTwoFactor] = useState(true);
    const [loginAlerts, setLoginAlerts] = useState(true);

    const [passwords, setPasswords] = useState({
        current: "",
        newPassword: "",
        confirm: "",
    });

    const handleChange = (field) => (event) => {

        setPasswords((prev) => ({
            ...prev,
            [field]: event.target.value,
        }));

    };

    return (

        <Box>

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
                        bgcolor: "#FFF7ED",
                        color: "#EA580C",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Security />
                </Box>

                <Box>

                    <Typography
                        fontSize={18}
                        fontWeight={700}
                        color="#0F172A"
                    >
                        Security & Access
                    </Typography>

                    <Typography
                        fontSize={13}
                        color="#64748B"
                        mt={0.3}
                    >
                        Protect your account and manage authentication
                        preferences.
                    </Typography>

                </Box>

            </Stack>


            {/* SECURITY STATUS */}

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
                    direction="row"
                    spacing={2}
                    alignItems="center"
                >

                    <Box
                        sx={{
                            width: 46,
                            height: 46,
                            borderRadius: "50%",
                            bgcolor: "#DCFCE7",
                            color: "#16A34A",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Shield />
                    </Box>

                    <Box>

                        <Typography
                            fontWeight={700}
                            color="#166534"
                        >
                            Your account is protected
                        </Typography>

                        <Typography
                            fontSize={13}
                            color="#64748B"
                            mt={0.3}
                        >
                            Security monitoring is currently active.
                        </Typography>

                    </Box>

                </Stack>

            </Box>


            {/* SECURITY OPTIONS */}

            <Typography
                fontSize={15}
                fontWeight={700}
                color="#0F172A"
                mb={1}
            >
                Security Preferences
            </Typography>

            <Box
                sx={{
                    border: "1px solid #E5E7EB",
                    borderRadius: 3,
                    overflow: "hidden",
                }}
            >

                <Box sx={{ p: 2.2 }}>

                    <Stack
                        direction="row"
                        spacing={2}
                        alignItems="center"
                    >

                        <Box
                            sx={{
                                width: 40,
                                height: 40,
                                borderRadius: 2,
                                bgcolor: "#EFF6FF",
                                color: "#2563EB",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Key fontSize="small" />
                        </Box>

                        <Box sx={{ flex: 1 }}>

                            <Typography
                                fontWeight={600}
                                color="#1E293B"
                            >
                                Two-factor authentication
                            </Typography>

                            <Typography
                                fontSize={12}
                                color="#64748B"
                                mt={0.3}
                            >
                                Add an extra layer of protection to your
                                account.
                            </Typography>

                        </Box>

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={twoFactor}
                                    onChange={(e) =>
                                        setTwoFactor(e.target.checked)
                                    }
                                />
                            }
                            label=""
                        />

                    </Stack>

                </Box>

                <Divider />

                <Box sx={{ p: 2.2 }}>

                    <Stack
                        direction="row"
                        spacing={2}
                        alignItems="center"
                    >

                        <Box
                            sx={{
                                width: 40,
                                height: 40,
                                borderRadius: 2,
                                bgcolor: "#F5F3FF",
                                color: "#7C3AED",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Security fontSize="small" />
                        </Box>

                        <Box sx={{ flex: 1 }}>

                            <Typography
                                fontWeight={600}
                                color="#1E293B"
                            >
                                Login alerts
                            </Typography>

                            <Typography
                                fontSize={12}
                                color="#64748B"
                                mt={0.3}
                            >
                                Receive notifications when a new login
                                is detected.
                            </Typography>

                        </Box>

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={loginAlerts}
                                    onChange={(e) =>
                                        setLoginAlerts(e.target.checked)
                                    }
                                />
                            }
                            label=""
                        />

                    </Stack>

                </Box>

            </Box>


            {/* PASSWORD */}

            <Box sx={{ mt: 4 }}>

                <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    mb={2}
                >

                    <Lock
                        sx={{
                            color: "#64748B",
                            fontSize: 20,
                        }}
                    />

                    <Typography
                        fontSize={15}
                        fontWeight={700}
                        color="#0F172A"
                    >
                        Change Password
                    </Typography>

                </Stack>

                <Stack spacing={2}>

                    <TextField
                        fullWidth
                        type="password"
                        label="Current Password"
                        value={passwords.current}
                        onChange={handleChange("current")}
                    />

                    <TextField
                        fullWidth
                        type="password"
                        label="New Password"
                        value={passwords.newPassword}
                        onChange={handleChange("newPassword")}
                    />

                    <TextField
                        fullWidth
                        type="password"
                        label="Confirm New Password"
                        value={passwords.confirm}
                        onChange={handleChange("confirm")}
                    />

                </Stack>

            </Box>


            {/* SAVE */}

            <Stack
                direction="row"
                justifyContent="flex-end"
                sx={{ mt: 4 }}
            >

                <Button
                    variant="contained"
                    startIcon={<Save />}
                    sx={{
                        minWidth: 150,
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: 700,
                        bgcolor: "#EA580C",
                        "&:hover": {
                            bgcolor: "#C2410C",
                        },
                    }}
                >
                    Save Security
                </Button>

            </Stack>

        </Box>

    );

}