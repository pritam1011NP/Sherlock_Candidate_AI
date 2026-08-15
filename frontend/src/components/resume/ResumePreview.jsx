import {
    Paper,
    Typography,
    Box,
    Button,
} from "@mui/material";

import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

export default function ResumePreview({ analysis }) {

    const resumeUrl =
        analysis?.resume_path
            ? `http://127.0.0.1:8000/${analysis.resume_path.replace(/\\/g, "/")}`
            : null;

    return (

        <Paper
            elevation={3}
            sx={{
                p: 3,
                borderRadius: 4,
            }}
        >

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                }}
            >

                <Typography
                    variant="h5"
                    fontWeight={700}
                >
                    Resume Preview
                </Typography>

                {resumeUrl && (

                    <Button
                        variant="contained"
                        startIcon={<OpenInNewIcon />}
                        href={resumeUrl}
                        target="_blank"
                    >
                        Open PDF
                    </Button>

                )}

            </Box>

            {resumeUrl ? (

                <Box
                    sx={{
                        width: "100%",
                        height: "450px",
                        border: "1px solid #ddd",
                        borderRadius: 2,
                        overflow: "hidden",
                        bgcolor: "#ffffff",
                    }}
                >

                    <iframe
                        title="Resume Preview"
                        src={`${resumeUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                        width="100%"
                        height="100%"
                        style={{
                            border: "none",
                        }}
                    />

                </Box>

            ) : (

                <Box
                    sx={{
                        height: 250,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                    }}
                >

                    <PictureAsPdfIcon
                        sx={{
                            fontSize: 70,
                            color: "#bdbdbd",
                        }}
                    />

                    <Typography mt={2}>
                        Resume Not Available
                    </Typography>

                </Box>

            )}

        </Paper>

    );

}