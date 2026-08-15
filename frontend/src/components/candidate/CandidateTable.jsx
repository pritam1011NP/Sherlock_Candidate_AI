import { useMemo, useState } from "react";

import {
    Paper,
    Typography,
    Chip,
    Avatar,
    Box,
    Button,
    Stack,
    Toolbar,
    TextField,
    MenuItem,
    InputAdornment,
    IconButton,
    Tooltip,
} from "@mui/material";

import {
    Visibility,
    Edit,
    Delete,
    PictureAsPdf,
    Download,
    Search,
    FileDownload,
    Psychology,
    VideoCall,
} from "@mui/icons-material";

import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

const API_URL = "http://127.0.0.1:8000";

// Gold / silver / bronze treatment for the top three ranks —
// purely cosmetic, doesn't touch the underlying rank value.
const rankStyle = (rank) => {
    if (rank === 1) return { bgcolor: "#C9A227", color: "#1B1B1B" };
    if (rank === 2) return { bgcolor: "#B8C0CC", color: "#1B1B1B" };
    if (rank === 3) return { bgcolor: "#c38c51", color: "#1B1B1B" };
    return { bgcolor: "#e19a0c", color: "#4B4536" };
};

export default function CandidateTable({
    rows = [],
    loading = false,
    onDelete = () => {},
}) {

    const navigate = useNavigate();

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] =
        useState("All");

    const filteredRows = useMemo(() => {

        return rows.filter((candidate) => {

            const keyword = search.toLowerCase();

            const matchSearch =

                candidate.full_name
                    ?.toLowerCase()
                    .includes(keyword) ||

                candidate.email
                    ?.toLowerCase()
                    .includes(keyword) ||

                candidate.position
                    ?.toLowerCase()
                    .includes(keyword);

            const matchStatus =

                statusFilter === "All"

                    ? true

                    : candidate.status === statusFilter;

            return matchSearch && matchStatus;

        });

    }, [
        rows,
        search,
        statusFilter,
    ]);

    function exportCSV() {

        const headers = [

            "ID",
            "Candidate",
            "Email",
            "Phone",
            "Position",
            "Status",
            "Resume Match",
            "Interview Score",
            "AI Score",
            "Rank",
            "Applied",

        ];

        const csvRows = filteredRows.map((r) => [

            r.id,

            r.full_name,

            r.email,

            r.phone,

            r.position,

            r.status,

            r.resume_match ?? 0,

            r.interview_score ?? 0,

            r.ai_score ?? 0,

            r.rank ?? "",

            r.created_at ?? "",

        ]);

        const csv = [

            headers.join(","),

            ...csvRows.map((row) => row.join(",")),

        ].join("\n");

        const blob = new Blob(

            [csv],

            {
                type: "text/csv;charset=utf-8;",
            }

        );

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;

        link.download = "Candidates.csv";

        link.click();

        URL.revokeObjectURL(url);

    }

    const columns = [
        {
    field: "id",
    headerName: "ID",
    width: 70,
},

{
    field: "rank",
    headerName: "Rank",
    width: 90,

    renderCell: (params) => {

        const rank = params.row.rank ?? "-";
        const style = rankStyle(rank);

        return (
            <Chip
                label={`#${rank}`}
                size="small"
                sx={{
                    fontWeight: 700,
                    bgcolor: style.bgcolor,
                    color: style.color,
                }}
            />
        );

    },
},

{
    field: "photo",
    headerName: "Photo",
    width: 90,
    sortable: false,

    renderCell: (params) => (

        <Avatar
            src={
                params.row.photo_path
                    ? `${API_URL}/${params.row.photo_path.replace(/\\/g, "/")}`
                    : ""
            }
            alt={params.row.full_name}
            sx={{
                width: 42,
                height: 42,
                border: "2px solid rgba(201,162,39,0.4)",
            }}
        >
            {params.row.full_name?.charAt(0)}
        </Avatar>

    ),
},

{
    field: "full_name",
    headerName: "Candidate",
    flex: 1.3,
    minWidth: 200,
},

{
    field: "email",
    headerName: "Email",
    flex: 1.5,
    minWidth: 220,
},

{
    field: "phone",
    headerName: "Phone",
    width: 150,
},

{
    field: "position",
    headerName: "Position",
    width: 180,
},

{
    field: "resume_match",
    headerName: "Resume Match",
    width: 180,

    renderCell: (params) => {

        const score = params.value ?? 0;

        return (

            <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                width="100%"
            >

                <Box
                    sx={{
                        flex: 1,
                        height: 8,
                        bgcolor: "#EDE7D6",
                        borderRadius: 5,
                        overflow: "hidden",
                    }}
                >

                    <Box
                        sx={{
                            width: `${score}%`,
                            height: "100%",
                            borderRadius: 5,
                            transition: "width 0.4s ease",
                            bgcolor:
                                score >= 80
                                    ? "#2E7D32"
                                    : score >= 60
                                    ? "#C9A227"
                                    : "#B3432B",
                        }}
                    />

                </Box>

                <Typography
                    fontWeight={700}
                    fontSize={12}
                >
                    {score}%
                </Typography>

            </Stack>

        );

    },
},

{
    field: "interview_score",
    headerName: "Interview",
    width: 170,

    renderCell: (params) => {

        const score = params.value ?? 0;

        return (

            <Chip
                label={`${score}%`}
                color={
                    score >= 80
                        ? "success"
                        : score >= 60
                        ? "primary"
                        : "warning"
                }
                size="small"
            />

        );

    },
},

{
    field: "ai_score",
    headerName: "AI Score",
    width: 180,

    renderCell: (params) => {

        const score = params.value ?? 0;

        return (

            <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                width="100%"
            >

                <Box
                    sx={{
                        flex: 1,
                        bgcolor: "#EDE7D6",
                        borderRadius: 5,
                        overflow: "hidden",
                        height: 8,
                    }}
                >

                    <Box
                        sx={{
                            width: `${score}%`,
                            height: "100%",
                            borderRadius: 5,
                            transition: "width 0.4s ease",
                            bgcolor:
                                score >= 85
                                    ? "#2E7D32"
                                    : score >= 70
                                    ? "#C9A227"
                                    : "#B3432B",
                        }}
                    />

                </Box>

                <Typography
                    fontSize={12}
                    fontWeight={700}
                >
                    {score}%
                </Typography>

            </Stack>

        );

    },
},

{
    field: "verified",
    headerName: "Face",
    width: 130,

    renderCell: (params) => (

        <Chip
            label={
                params.value
                    ? "Verified"
                    : "Pending"
            }
            size="small"
            color={
                params.value
                    ? "success"
                    : "warning"
            }
        />

    ),
},

{
    field: "status",
    headerName: "Status",
    width: 140,

    renderCell: (params) => (

        <Chip
            size="small"
            label={params.value || "Pending"}
            color={
                params.value === "Verified"
                    ? "success"
                    : params.value === "Rejected"
                    ? "error"
                    : params.value === "Shortlisted"
                    ? "primary"
                    : "warning"
            }
        />

    ),
},

{
    field: "created_at",
    headerName: "Applied",
    width: 170,

    valueFormatter: (value) =>

        value
            ? new Date(value).toLocaleDateString()
            : "-",
},
{
    field: "resume",
    headerName: "Resume",
    width: 130,
    sortable: false,

    renderCell: (params) => (

        <Stack
            direction="row"
            spacing={0.5}
        >

            <Tooltip title="View resume">
                <span>
                    <IconButton
                        size="small"
                        disabled={!params.row.resume_path}
                        onClick={(e) => {

                            e.stopPropagation();

                            if (!params.row.resume_path) return;

                            window.open(
                                `${API_URL}/${params.row.resume_path.replace(/\\/g, "/")}`,
                                "_blank"
                            );

                        }}
                        sx={{
                            color: "#8A6A12",
                            "&:hover": { bgcolor: "rgba(201,162,39,0.12)" },
                        }}
                    >
                        <PictureAsPdf fontSize="small" />
                    </IconButton>
                </span>
            </Tooltip>

            <Tooltip title="Download PDF">
                <span>
                    <IconButton
                        size="small"
                        disabled={!params.row.resume_path}
                        href={
                            params.row.resume_path
                                ? `${API_URL}/${params.row.resume_path.replace(/\\/g, "/")}`
                                : "#"
                        }
                        target="_blank"
                        onClick={(e) => e.stopPropagation()}
                        sx={{
                            color: "#1B1B1B",
                            "&:hover": { bgcolor: "rgba(201,162,39,0.12)" },
                        }}
                    >
                        <Download fontSize="small" />
                    </IconButton>
                </span>
            </Tooltip>

        </Stack>

    ),
},

{
    field: "actions",
    headerName: "Actions",
    width: 210,
    sortable: false,

    renderCell: (params) => (

        <Stack
            direction="row"
            spacing={0.5}
        >

            <Tooltip title="View candidate">
                <IconButton
                    size="small"
                    onClick={(e) => {

                        e.stopPropagation();

                        navigate(`/candidates/${params.row.id}`);

                    }}
                    sx={{
                        color: "#1B1B1B",
                        "&:hover": { bgcolor: "rgba(201,162,39,0.12)" },
                    }}
                >
                    <Visibility fontSize="small" />
                </IconButton>
            </Tooltip>

            <Tooltip title="AI resume analysis">
                <IconButton
                    size="small"
                    onClick={(e) => {

                        e.stopPropagation();

                        navigate(`/resume-analysis/${params.row.id}`);

                    }}
                    sx={{
                        color: "#2563EB",
                        "&:hover": { bgcolor: "rgba(37,99,235,0.12)" },
                    }}
                >
                    <Psychology fontSize="small" />
                </IconButton>
            </Tooltip>

            <Tooltip title="Interview">
                <IconButton
                    size="small"
                    onClick={(e) => {

                        e.stopPropagation();

                        navigate(`/interview/${params.row.id}`);

                    }}
                    sx={{
                        color: "#2E7D32",
                        "&:hover": { bgcolor: "rgba(46,125,50,0.12)" },
                    }}
                >
                    <VideoCall fontSize="small" />
                </IconButton>
            </Tooltip>

            <Tooltip title="Edit candidate">
                <IconButton
                    size="small"
                    onClick={(e) => {

                        e.stopPropagation();

                        navigate(`/candidates/edit/${params.row.id}`);

                    }}
                    sx={{
                        color: "#B3901F",
                        "&:hover": { bgcolor: "rgba(179,144,31,0.12)" },
                    }}
                >
                    <Edit fontSize="small" />
                </IconButton>
            </Tooltip>

            <Tooltip title="Delete candidate">
                <IconButton
                    size="small"
                    onClick={(e) => {

                        e.stopPropagation();

                        if (
                            window.confirm(
                                `Delete ${params.row.full_name}?`
                            )
                        ) {

                            onDelete(params.row.id);

                        }

                    }}
                    sx={{
                        color: "#B3432B",
                        "&:hover": { bgcolor: "rgba(179,67,43,0.12)" },
                    }}
                >
                    <Delete fontSize="small" />
                </IconButton>
            </Tooltip>

        </Stack>

    ),
},

];
return (

    <Paper
        elevation={0}
        sx={{
            borderRadius: 3,
            overflow: "hidden",
            border: "1px solid rgba(201,162,39,0.25)",
        }}
    >

        <style>{`
            @keyframes ct-fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            .ct-fade-in {
                animation: ct-fadeIn 0.4s ease both;
            }
            @media (prefers-reduced-motion: reduce) {
                .ct-fade-in { animation: none !important; }
            }
        `}</style>

        <Box
            sx={{
                px: 3,
                py: 2,
                borderBottom: "1px solid rgba(201,162,39,0.25)",
                background: "linear-gradient(180deg, #FBF8F0 0%, #F5EFDD 100%)",
            }}
        >

            <Typography
                variant="h6"
                fontWeight={700}
                sx={{ color: "#1B1B1B" }}
            >
                Candidate List
            </Typography>

            <Typography
                variant="body2"
                sx={{ color: "rgba(27,27,27,0.6)" }}
            >
                Manage candidates, resumes and AI rankings
            </Typography>

        </Box>

        <Toolbar
            sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 2,
                flexWrap: "wrap",
                py: 2,
            }}
        >

            <Stack
                direction="row"
                spacing={2}
                flexWrap="wrap"
            >

                <TextField
                    size="small"
                    placeholder="Search candidate..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    sx={{
                        width: 280,
                        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#C9A227",
                        },
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search sx={{ color: "#8A6A12" }} />
                            </InputAdornment>
                        ),
                    }}
                />

                <TextField
                    select
                    size="small"
                    value={statusFilter}
                    onChange={(e) =>
                        setStatusFilter(e.target.value)
                    }
                    sx={{
                        width: 180,
                        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#C9A227",
                        },
                    }}
                >

                    <MenuItem value="All">
                        All Status
                    </MenuItem>

                    <MenuItem value="Pending">
                        Pending
                    </MenuItem>

                    <MenuItem value="Verified">
                        Verified
                    </MenuItem>

                    <MenuItem value="Shortlisted">
                        Shortlisted
                    </MenuItem>

                    <MenuItem value="Rejected">
                        Rejected
                    </MenuItem>

                </TextField>

            </Stack>

            <Button
                variant="contained"
                startIcon={<FileDownload />}
                onClick={exportCSV}
                sx={{
                    background: "linear-gradient(180deg, #D9B84A 0%, #B3901F 100%)",
                    color: "#1B1B1B",
                    fontWeight: 600,
                    textTransform: "none",
                    boxShadow: "0 6px 16px rgba(179,144,31,0.3)",
                    transition: "transform 0.15s ease, filter 0.2s ease",
                    "&:hover": {
                        background: "linear-gradient(180deg, #E0C158 0%, #BC9A28 100%)",
                        transform: "translateY(-1px)",
                        filter: "brightness(1.05)",
                    },
                }}
            >
                Export CSV
            </Button>

        </Toolbar>

        <Box
            className="ct-fade-in"
            sx={{
                height: 700,
                width: "100%",
            }}
        >

            <DataGrid

                rows={filteredRows}

                columns={columns}

                loading={loading}

                checkboxSelection

                disableRowSelectionOnClick

                pageSizeOptions={[10, 25, 50, 100]}

                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}

                getRowClassName={(params) =>
                    params.indexRelativeToCurrentPage % 2 === 0
                        ? "ct-row-even"
                        : "ct-row-odd"
                }

                onRowClick={(params) => {

                    navigate(`/candidates/${params.row.id}`);

                }}

                sx={{

                    border: 0,
                    fontFamily: "inherit",

                    "--DataGrid-containerBackground": "#12172B",

                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: "#12172B",
                        borderBottom: "2px solid #C9A227",
                    },

                    "& .MuiDataGrid-columnHeader": {
                        backgroundColor: "#12172B",
                    },

                    "& .MuiDataGrid-columnHeaderTitle": {
                        color: "#F5F1E6",
                        fontWeight: 700,
                        letterSpacing: "0.3px",
                    },

                    "& .MuiDataGrid-columnHeaderCheckbox .MuiCheckbox-root": {
                        color: "rgba(245,241,230,0.7)",
                    },

                    "& .MuiDataGrid-columnHeaderCheckbox .MuiCheckbox-root.Mui-checked": {
                        color: "#C9A227",
                    },

                    "& .MuiDataGrid-sortIcon, & .MuiDataGrid-menuIconButton, & .MuiDataGrid-iconButtonContainer .MuiSvgIcon-root": {
                        color: "rgba(245,241,230,0.75)",
                    },

                    "& .MuiDataGrid-columnSeparator": {
                        color: "rgba(245,241,230,0.15)",
                    },

                    "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": {
                        outline: "none",
                    },

                    "& .MuiDataGrid-row.ct-row-odd": {
                        backgroundColor: "rgba(201,162,39,0.035)",
                    },

                    "& .MuiDataGrid-row:hover": {
                        backgroundColor: "rgba(201,162,39,0.12) !important",
                    },

                    "& .MuiDataGrid-row.Mui-selected": {
                        backgroundColor: "rgba(201,162,39,0.18) !important",
                    },

                    "& .MuiDataGrid-row.Mui-selected:hover": {
                        backgroundColor: "rgba(201,162,39,0.24) !important",
                    },

                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "1px solid rgba(201,162,39,0.25)",
                    },

                }}

            />

        </Box>

    </Paper>

);

}