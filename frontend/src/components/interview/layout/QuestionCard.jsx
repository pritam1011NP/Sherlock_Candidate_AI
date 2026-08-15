import {
    Paper,
    Typography,
    Chip,
    Stack,
    Box,
} from "@mui/material";

export default function QuestionCard({

    questionNumber,

    question,

    skill,

    difficulty,

}) {

    const difficultyColor =

        difficulty === "Easy"

            ? "success"

            : difficulty === "Hard"

            ? "error"

            : "warning";

    return (

        <Paper

            elevation={0}

            sx={{

                p:4,

                borderRadius:4,

                border:"1px solid #E5E7EB",

            }}

        >

            <Stack

                direction="row"

                justifyContent="space-between"

                alignItems="center"

                mb={3}

            >

                <Chip

                    label={skill || "General"}

                    color="primary"

                />

                <Chip

                    label={difficulty || "Medium"}

                    color={difficultyColor}

                />

            </Stack>

            <Typography

                variant="subtitle2"

                color="primary"

                gutterBottom

            >

                Question {questionNumber}

            </Typography>

            <Typography

                variant="h5"

                fontWeight={700}

                sx={{

                    lineHeight:1.7,

                }}

            >

                {question}

            </Typography>

            <Box

                mt={4}

                sx={{

                    bgcolor:"#F8FAFC",

                    p:2,

                    borderRadius:3,

                    border:"1px dashed #CBD5E1",

                }}

            >

                <Typography

                    variant="body2"

                    color="text.secondary"

                >

                    💡 Take a few seconds to understand the question before recording your answer.

                </Typography>

            </Box>

        </Paper>

    );

}