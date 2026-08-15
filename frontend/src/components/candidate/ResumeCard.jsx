import {

    Paper,

    Typography,

    Stack,

    Button,

} from "@mui/material";

import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

import DownloadIcon from "@mui/icons-material/Download";

export default function ResumeCard({

    candidate,

}) {

    const url =

        `http://127.0.0.1:8000/${candidate.resume_path}`;

    return (

        <Paper

            sx={{

                p:4,

                borderRadius:3,

                mb:3,

            }}

        >

            <Typography

                variant="h6"

                mb={3}

            >

                Resume

            </Typography>

            <Stack

                direction="row"

                spacing={2}

            >

                <Button

                    variant="contained"

                    startIcon={<PictureAsPdfIcon />}

                    href={url}

                    target="_blank"

                >

                    View Resume

                </Button>

                <Button

                    variant="outlined"

                    startIcon={<DownloadIcon />}

                    href={url}

                    download

                >

                    Download

                </Button>

            </Stack>

        </Paper>

    );

}