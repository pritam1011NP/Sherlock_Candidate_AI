import {
    Paper,
    Typography,
    Grid,
    Slider,
    Switch,
    FormControlLabel,
    MenuItem,
    TextField,
} from "@mui/material";

export default function MatchingSettings({

    settings,

    onChange,

}) {

    return (

        <Paper
            elevation={0}
            sx={{
                p:4,
                borderRadius:4,
                mt:4,
            }}
        >

            <Typography
                variant="h6"
                fontWeight={700}
                mb={3}
            >
                Candidate Matching
            </Typography>

            <Grid container spacing={3}>

                <Grid item xs={12} md={6}>

                    <FormControlLabel

                        control={

                            <Switch

                                checked={settings.enable_matching}

                                onChange={(e)=>

                                    onChange(

                                        "enable_matching",

                                        e.target.checked

                                    )

                                }

                            />

                        }

                        label="Enable AI Matching"

                    />

                </Grid>

                <Grid item xs={12} md={6}>

                    <TextField

                        fullWidth

                        select

                        label="Similarity Algorithm"

                        value={settings.similarity_algorithm}

                        onChange={(e)=>

                            onChange(

                                "similarity_algorithm",

                                e.target.value

                            )

                        }

                    >

                        <MenuItem value="Cosine Similarity">

                            Cosine Similarity

                        </MenuItem>

                        <MenuItem value="Sentence Transformer">

                            Sentence Transformer

                        </MenuItem>

                        <MenuItem value="OpenAI Embedding">

                            OpenAI Embedding

                        </MenuItem>

                    </TextField>

                </Grid>

                <Grid item xs={12}>

                    <Typography gutterBottom>

                        Matching Threshold

                    </Typography>

                    <Slider

                        value={settings.matching_threshold}

                        min={0}

                        max={100}

                        valueLabelDisplay="auto"

                        onChange={(e,v)=>

                            onChange(

                                "matching_threshold",

                                v

                            )

                        }

                    />

                </Grid>

                <Grid item xs={12}>

                    <Typography gutterBottom>

                        Maximum Matches

                    </Typography>

                    <Slider

                        value={settings.maximum_matches}

                        min={1}

                        max={20}

                        valueLabelDisplay="auto"

                        onChange={(e,v)=>

                            onChange(

                                "maximum_matches",

                                v

                            )

                        }

                    />

                </Grid>

            </Grid>

        </Paper>

    );

}