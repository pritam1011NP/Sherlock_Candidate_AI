import { useEffect, useState } from "react";

import {
    Avatar,
    Box,
    Button,
    Chip,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import {
    Download,
    Visibility,
} from "@mui/icons-material";

import { DataGrid } from "@mui/x-data-grid";

import { getUploadReport } from "../../api/reportApi";

const BASE_URL = "http://127.0.0.1:8000";

export default function UploadReportTable() {

    const [rows, setRows] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadUploads();

    }, []);

    async function loadUploads() {

        try {

            const data = await getUploadReport();

            setRows(
                Array.isArray(data)
                    ? data
                    : []
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
            headerName: "ID",
            width: 80,
        },

        {
            field: "image",
            headerName: "Image",
            width: 100,

            sortable: false,

            renderCell: (params) => (

                <Avatar

                    src={
                        params.row.file_path
                            ? `${BASE_URL}/${params.row.file_path.replace(/\\/g, "/")}`
                            : ""
                    }

                    sx={{
                        width: 48,
                        height: 48,
                    }}

                />

            ),

        },

        {
            field: "person_name",
            headerName: "Name",
            flex: 1,
            minWidth: 180,
        },

        {
            field: "image_type",
            headerName: "Type",
            width: 140,

            renderCell: (params) => (

                <Chip

                    size="small"

                    label={params.value}

                    color={
                        params.value === "candidate"
                            ? "primary"
                            : "secondary"
                    }

                />

            ),

        },

        {
            field: "created_at",
            headerName: "Uploaded",
            width: 180,

            renderCell: (params) =>

                params.value
                    ? new Date(
                        params.value
                    ).toLocaleString()
                    : "-",

        },

        {
            field: "actions",
            headerName: "Actions",
            width: 220,

            sortable: false,

            renderCell: (params) => (

                <Stack
                    direction="row"
                    spacing={1}
                >

                    <Button

                        size="small"

                        variant="outlined"

                        startIcon={<Visibility />}

                        onClick={() => {

                            if (!params.row.file_path)
                                return;

                            window.open(

                                `${BASE_URL}/${params.row.file_path.replace(/\\/g, "/")}`,

                                "_blank"

                            );

                        }}

                    >

                        View

                    </Button>

                    <Button

                        size="small"

                        variant="contained"

                        startIcon={<Download />}

                        href={
                            params.row.file_path
                                ? `${BASE_URL}/${params.row.file_path.replace(/\\/g, "/")}`
                                : undefined
                        }

                        target="_blank"

                    >

                        Download

                    </Button>

                </Stack>

            ),

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

                Upload Report

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

                    disableRowSelectionOnClick

                    pageSizeOptions={[10, 25, 50]}

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

                            background: "#F8FAFC",

                            fontWeight: 700,

                        },

                    }}

                />

            </Box>

        </Paper>

    );

}