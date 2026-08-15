import {
    Paper,
    Typography,
    Button,
    Stack,
} from "@mui/material";

export default function BackupSettings() {
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
                Backup & Restore
            </Typography>

            <Stack direction="row" spacing={2}>
                <Button variant="contained">
                    Backup Database
                </Button>

                <Button variant="outlined">
                    Restore Backup
                </Button>
            </Stack>
        </Paper>
    );
}