import { useEffect } from "react";

export default function ProctorMonitor({ onViolation }) {

    useEffect(() => {

        function handleVisibility() {

            if (document.hidden) {

                onViolation?.({
                    type: "TAB_SWITCH",
                    message: "Candidate switched browser tab.",
                });

            }

        }

        function handleFullscreen() {

            if (!document.fullscreenElement) {

                onViolation?.({
                    type: "FULLSCREEN_EXIT",
                    message: "Candidate exited fullscreen mode.",
                });

            }

        }

        function handleCopy(e) {

            e.preventDefault();

            onViolation?.({
                type: "COPY",
                message: "Copy attempt detected.",
            });

        }

        function handlePaste(e) {

            e.preventDefault();

            onViolation?.({
                type: "PASTE",
                message: "Paste attempt detected.",
            });

        }

        document.addEventListener(
            "visibilitychange",
            handleVisibility
        );

        document.addEventListener(
            "fullscreenchange",
            handleFullscreen
        );

        document.addEventListener(
            "copy",
            handleCopy
        );

        document.addEventListener(
            "paste",
            handlePaste
        );

        return () => {

            document.removeEventListener(
                "visibilitychange",
                handleVisibility
            );

            document.removeEventListener(
                "fullscreenchange",
                handleFullscreen
            );

            document.removeEventListener(
                "copy",
                handleCopy
            );

            document.removeEventListener(
                "paste",
                handlePaste
            );

        };

    }, [onViolation]);

    return null;

}