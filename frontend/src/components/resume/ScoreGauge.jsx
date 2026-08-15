import {
    Paper,
    Typography,
    Box,
    CircularProgress,
} from "@mui/material";

export default function ScoreGauge({

    title,
    value,
    color,

}) {

    return (

        <Paper

            elevation={0}

            sx={{

                p:3,

                borderRadius:4,

                border:"1px solid #E5E7EB",

                textAlign:"center",

                height:"100%",

            }}

        >

            <Typography

                variant="subtitle1"

                color="text.secondary"

                mb={2}

            >

                {title}

            </Typography>

            <Box

                sx={{

                    position:"relative",

                    display:"inline-flex",

                }}

            >

                <CircularProgress

                    variant="determinate"

                    value={100}

                    size={120}

                    thickness={4}

                    sx={{

                        color:"#ECEFF1",

                        position:"absolute",

                    }}

                />

                <CircularProgress

                    variant="determinate"

                    value={value}

                    size={120}

                    thickness={4}

                    sx={{

                        color:color,

                    }}

                />

                <Box

                    sx={{

                        top:0,

                        left:0,

                        bottom:0,

                        right:0,

                        position:"absolute",

                        display:"flex",

                        alignItems:"center",

                        justifyContent:"center",

                        flexDirection:"column",

                    }}

                >

                    <Typography

                        variant="h4"

                        fontWeight={700}

                    >

                        {value}

                    </Typography>

                    <Typography

                        fontSize={13}

                        color="text.secondary"

                    >

                        %

                    </Typography>

                </Box>

            </Box>

        </Paper>

    );

}