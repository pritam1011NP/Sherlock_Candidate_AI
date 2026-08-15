import {
    createTheme,
} from "@mui/material/styles";

export default function buildTheme(settings) {

    /*
     * Backend values:
     *
     * Light
     * Dark
     * System
     *
     * MUI supports:
     *
     * light
     * dark
     */

    const selectedTheme =
        settings?.theme?.toLowerCase() || "light";

    let mode = "light";

    if (selectedTheme === "dark") {

        mode = "dark";

    } else if (selectedTheme === "system") {

        const prefersDark =
            window.matchMedia &&
            window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches;

        mode = prefersDark
            ? "dark"
            : "light";

    } else {

        mode = "light";

    }

    const primaryColor =
        settings?.primary_color ||
        "#2563EB";

    const borderRadius =
        settings?.rounded_corners
            ? 12
            : 4;

    const fontSize =
        settings?.font_size === "Small"
            ? 12
            : settings?.font_size === "Large"
            ? 16
            : 14;

    return createTheme({

        palette: {

            mode,

            primary: {
                main: primaryColor,
            },

            background: {

                default:
                    mode === "dark"
                        ? "#0F172A"
                        : "#F8FAFC",

                paper:
                    mode === "dark"
                        ? "#1E293B"
                        : "#FFFFFF",

            },

            text: {

                primary:
                    mode === "dark"
                        ? "#F8FAFC"
                        : "#0F172A",

                secondary:
                    mode === "dark"
                        ? "#CBD5E1"
                        : "#64748B",

            },

        },

        shape: {

            borderRadius,

        },

        typography: {

            fontSize,

            fontFamily:
                `"Inter", "Roboto", "Helvetica", "Arial", sans-serif`,

        },

        components: {

            MuiPaper: {

                styleOverrides: {

                    root: {

                        backgroundImage: "none",

                    },

                },

            },

            MuiCard: {

                styleOverrides: {

                    root: {

                        backgroundImage: "none",

                    },

                },

            },

        },

    });

}