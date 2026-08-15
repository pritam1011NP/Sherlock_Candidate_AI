import { useMemo, useState } from "react";

import {

    Paper,

    Typography,

    TextField,

    InputAdornment,

    Box,

    Chip,

    Stack,

} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

export default function ResumeTextViewer({ analysis }) {

    const [search, setSearch] = useState("");

    const highlightedText = useMemo(() => {

        if (!analysis.resume_text) return "";

        let html = analysis.resume_text;

        const highlightWords = (words, color) => {

            words.forEach((word) => {

                if (!word) return;

                const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

                const regex = new RegExp(`(${escaped})`, "gi");

                html = html.replace(

                    regex,

                    `<mark style="
                        background:${color};
                        padding:2px 5px;
                        border-radius:4px;
                    ">$1</mark>`

                );

            });

        };

        highlightWords(analysis.skills, "#D1FAE5");

        highlightWords(analysis.education, "#DBEAFE");

        highlightWords(

            ["PROJECT", "PROJECTS"],

            "#E9D5FF"

        );

        highlightWords(

            ["EXPERIENCE"],

            "#FED7AA"

        );

        if (search.trim() !== "") {

            const regex = new RegExp(

                `(${search})`,

                "gi"

            );

            html = html.replace(

                regex,

                `<mark style="
                    background:#FEF08A;
                    color:black;
                    padding:2px 5px;
                    border-radius:4px;
                ">$1</mark>`

            );

        }

        return html;

    }, [analysis, search]);

    return (

        <Paper

            elevation={0}

            sx={{

                borderRadius:4,

                border:"1px solid #E5E7EB",

                p:3,

            }}

        >

            <Typography

                variant="h5"

                fontWeight={700}

                mb={3}

            >

                Resume Reader

            </Typography>

            <Stack

                direction="row"

                spacing={1}

                mb={3}

                flexWrap="wrap"

            >

                <Chip

                    label="🟢 Skills"

                    sx={{

                        bgcolor:"#D1FAE5"

                    }}

                />

                <Chip

                    label="🔵 Education"

                    sx={{

                        bgcolor:"#DBEAFE"

                    }}

                />

                <Chip

                    label="🟣 Projects"

                    sx={{

                        bgcolor:"#E9D5FF"

                    }}

                />

                <Chip

                    label="🟠 Experience"

                    sx={{

                        bgcolor:"#FED7AA"

                    }}

                />

            </Stack>

            <TextField

                fullWidth

                placeholder="Search inside resume..."

                value={search}

                onChange={(e)=>setSearch(e.target.value)}

                sx={{mb:3}}

                InputProps={{

                    startAdornment:(

                        <InputAdornment position="start">

                            <SearchIcon/>

                        </InputAdornment>

                    )

                }}

            />

            <Box

                sx={{

                    bgcolor:"#FAFAFA",

                    border:"1px solid #ddd",

                    borderRadius:3,

                    p:4,

                    maxHeight:700,

                    overflowY:"auto",

                    fontFamily:"Consolas",

                    whiteSpace:"pre-wrap",

                    lineHeight:1.8,

                    fontSize:15,

                }}

                dangerouslySetInnerHTML={{

                    __html:highlightedText,

                }}

            />

        </Paper>

    );

}