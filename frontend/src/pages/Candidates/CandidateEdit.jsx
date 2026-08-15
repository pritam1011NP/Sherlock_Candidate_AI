import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    Paper,
    
    TextField,
    Button,
    Typography,
    Avatar,
    Box,
    Stack,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import {
    getCandidate,
    updateCandidate,
} from "../../api/candidateApi";

export default function CandidateEdit() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [candidate, setCandidate] = useState({
        full_name: "",
        email: "",
        phone: "",
        position: "",
        address: "",
    });

    const [resume, setResume] = useState(null);
    const [photo, setPhoto] = useState(null);

    useEffect(() => {

        async function loadCandidate() {

            try {

                const data = await getCandidate(id);

                setCandidate(data);

            } catch (err) {

                console.error(err);

            } finally {

                setLoading(false);

            }

        }

        loadCandidate();

    }, [id]);

    const handleChange = (e) => {

        setCandidate({
            ...candidate,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const formData = new FormData();

        formData.append("full_name", candidate.full_name);
        formData.append("email", candidate.email);
        formData.append("phone", candidate.phone);
        formData.append("position", candidate.position);
        formData.append("address", candidate.address);

        if (resume)
            formData.append("resume", resume);

        if (photo)
            formData.append("photo", photo);

        try {

            await updateCandidate(id, formData);

            alert("Candidate updated successfully.");

            navigate(`/candidates/${id}`);

        } catch (err) {

            console.error(err);

            alert("Update failed.");

        }

    };

    if (loading)
        return <Typography>Loading...</Typography>;

    return (

        <Paper
            sx={{
                p:4,
                borderRadius:3,
            }}
        >

            <Typography
                variant="h4"
                mb={4}
            >
                Edit Candidate
            </Typography>

            <Box
                component="form"
                onSubmit={handleSubmit}
            >

                <Grid container spacing={3}>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Avatar
                            src={`http://127.0.0.1:8000/${candidate.photo_path}`}
                            sx={{
                                width:180,
                                height:180,
                                mb:2,
                            }}
                        />

                        <Button
                            component="label"
                            variant="outlined"
                            fullWidth
                        >
                            Replace Photo

                            <input
                                hidden
                                type="file"
                                accept="image/*"
                                onChange={(e)=>setPhoto(e.target.files[0])}
                            />

                        </Button>

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Stack spacing={3}>

                            <TextField
                                label="Full Name"
                                name="full_name"
                                value={candidate.full_name}
                                onChange={handleChange}
                                fullWidth
                            />

                            <TextField
                                label="Email"
                                name="email"
                                value={candidate.email}
                                onChange={handleChange}
                                fullWidth
                            />

                            <TextField
                                label="Phone"
                                name="phone"
                                value={candidate.phone}
                                onChange={handleChange}
                                fullWidth
                            />

                            <TextField
                                label="Position"
                                name="position"
                                value={candidate.position}
                                onChange={handleChange}
                                fullWidth
                            />

                            <TextField
                                label="Address"
                                name="address"
                                value={candidate.address}
                                onChange={handleChange}
                                multiline
                                rows={3}
                                fullWidth
                            />

                            <Button
                                component="label"
                                variant="outlined"
                            >
                                Replace Resume

                                <input
                                    hidden
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    onChange={(e)=>setResume(e.target.files[0])}
                                />

                            </Button>

                            <Stack
                                direction="row"
                                spacing={2}
                            >

                                <Button
                                    variant="contained"
                                    type="submit"
                                >
                                    Save Changes
                                </Button>

                                <Button
                                    variant="outlined"
                                    onClick={()=>navigate(-1)}
                                >
                                    Cancel
                                </Button>

                            </Stack>

                        </Stack>

                    </Grid>

                </Grid>

            </Box>

        </Paper>

    );

}