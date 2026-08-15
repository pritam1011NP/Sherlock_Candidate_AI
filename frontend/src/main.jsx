import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";

import { Toaster } from "react-hot-toast";

import AuthProvider from "./context/AuthContext";
import { WebSocketProvider } from "./context/WebSocketContext";
import {
    AppearanceProvider,
} from "./context/AppearanceContext";

import AppTheme from "./theme/ThemeProvider";

ReactDOM.createRoot(
    document.getElementById("root")
).render(
    <React.StrictMode>

        <AppearanceProvider>

            <AppTheme>

                <WebSocketProvider>

                    <AuthProvider>

                        <App />

                        <Toaster
                            position="top-right"
                            reverseOrder={false}
                        />

                    </AuthProvider>

                </WebSocketProvider>

            </AppTheme>

        </AppearanceProvider>

    </React.StrictMode>
);