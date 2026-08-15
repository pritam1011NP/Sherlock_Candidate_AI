import {
    Paper,
    Typography,
    List,
    ListItem,
    ListItemText,
    Divider,
} from "@mui/material";

const reports = [

    {
        title: "Candidate Report",
        date: "Today",
    },

    {
        title: "Interview Report",
        date: "Yesterday",
    },

    {
        title: "Attendance Report",
        date: "2 Days Ago",
    },

    {
        title: "AI Performance",
        date: "Last Week",
    },

];

export default function RecentReports() {

    return (

        <Paper
            sx={{
                p: 3,
                borderRadius: 3,
                height: 450,
            }}
        >

            <Typography
                variant="h6"
                fontWeight={700}
                mb={2}
            >
                Recent Reports
            </Typography>

            <List>

                {reports.map((report, index) => (

                    <div key={index}>

                        <ListItem>

                            <ListItemText
                                primary={report.title}
                                secondary={report.date}
                            />

                        </ListItem>

                        {index !== reports.length - 1 && (
                            <Divider />
                        )}

                    </div>

                ))}

            </List>

        </Paper>

    );

}