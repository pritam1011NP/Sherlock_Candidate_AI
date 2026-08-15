import { useEffect, useMemo, useState } from "react";

import {
    Box,
    Typography,
    Paper,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    Chip,
    LinearProgress,
    Avatar,
    TextField,
    InputAdornment,
    Stack,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

import { getCandidateRanking } from "../../api/rankingApi";

export default function CandidateRanking() {

    const [loading, setLoading] = useState(true);

    const [candidates, setCandidates] = useState([]);

    const [search, setSearch] = useState("");

    useEffect(() => {

        loadRanking();

    }, []);

    async function loadRanking() {

        try {

            const data = await getCandidateRanking();

            setCandidates(data);

        }

        catch (err) {

            console.error(err);

        }

        finally {

            setLoading(false);

        }

    }

    const filtered = useMemo(() => {

        return candidates.filter((c) =>

            c.name.toLowerCase().includes(search.toLowerCase()) ||

            c.role.toLowerCase().includes(search.toLowerCase())

        );

    }, [search, candidates]);

    return (

        <Box>

            <Typography
                variant="h4"
                fontWeight={700}
                mb={3}
            >

                AI Candidate Ranking

            </Typography>

            <Paper
                sx={{
                    p:3,
                    mb:3,
                    borderRadius:4,
                }}
            >

                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >

                    <Typography
                        variant="h6"
                    >

                        Best Candidates

                    </Typography>

                    <TextField
                        size="small"
                        placeholder="Search candidate..."
                        value={search}
                        onChange={(e)=>setSearch(e.target.value)}
                        InputProps={{
                            startAdornment:(
                                <InputAdornment position="start">
                                    <SearchIcon/>
                                </InputAdornment>
                            )
                        }}
                    />

                </Stack>

            </Paper>

            <TableContainer
                component={Paper}
                sx={{
                    borderRadius:4,
                }}
            >

                <Table>

                    <TableHead>

                        <TableRow>

                            <TableCell>

                                Rank

                            </TableCell>

                            <TableCell>

                                Candidate

                            </TableCell>

                            <TableCell>

                                Role

                            </TableCell>

                            <TableCell>

                                Resume

                            </TableCell>

                            <TableCell>

                                Interview

                            </TableCell>

                            <TableCell>

                                Proctor

                            </TableCell>

                            <TableCell>

                                AI Score

                            </TableCell>

                            <TableCell>

                                Recommendation

                            </TableCell>

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {

                            filtered.map((candidate,index)=>(

                                <TableRow
                                    key={candidate.candidate_id}
                                    hover
                                >

                                    <TableCell>

                                        {

                                            index===0 ?

                                            <EmojiEventsIcon
                                                color="warning"
                                            />

                                            :

                                            index===1 ?

                                            "🥈"

                                            :

                                            index===2 ?

                                            "🥉"

                                            :

                                            index+1

                                        }

                                    </TableCell>

                                    <TableCell>

                                        <Stack
                                            direction="row"
                                            spacing={2}
                                            alignItems="center"
                                        >

                                            <Avatar>

                                                {candidate.name.charAt(0)}

                                            </Avatar>

                                            <Typography>

                                                {candidate.name}

                                            </Typography>

                                        </Stack>

                                    </TableCell>

                                    <TableCell>

                                        {candidate.role}

                                    </TableCell>

                                    <TableCell width={170}>

                                        <LinearProgress
                                            variant="determinate"
                                            value={candidate.resume_score}
                                            sx={{
                                                height:8,
                                                borderRadius:5,
                                            }}
                                        />

                                        <Typography>

                                            {candidate.resume_score}%

                                        </Typography>

                                    </TableCell>

                                    <TableCell width={170}>

                                        <LinearProgress
                                            variant="determinate"
                                            value={candidate.interview_score}
                                            color="secondary"
                                            sx={{
                                                height:8,
                                                borderRadius:5,
                                            }}
                                        />

                                        <Typography>

                                            {candidate.interview_score}%

                                        </Typography>

                                    </TableCell>

                                    <TableCell width={170}>

                                        <LinearProgress
                                            variant="determinate"
                                            value={candidate.proctor_score}
                                            color="warning"
                                            sx={{
                                                height:8,
                                                borderRadius:5,
                                            }}
                                        />

                                        <Typography>

                                            {candidate.proctor_score}%

                                        </Typography>

                                    </TableCell>

                                    <TableCell>

                                        <Chip

                                            icon={<WorkspacePremiumIcon/>}

                                            label={`${candidate.ai_score}%`}

                                            color={
                                                candidate.ai_score>=85

                                                ?

                                                "success"

                                                :

                                                candidate.ai_score>=70

                                                ?

                                                "warning"

                                                :

                                                "error"
                                            }

                                        />

                                    </TableCell>

                                    <TableCell>

                                        <Chip

                                            label={candidate.recommendation}

                                            color={

                                                candidate.recommendation==="Hire"

                                                ?

                                                "success"

                                                :

                                                candidate.recommendation==="Consider"

                                                ?

                                                "warning"

                                                :

                                                "error"

                                            }

                                        />

                                    </TableCell>

                                </TableRow>

                            ))

                        }

                    </TableBody>

                </Table>

            </TableContainer>

            {

                !loading && filtered.length===0 && (

                    <Typography
                        align="center"
                        mt={4}
                    >

                        No candidates found.

                    </Typography>

                )

            }

        </Box>

    );

}