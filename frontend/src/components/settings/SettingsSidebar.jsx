import {
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";
import SecurityIcon from "@mui/icons-material/Security";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import VideoSettingsIcon from "@mui/icons-material/VideoSettings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PaletteIcon from "@mui/icons-material/Palette";
import BackupIcon from "@mui/icons-material/Backup";
import KeyIcon from "@mui/icons-material/Key";
import HistoryIcon from "@mui/icons-material/History";
import InfoIcon from "@mui/icons-material/Info";

const menus = [
    { key: "profile", label: "Profile", icon: <PersonIcon /> },
    { key: "company", label: "Company", icon: <BusinessIcon /> },
    { key: "security", label: "Security", icon: <SecurityIcon /> },
    { key: "ai", label: "AI Settings", icon: <SmartToyIcon /> },
    { key: "interview", label: "Interview", icon: <VideoSettingsIcon /> },
    { key: "notifications", label: "Notifications", icon: <NotificationsIcon /> },
    { key: "appearance", label: "Appearance", icon: <PaletteIcon /> },
    { key: "backup", label: "Backup", icon: <BackupIcon /> },
    { key: "apikeys", label: "API Keys", icon: <KeyIcon /> },
    { key: "audit", label: "Audit Logs", icon: <HistoryIcon /> },
    { key: "about", label: "About", icon: <InfoIcon /> },
];

export default function SettingsSidebar({
    active,
    onChange,
}) {
    return (
        <Paper
            elevation={0}
            sx={{
                borderRadius: 3,
                border: "1px solid #E5E7EB",
                overflow: "hidden",
            }}
        >
            <List disablePadding>
                {menus.map((item) => (
                    <ListItemButton
                        key={item.key}
                        selected={active === item.key}
                        onClick={() => onChange(item.key)}
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>

                        <ListItemText primary={item.label} />
                    </ListItemButton>
                ))}
            </List>
        </Paper>
    );
}