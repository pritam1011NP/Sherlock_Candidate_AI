import {
    Paper,
    Typography,
    Grid,
    Box,
    Chip,
    LinearProgress,
} from "@mui/material";

import PsychologyIcon from "@mui/icons-material/Psychology";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

import {
    CircularProgressbar,
    buildStyles,
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

export default function AIScoreDashboard({

    behaviour,

    voice,

    overall,

}) {

    function getColor(score){

        if(score>=90) return "#10B981";

        if(score>=75) return "#F59E0B";

        return "#EF4444";

    }

    function getLabel(score){

        if(score>=90) return "Excellent";

        if(score>=75) return "Good";

        return "Needs Improvement";

    }

    const cards=[

        {

            title:"Behaviour",

            value:behaviour,

            icon:<PsychologyIcon/>,

        },

        {

            title:"Voice",

            value:voice,

            icon:<GraphicEqIcon/>,

        },

        {

            title:"Overall AI",

            value:overall,

            icon:<WorkspacePremiumIcon/>,

        }

    ];

    return(

        <Paper

            elevation={0}

            sx={{

                p:4,

                borderRadius:5,

                border:"1px solid #E5E7EB",

            }}

        >

            <Typography

                variant="h5"

                fontWeight={700}

                mb={4}

            >

                Live AI Performance

            </Typography>

            <Grid container spacing={4}>

                {

                    cards.map(card=>(

                        <Grid

                            item

                            xs={12}

                            md={4}

                            key={card.title}

                        >

                            <Box

                                textAlign="center"

                            >

                                <Box

                                    width={130}

                                    mx="auto"

                                    mb={3}

                                >

                                    <CircularProgressbar

                                        value={card.value}

                                        text={`${card.value}%`}

                                        styles={buildStyles({

                                            pathColor:getColor(card.value),

                                            textColor:"#111827",

                                            trailColor:"#E5E7EB",

                                        })}

                                    />

                                </Box>

                                <Typography

                                    fontWeight={700}

                                    variant="h6"

                                >

                                    {card.title}

                                </Typography>

                                <Chip

                                    sx={{

                                        mt:2,

                                    }}

                                    color={

                                        card.value>=90

                                        ?"success"

                                        :card.value>=75

                                        ?"warning"

                                        :"error"

                                    }

                                    label={getLabel(card.value)}

                                />

                            </Box>

                        </Grid>

                    ))

                }

            </Grid>

            <Box mt={5}>

                <Typography

                    fontWeight={700}

                    gutterBottom

                >

                    Overall AI Confidence

                </Typography>

                <LinearProgress

                    value={overall}

                    variant="determinate"

                    sx={{

                        height:12,

                        borderRadius:10,

                    }}

                />

            </Box>

        </Paper>

    );

}