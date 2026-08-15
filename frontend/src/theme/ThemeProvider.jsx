import {
    ThemeProvider,
    CssBaseline,
} from "@mui/material";

import {
    useMemo,
} from "react";

import {
    useAppearance,
} from "../context/AppearanceContext";

import buildTheme from "./theme";

export default function AppTheme({

    children,

}) {

    const {

        settings,

    } = useAppearance();

    const theme = useMemo(

        () => buildTheme(settings),

        [settings],

    );

    return (

        <ThemeProvider theme={theme}>

            <CssBaseline />

            {children}

        </ThemeProvider>

    );

}