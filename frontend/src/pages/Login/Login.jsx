import { useState } from "react";
import {
    TextField,
    Button,
    Paper,
    Typography,
    IconButton,
    InputAdornment,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { login } from "../../api/authApi";
import useAuth from "../../hooks/useAuth";

export default function Login() {

    const navigate = useNavigate();
    const { setUser } = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [shake, setShake] = useState(false);

    async function handleSubmit(e) {

        e.preventDefault();

        setLoading(true);
        setError("");

        try {

            const data = await login({
                username,
                password,
            });

            console.log("========== LOGIN RESPONSE ==========");
            console.log(data);

            console.log("Access Token:", data.access_token);
            console.log("Refresh Token:", data.refresh_token);

            // Save Tokens
            localStorage.setItem(
                "access_token",
                data.access_token
            );

            localStorage.setItem(
                "refresh_token",
                data.refresh_token
            );

            console.log("========== LOCAL STORAGE ==========");
            console.log(
                "Saved Access Token:",
                localStorage.getItem("access_token")
            );

            console.log(
                "Saved Refresh Token:",
                localStorage.getItem("refresh_token")
            );

            console.log("All Local Storage Keys:");
            console.log(Object.entries(localStorage));

            setUser({
                username,
                role: "admin",
            });

            navigate("/dashboard");

        } catch (err) {

            console.error("========== LOGIN ERROR ==========");
            console.error(err);

            setError(
                err.response?.data?.detail ||
                "Login failed"
            );

            setShake(true);
            setTimeout(() => setShake(false), 500);

        } finally {

            setLoading(false);

        }
    }

    return (

        <div
            style={{
                position: "fixed",
                inset: 0,
                width: "100vw",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "auto",
                background:
                    "radial-gradient(ellipse at 50% 0%, #16203a 0%, #0b0f1a 60%, #080b12 100%)",
                fontFamily: "'Space Grotesk', sans-serif",
            }}
        >
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Space+Grotesk:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap');

                @keyframes fadeSlideUp {
                    from { opacity: 0; transform: translateY(28px) scale(0.98); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                @keyframes sweep {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes shakeCard {
                    10%, 90% { transform: translateX(-2px); }
                    20%, 80% { transform: translateX(4px); }
                    30%, 50%, 70% { transform: translateX(-8px); }
                    40%, 60% { transform: translateX(8px); }
                }
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
                @keyframes glint {
                    0%, 100% { opacity: 0.35; }
                    50% { opacity: 1; }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .sc-grid {
                    position: absolute;
                    inset: 0;
                    background-image:
                        linear-gradient(rgba(201,162,39,0.05) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(201,162,39,0.05) 1px, transparent 1px);
                    background-size: 42px 42px;
                    mask-image: radial-gradient(ellipse at center, black 0%, transparent 75%);
                }
                .sc-sweep {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 1400px;
                    height: 1400px;
                    margin-top: -700px;
                    margin-left: -700px;
                    background: conic-gradient(from 0deg, rgba(201,162,39,0.10), transparent 18%, transparent 100%);
                    animation: sweep 14s linear infinite;
                    pointer-events: none;
                }
                .sc-card {
                    animation: fadeSlideUp 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) both;
                }
                .sc-card.shake {
                    animation: shakeCard 0.5s cubic-bezier(.36,.07,.19,.97) both;
                }
                .sc-mono {
                    font-family: 'JetBrains Mono', monospace;
                }
                .sc-serif {
                    font-family: 'Playfair Display', serif;
                }
                .sc-glass {
                    animation: glint 2.8s ease-in-out infinite;
                }
                .sc-field .MuiOutlinedInput-root {
                    background: rgba(255,255,255,0.55);
                    transition: box-shadow 0.25s ease, background 0.25s ease, transform 0.15s ease;
                    border-radius: 6px;
                }
                .sc-field .MuiOutlinedInput-root:hover {
                    background: rgba(255,255,255,0.7);
                }
                .sc-field .MuiOutlinedInput-root.Mui-focused {
                    background: rgba(255,255,255,0.9);
                    box-shadow: 0 0 0 3px rgba(201,162,39,0.25);
                }
                .sc-field .MuiOutlinedInput-notchedOutline {
                    border-color: rgba(20,24,38,0.18);
                }
                .sc-field .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
                    border-color: #C9A227;
                    border-width: 1.5px;
                }
                .sc-btn {
                    position: relative;
                    overflow: hidden;
                    transition: transform 0.15s ease, box-shadow 0.25s ease, filter 0.2s ease;
                }
                .sc-btn:hover:not(:disabled) {
                    transform: translateY(-1px);
                    box-shadow: 0 10px 24px rgba(201,162,39,0.35);
                    filter: brightness(1.06);
                }
                .sc-btn:active:not(:disabled) {
                    transform: translateY(0px) scale(0.99);
                }
                .sc-spinner {
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    border: 2px solid rgba(11,15,26,0.25);
                    border-top-color: #0b0f1a;
                    animation: spin 0.7s linear infinite;
                    display: inline-block;
                    margin-right: 10px;
                    vertical-align: middle;
                }
                .sc-error {
                    animation: fadeIn 0.25s ease both;
                    border-left: 3px solid #b3432b;
                    padding-left: 10px;
                }
                @media (prefers-reduced-motion: reduce) {
                    .sc-sweep, .sc-glass, .sc-card, .sc-card.shake, .sc-spinner, .sc-error {
                        animation: none !important;
                    }
                }
            `}</style>

            <div className="sc-grid" />
            <div className="sc-sweep" />

            <Paper
                elevation={0}
                className={`sc-card${shake ? " shake" : ""}`}
                sx={{
                    width: 420,
                    p: 5,
                    borderRadius: "10px",
                    position: "relative",
                    zIndex: 1,
                    background: "linear-gradient(180deg, #F7F2E7 0%, #F0E9D8 100%)",
                    boxShadow:
                        "0 30px 60px -15px rgba(0,0,0,0.55), 0 0 0 1px rgba(201,162,39,0.25)",
                    "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: "8%",
                        right: "8%",
                        height: "3px",
                        background:
                            "linear-gradient(90deg, transparent, #C9A227, transparent)",
                    },
                }}
            >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 4 }}>
                    <svg
                        className="sc-glass"
                        width="26"
                        height="26"
                        viewBox="0 0 24 24"
                        fill="none"
                        style={{ flexShrink: 0 }}
                    >
                        <circle cx="10.5" cy="10.5" r="6.5" stroke="#8A6A12" strokeWidth="2" />
                        <line x1="15.3" y1="15.3" x2="21" y2="21" stroke="#8A6A12" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <Typography
                        variant="h4"
                        className="sc-serif"
                        sx={{
                            fontWeight: 700,
                            color: "#1B1B1B",
                            textAlign: "center",
                            letterSpacing: "0.3px",
                        }}
                    >
                        Sherlock Candidate AI
                    </Typography>
                </div>

                <Typography
                    className="sc-mono"
                    sx={{
                        textAlign: "center",
                        fontSize: "11px",
                        letterSpacing: "2.5px",
                        color: "#8A6A12",
                        mb: 4,
                        textTransform: "uppercase",
                    }}
                >
                    Case access — authorized personnel only
                </Typography>

                <form onSubmit={handleSubmit}>

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Username"
                        value={username}
                        onChange={(e) =>
                            setUsername(e.target.value)
                        }
                        className="sc-field"
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        type={showPassword ? "text" : "password"}
                        label="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        className="sc-field"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword((v) => !v)}
                                        edge="end"
                                        size="small"
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                        sx={{ color: "#8A6A12" }}
                                    >
                                        {showPassword ? (
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                                <path d="M3 3L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                                <path d="M10.6 5.1C11.05 5.03 11.52 5 12 5c5 0 9 4.5 10 7-0.42 1.06-1.28 2.53-2.6 3.86M6.3 6.3C4.13 7.72 2.6 9.86 2 12c1 2.5 5 7 10 7 1.24 0 2.4-0.27 3.44-0.73" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                                <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                            </svg>
                                        ) : (
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                                <path d="M2 12C3 9.5 7 5 12 5C17 5 21 9.5 22 12C21 14.5 17 19 12 19C7 19 3 14.5 2 12Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                                                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                                            </svg>
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    {error && (
                        <Typography
                            color="error"
                            className="sc-mono sc-error"
                            sx={{ mt: 2, fontSize: "13px" }}
                        >
                            {error}
                        </Typography>
                    )}

                    <Button
                        fullWidth
                        variant="contained"
                        type="submit"
                        className="sc-btn"
                        disabled={loading}
                        sx={{
                            mt: 4,
                            py: 1.5,
                            background: "linear-gradient(180deg, #D9B84A 0%, #B3901F 100%)",
                            color: "#1B1B1B",
                            fontWeight: 600,
                            letterSpacing: "0.4px",
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
                                <span className="sc-spinner" />
                                Investigating...
                            </>
                        ) : (
                            "Login"
                        )}
                    </Button>

                </form>

            </Paper>

        </div>

    );
}