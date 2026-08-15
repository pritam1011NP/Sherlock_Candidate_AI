import {
    Paper,
    Typography,
    Chip,
    Stack,
    Divider,
    Box,
} from "@mui/material";

import {
    Quiz,
    Psychology,
} from "@mui/icons-material";

export default function InterviewQuestionList({ questions }) {

    return (

        <Paper
            elevation={3}
            sx={{
                p: 3,
                borderRadius: 3,
            }}
        >

            <Stack
                direction="row"
                spacing={1}
                mb={3}
                alignItems="center"
            >

                <Quiz color="primary" />

                <Typography
                    variant="h5"
                    fontWeight={700}
                >
                    AI Interview Questions
                </Typography>

            </Stack>

            {

                questions.map((question, index) => (

                    <Box
                        key={index}
                        sx={{
                            mb: 3,
                        }}
                    >

                        <Paper
                            variant="outlined"
                            sx={{
                                p: 2,
                                borderRadius: 2,
                            }}
                        >

                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                mb={2}
                            >

                                <Typography
                                    fontWeight={700}
                                >
                                    Question {index + 1}
                                </Typography>

                                <Stack
                                    direction="row"
                                    spacing={1}
                                >

                                    <Chip
                                        icon={<Psychology />}
                                        label={question.skill}
                                        color="primary"
                                        size="small"
                                    />

                                    <Chip
                                        label={question.difficulty}
                                        color={
                                            question.difficulty === "Easy"
                                                ? "success"
                                                : question.difficulty === "Medium"
                                                ? "warning"
                                                : "error"
                                        }
                                        size="small"
                                    />

                                </Stack>

                            </Stack>

                            <Divider sx={{ mb: 2 }} />

                            <Typography
                                fontSize={17}
                            >
                                {question.question}
                            </Typography>

                        </Paper>

                    </Box>

                ))

            }

        </Paper>

    );

}