import {
    Paper,
    Typography,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";

export default function AuditLogs() {
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
                Audit Logs
            </Typography>

            <List>
                <ListItem>
                    <ListItemText
                        primary="Admin logged in"
                        secondary="Today 10:30 AM"
                    />
                </ListItem>

                <ListItem>
                    <ListItemText
                        primary="Candidate uploaded"
                        secondary="Today 09:45 AM"
                    />
                </ListItem>

                <ListItem>
                    <ListItemText
                        primary="Interview completed"
                        secondary="Yesterday"
                    />
                </ListItem>
            </List>
        </Paper>
    );
}