import Grid from "@mui/material/Grid";

import DashboardCard from "../dashboard/DashboardCard";

export default function ReportStatistics() {
    return (
        <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 3 }}>
                <DashboardCard
                    title="Reports"
                    value="84"
                    subtitle="Generated"
                    trend="+18%"
                    color="#2563EB"
                />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
                <DashboardCard
                    title="Downloads"
                    value="412"
                    subtitle="This Month"
                    trend="+9%"
                    color="#10B981"
                />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
                <DashboardCard
                    title="Shared"
                    value="67"
                    subtitle="Via Email"
                    trend="+6%"
                    color="#F59E0B"
                />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
                <DashboardCard
                    title="Scheduled"
                    value="12"
                    subtitle="Automatic"
                    trend="+2%"
                    color="#8B5CF6"
                />
            </Grid>
        </Grid>
    );
}