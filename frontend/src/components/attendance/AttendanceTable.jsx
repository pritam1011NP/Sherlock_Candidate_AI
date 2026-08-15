import {

    Paper,

    Table,

    TableBody,

    TableCell,

    TableContainer,

    TableHead,

    TableRow,

    Chip,

    Typography,

} from "@mui/material";

export default function AttendanceTable({ attendance = [] }) {

    return (

        // Background/border stripped so this blends into the parchment
        // shell the parent page (Attendance.jsx) already wraps it in.
        // If used standalone elsewhere, restore background:"#fff" and
        // border:"1px solid #E5E7EB".
        <TableContainer
            component={Paper}
            elevation={0}
            sx={{
                mt: 0,
                borderRadius: 4,
                border: "none",
                backgroundColor: "transparent",
            }}
        >

            <Table>

                <TableHead>

                    <TableRow
                        sx={{
                            "& th": {
                                backgroundColor: "#12172B",
                                color: "#F5F1E6",
                                fontWeight: 700,
                                borderBottom: "2px solid #C9A227",
                            },
                        }}
                    >

                        <TableCell>ID</TableCell>

                        <TableCell>Candidate</TableCell>

                        <TableCell>Check In</TableCell>

                        <TableCell>Status</TableCell>

                        <TableCell>Verified</TableCell>

                        <TableCell>Score</TableCell>

                    </TableRow>

                </TableHead>

                <TableBody>

                    {attendance.length === 0 ? (

                        <TableRow>

                            <TableCell
                                colSpan={6}
                                align="center"
                            >

                                <Typography
                                    py={2}
                                    sx={{ color: "rgba(27,27,27,0.55)" }}
                                >
                                    No attendance records found.
                                </Typography>

                            </TableCell>

                        </TableRow>

                    ) : (

                        attendance.map((row) => (

                            <TableRow
                                key={row.id}
                                hover
                                sx={{
                                    "&:hover": {
                                        backgroundColor: "rgba(201,162,39,0.10) !important",
                                    },
                                }}
                            >

                                <TableCell>
                                    {row.id}
                                </TableCell>

                                <TableCell>
                                    {row.candidate_name || row.candidate_id}
                                </TableCell>

                                <TableCell>

                                    {row.check_in
                                        ? new Date(row.check_in).toLocaleString()
                                        : "-"}

                                </TableCell>

                                <TableCell>

                                    <Chip
                                        label={row.status}
                                        color={
                                            row.status === "Present"
                                                ? "success"
                                                : row.status === "Absent"
                                                ? "error"
                                                : "warning"
                                        }
                                        size="small"
                                    />

                                </TableCell>

                                <TableCell>

                                    <Chip
                                        label={
                                            row.verified
                                                ? "Verified"
                                                : "Not Verified"
                                        }
                                        color={
                                            row.verified
                                                ? "success"
                                                : "default"
                                        }
                                        size="small"
                                    />

                                </TableCell>

                                <TableCell>

                                    {row.match_score ?? 0}%

                                </TableCell>

                            </TableRow>

                        ))

                    )}

                </TableBody>

            </Table>

        </TableContainer>

    );

}