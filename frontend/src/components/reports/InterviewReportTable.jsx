import { useEffect, useState } from "react";

import {
    Paper,
    Typography,
    Box,
    Chip,
    LinearProgress,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

import { getInterviewReport } from "../../api/reportApi";

export default function InterviewReportTable() {

    const [rows, setRows] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadInterviews();

    }, []);

    async function loadInterviews() {

        try {

            const data = await getInterviewReport();

            setRows(
                Array.isArray(data)
                    ? data
                    : []
            );

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    }

    const columns = [

        {
            field: "id",
            headerName: "ID",
            width: 80,
        },

        {
            field: "candidate_name",
            headerName: "Candidate",
            flex: 1,
            minWidth: 180,
        },

        {
            field: "meeting_id",
            headerName: "Meeting ID",
            width: 170,
        },

        {
            field: "status",
            headerName: "Status",
            width: 140,

            renderCell: (params) => (

                <Chip
                    label={params.value}
                    size="small"
                    color={
                        params.value === "completed"
                            ? "success"
                            : params.value === "running"
                            ? "warning"
                            : "default"
                    }
                />

            ),

        },

        {
            field: "confidence",
            headerName: "Confidence",
            width: 190,

            renderCell: (params) => {

                const value = Number(params.value ?? 0);

                return (

                    <Box
                        sx={{
                            width: "100%",
                        }}
                    >

                        <LinearProgress
                            variant="determinate"
                            value={value}
                            sx={{
                                height: 8,
                                borderRadius: 5,
                                mb: 0.5,
                            }}
                        />

                        <Typography
                            variant="caption"
                            fontWeight={700}
                        >
                            {value.toFixed(1)}%
                        </Typography>

                    </Box>

                );

            },

        },

        {
            field: "verification_count",
            headerName: "Verified",
            width: 120,
        },

        {
            field: "failed_attempts",
            headerName: "Failed",
            width: 120,
        },

        {
            field: "created_at",
            headerName: "Interview Date",
            width: 190,

            renderCell: (params) =>

                params.value

                    ? new Date(
                          params.value
                      ).toLocaleString()

                    : "-",

        },

    ];

    return (

        <Paper
            elevation={0}
            sx={{
                mt: 3,
                borderRadius: 4,
                border: "1px solid #E5E7EB",
            }}
        >

            <Typography
                variant="h6"
                fontWeight={700}
                p={3}
            >
                Interview Report
            </Typography>

            <Box
                sx={{
                    height: 520,
                    width: "100%",
                }}
            >

                <DataGrid

                    rows={rows}

                    columns={columns}

                    loading={loading}

                    disableRowSelectionOnClick

                    pageSizeOptions={[10,25,50]}

                    initialState={{
                        pagination:{
                            paginationModel:{
                                pageSize:10,
                            },
                        },
                    }}

                    sx={{

                        border:0,

                        "& .MuiDataGrid-columnHeaders":{

                            background:"#F8FAFC",

                            fontWeight:700,

                        },

                    }}

                />

            </Box>

        </Paper>

    );

}