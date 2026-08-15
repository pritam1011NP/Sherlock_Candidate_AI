import {
    Paper,
    
    TextField,
    MenuItem,
    Button,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";

export default function ReportFilters() {

    return (

        <Paper
            sx={{
                p: 3,
                borderRadius: 3,
            }}
        >

            <Grid
                container
                spacing={2}
            >

                <Grid size={{ xs: 12, md: 3 }}>

                    <TextField
                        fullWidth
                        label="Department"
                        select
                        defaultValue=""
                    >

                        <MenuItem value="">
                            All Departments
                        </MenuItem>

                        <MenuItem value="IT">
                            IT
                        </MenuItem>

                        <MenuItem value="HR">
                            HR
                        </MenuItem>

                        <MenuItem value="Marketing">
                            Marketing
                        </MenuItem>

                    </TextField>

                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>

                    <TextField
                        fullWidth
                        label="Report Type"
                        select
                        defaultValue=""
                    >

                        <MenuItem value="">
                            All Reports
                        </MenuItem>

                        <MenuItem value="candidate">
                            Candidate
                        </MenuItem>

                        <MenuItem value="interview">
                            Interview
                        </MenuItem>

                        <MenuItem value="attendance">
                            Attendance
                        </MenuItem>

                    </TextField>

                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>

                    <TextField
                        fullWidth
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        label="From"
                    />

                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>

                    <Button
                        variant="contained"
                        fullWidth
                        startIcon={<SearchIcon />}
                        sx={{ height: "56px" }}
                    >
                        Filter
                    </Button>

                </Grid>

            </Grid>

        </Paper>

    );

}