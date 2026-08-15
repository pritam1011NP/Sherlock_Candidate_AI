import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

import { ThemeProvider, CssBaseline } from "@mui/material";
import { createAppTheme } from "../theme/theme";

const ThemeContext = createContext();

export function AppThemeProvider({ children }) {

    const [mode, setMode] = useState("light");

    const [primaryColor, setPrimaryColor] =
        useState("#2563EB");

    // -----------------------------------
    // Load saved theme
    // -----------------------------------

    useEffect(() => {

        const savedTheme =
            localStorage.getItem("theme");

        const savedColor =
            localStorage.getItem("primaryColor");

        if (savedTheme)
            setMode(savedTheme);

        if (savedColor)
            setPrimaryColor(savedColor);

    }, []);

    // -----------------------------------
    // Detect System Theme
    // -----------------------------------

    const actualMode = useMemo(() => {

        if (mode === "system") {

            return window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches
                ? "dark"
                : "light";

        }

        return mode;

    }, [mode]);

    const theme = useMemo(() => {

        return createAppTheme(
            actualMode,
            primaryColor
        );

    }, [actualMode, primaryColor]);

    function updateTheme(themeName) {

        localStorage.setItem(
            "theme",
            themeName
        );

        setMode(themeName);

    }

    function updatePrimaryColor(color) {

        localStorage.setItem(
            "primaryColor",
            color
        );

        setPrimaryColor(color);

    }

    return (

        <ThemeContext.Provider

            value={{

                mode,

                updateTheme,

                primaryColor,

                updatePrimaryColor,

            }}

        >

            <ThemeProvider theme={theme}>

                <CssBaseline />

                {children}

            </ThemeProvider>

        </ThemeContext.Provider>

    );

}

export function useAppTheme() {

    return useContext(ThemeContext);

}