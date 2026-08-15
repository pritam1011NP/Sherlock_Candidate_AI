import {
    Paper,
    Typography,
    Stack,
    Chip,
} from "@mui/material";

import VideocamIcon from "@mui/icons-material/Videocam";
import MicIcon from "@mui/icons-material/Mic";
import LanguageIcon from "@mui/icons-material/Language";
import PersonIcon from "@mui/icons-material/Person";

export default function ProctorStatus({

    camera,

    microphone,

    browser,

    faces,

}) {

    return (

        <Paper
            elevation={0}
            sx={{
                p:3,
                borderRadius:4,
                border:"1px solid #E5E7EB",
            }}
        >

            <Typography
                variant="h6"
                fontWeight={700}
                mb={3}
            >

                🛡 Proctor Status

            </Typography>

            <Stack spacing={2}>

                <Chip
                    icon={<VideocamIcon />}
                    color={camera ? "success" : "error"}
                    label={camera ? "Camera Active" : "Camera Offline"}
                />

                <Chip
                    icon={<MicIcon />}
                    color={microphone ? "success" : "error"}
                    label={microphone ? "Microphone Active" : "Microphone Offline"}
                />

                <Chip
                    icon={<LanguageIcon />}
                    color={browser ? "success" : "warning"}
                    label={browser ? "Browser Focused" : "Browser Hidden"}
                />

                <Chip
                    icon={<PersonIcon />}
                    color={faces === 1 ? "success" : "error"}
                    label={
                        faces === 1
                            ? "Single Face"
                            : `${faces} Faces`
                    }
                />

            </Stack>

        </Paper>

    );

}