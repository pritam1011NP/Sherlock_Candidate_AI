import {
    Paper,
    Typography,
    Stack,
    TextField,
    Button,
} from "@mui/material";

export default function ApiKeySettings() {
    return (
        <Paper
            elevation={0}
            sx={{
                p:4,
                borderRadius:3,
                border:"1px solid #E5E7EB",
            }}
        >
            <Typography variant="h5" fontWeight={700} mb={3}>
                API Keys
            </Typography>

            <Stack spacing={2}>
                <TextField
                    fullWidth
                    label="OpenAI API Key"
                />

                <TextField
                    fullWidth
                    label="Google Gemini API Key"
                />

                <Button variant="contained">
                    Save Keys
                </Button>
            </Stack>
        </Paper>
    );
}