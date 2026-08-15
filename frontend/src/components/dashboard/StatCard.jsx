import { Paper, Typography, Box } from "@mui/material";
import CountUp from "react-countup";

export default function StatCard({

    title,

    value,

    subtitle,

    icon,

    color,

}) {

    return (

        <Paper

            elevation={0}

            sx={{

                p:3,

                borderRadius:4,

                border:"1px solid #E5E7EB",

                transition:"0.25s",

                cursor:"pointer",

                "&:hover":{

                    transform:"translateY(-6px)",

                    boxShadow:"0 15px 35px rgba(0,0,0,.12)",

                }

            }}

        >

            <Box

                display="flex"

                justifyContent="space-between"

            >

                <Box>

                    <Typography

                        color="text.secondary"

                        fontSize={15}

                    >

                        {title}

                    </Typography>

                    <Typography

                        variant="h3"

                        fontWeight={700}

                        mt={1}

                    >

                        <CountUp

                            end={value}

                            duration={1.5}

                        />

                    </Typography>

                    <Typography

                        mt={1}

                        color="text.secondary"

                    >

                        {subtitle}

                    </Typography>

                </Box>

                <Box

                    sx={{

                        width:70,

                        height:70,

                        borderRadius:3,

                        bgcolor:color,

                        display:"flex",

                        alignItems:"center",

                        justifyContent:"center",

                        color:"#fff",

                        fontSize:30,

                    }}

                >

                    {icon}

                </Box>

            </Box>

        </Paper>

    );

}