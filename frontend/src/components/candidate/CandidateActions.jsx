import {

    Paper,

    Stack,

    Button,

} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";

import DeleteIcon from "@mui/icons-material/Delete";

export default function CandidateActions() {

    return (

        <Paper

            sx={{

                p:4,

                borderRadius:3,

            }}

        >

            <Stack

                direction="row"

                spacing={2}

            >

                <Button

                    variant="contained"

                    startIcon={<EditIcon />}
                    onClick={() =>
                        navigate(`/candidates/edit/${candidate.id}`)
                    }

                >

                    Edit Candidate

                </Button>

                <Button

                    color="error"

                    variant="outlined"

                    startIcon={<DeleteIcon />}

                >

                    Delete Candidate

                </Button>

            </Stack>

        </Paper>

    );

}