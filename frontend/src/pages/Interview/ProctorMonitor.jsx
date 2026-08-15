import { useEffect } from "react";

export default function ProctorMonitor({

    onViolation,

}) {

    useEffect(() => {

        function handleVisibility() {

            if (document.hidden) {

                onViolation({
                    type: "TAB_SWITCH",
                    message: "Candidate switched tab",
                    time: new Date().toISOString(),
                });

            }

        }

        function handleBlur() {

            onViolation({
                type: "WINDOW_BLUR",
                message: "Browser window lost focus",
                time: new Date().toISOString(),
            });

        }

        function handleFocus() {

            console.log("Window focused");

        }

        document.addEventListener(
            "visibilitychange",
            handleVisibility
        );

        window.addEventListener(
            "blur",
            handleBlur
        );

        window.addEventListener(
            "focus",
            handleFocus
        );

        return () => {

            document.removeEventListener(
                "visibilitychange",
                handleVisibility
            );

            window.removeEventListener(
                "blur",
                handleBlur
            );

            window.removeEventListener(
                "focus",
                handleFocus
            );

        };

    }, [onViolation]);

    return null;

}