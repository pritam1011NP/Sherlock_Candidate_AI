import {
    Stack,
    Button,
} from "@mui/material";

import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import TableViewIcon from "@mui/icons-material/TableView";
import PrintIcon from "@mui/icons-material/Print";
import EmailIcon from "@mui/icons-material/Email";

export default function ExportButtons() {

    return (

        <Stack
            direction="row"
            spacing={2}
            flexWrap="wrap"
        >

            <Button
                variant="contained"
                startIcon={<PictureAsPdfIcon />}
            >
                PDF
            </Button>

            <Button
                variant="outlined"
                startIcon={<TableViewIcon />}
            >
                Excel
            </Button>

            <Button
                variant="outlined"
                startIcon={<PrintIcon />}
            >
                Print
            </Button>

            <Button
                variant="outlined"
                startIcon={<EmailIcon />}
            >
                Email
            </Button>

        </Stack>

    );

}