import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

import ReportStatistics from "../../components/reports/ReportStatistics";
import ReportsCharts from "../../components/reports/ReportsCharts";
import RecentReports from "../../components/reports/RecentReports";
import ReportFilters from "../../components/reports/ReportFilters";
import ExportButtons from "../../components/reports/ExportButtons";

export default function Reports() {
    return (
        <Box
            sx={{
                p: 3,
            }}
        >
            {/* Header */}

            <Typography
                variant="h4"
                fontWeight={700}
                mb={4}
            >
                Reports & Analytics
            </Typography>

            {/* Filters */}

            <ReportFilters />

            <Box mt={3} />

            {/* Export Buttons */}

            <ExportButtons />

            <Box mt={4} />

            {/* Statistics */}

            <ReportStatistics />

            <Box mt={4} />

            {/* Charts + Recent Reports */}

            <Grid
                container
                spacing={3}
            >
                <Grid
                    size={{
                        xs: 12,
                        lg: 8,
                    }}
                >
                    <ReportsCharts />
                </Grid>

                <Grid
                    size={{
                        xs: 12,
                        lg: 4,
                    }}
                >
                    <RecentReports />
                </Grid>
            </Grid>
        </Box>
    );
}