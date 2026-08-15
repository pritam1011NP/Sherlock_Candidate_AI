import { useEffect, useState } from "react";

import {
    Paper,
    Typography,
    Chip,
    Box,
    CircularProgress,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

import { getMatchReport } from "../../api/reportApi";

export default function MatchReportTable() {

    const [rows, setRows] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadData();

    }, []);

    async function loadData() {

        try {

            const data = await getMatchReport();

            setRows(
                Array.isArray(data) ? data : []
            );

        }

        catch (err) {

            console.error(err);

        }

        finally {

            setLoading(false);

        }

    }

    const columns = [

        {
            field: "id",
            headerName: "Match ID",
            width: 100,
        },

        {
            field: "candidate_name",
            headerName: "Candidate",
            flex: 1,
            minWidth: 180,
        },

        {
            field: "participant_name",
            headerName: "Participant",
            flex: 1,
            minWidth: 180,
        },

        {
            field: "similarity",
            headerName: "Similarity",
            width: 140,

            renderCell: (params) => {

                const score = params.value ?? 0;

                return `${score}%`;

            },

        },

        {
            field: "matched",
            headerName: "Status",
            width: 140,

            renderCell: (params) => (

                <Chip
                    label={
                        params.value
                            ? "Matched"
                            : "Not Matched"
                    }
                    color={
                        params.value
                            ? "success"
                            : "error"
                    }
                    size="small"
                />

            ),

        },

        {
            field: "created_at",
            headerName: "Date",
            width: 180,

            renderCell: (params) => {

                if (!params.value) return "-";

                return new Date(
                    params.value
                ).toLocaleString();

            },

        },

    ];

    return (

        <Paper
            elevation={0}
            sx={{
                borderRadius: 4,
                border: "1px solid #E5E7EB",
                mb: 3,
            }}
        >

            <Typography
                variant="h6"
                fontWeight={700}
                p={3}
            >
                Match Report
            </Typography>

            <Box
                sx={{
                    height: 500,
                    width: "100%",
                }}
            >

                <DataGrid

                    rows={rows}

                    columns={columns}

                    loading={loading}

                    pageSizeOptions={[10, 25, 50]}

                    disableRowSelectionOnClick

                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}

                    sx={{

                        border: 0,

                        "& .MuiDataGrid-columnHeaders": {

                            backgroundColor: "#F8FAFC",

                            fontWeight: 700,

                        },

                    }}

                />

            </Box>

        </Paper>

    );

}