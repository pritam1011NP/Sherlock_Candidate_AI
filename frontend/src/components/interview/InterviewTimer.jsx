import { useEffect, useState } from "react";

import {
    Box,
    Typography,
    LinearProgress,
    Stack,
} from "@mui/material";

import {
    AccessTime,
    Pause,
    PlayArrow,
} from "@mui/icons-material";

export default function InterviewTimer({

    duration = 120,

    onTimeUp,

}) {

    const [secondsLeft, setSecondsLeft] = useState(duration);

    const [paused, setPaused] = useState(false);

    useEffect(() => {

        if (paused) return;

        if (secondsLeft <= 0) {

            onTimeUp?.();

            return;

        }

        const timer = setTimeout(() => {

            setSecondsLeft((prev) => prev - 1);

        }, 1000);

        return () => clearTimeout(timer);

    }, [

        secondsLeft,
        paused,
        onTimeUp,
    ]);

    const progress =
        (secondsLeft / duration) * 100;

    const minutes = Math.floor(secondsLeft / 60);

    const seconds = secondsLeft % 60;

    const warning = secondsLeft <= 30;

    return (

        <Box
            sx={{
                mb: 3,
            }}
        >

            <Stack

                direction="row"

                justifyContent="space-between"

                alignItems="center"

                mb={1}

            >

                <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                >

                    <AccessTime
                        color={
                            warning
                                ? "error"
                                : "primary"
                        }
                    />

                    <Typography
                        variant="h6"
                        fontWeight={700}
                        color={
                            warning
                                ? "error.main"
                                : "primary.main"
                        }
                    >
                        {minutes}:
                        {seconds
                            .toString()
                            .padStart(2, "0")}
                    </Typography>

                </Stack>

                <Box
                    sx={{
                        cursor: "pointer",
                    }}
                    onClick={() =>
                        setPaused(!paused)
                    }
                >

                    {paused ? (
                        <PlayArrow />
                    ) : (
                        <Pause />
                    )}

                </Box>

            </Stack>

            <LinearProgress
                variant="determinate"
                value={progress}
                color={
                    warning
                        ? "error"
                        : "primary"
                }
                sx={{
                    height: 10,
                    borderRadius: 5,
                }}
            />

        </Box>

    );

}