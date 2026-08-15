import {
    Paper,
    Typography,
    Chip,
    Stack,
    Box,
} from "@mui/material";

import {
    CheckCircle,
    Cancel,
} from "@mui/icons-material";

export default function SkillsCard({

    title,
    skills = [],
    color = "success",

}) {

    const success = color === "success";

    return (

        <Paper
            elevation={0}
            sx={{
                p:4,
                borderRadius:4,
                border:"1px solid #e5e7eb",
                height:"100%",
            }}
        >

            <Typography
                variant="h5"
                fontWeight={700}
                mb={3}
            >
                {title}
            </Typography>

            {

                skills.length === 0 ?

                (

                    <Typography
                        color="text.secondary"
                    >
                        No data available.
                    </Typography>

                )

                :

                (

                    <Stack
                        direction="row"
                        spacing={1.5}
                        useFlexGap
                        flexWrap="wrap"
                    >

                        {

                            skills.map((skill,index)=>(

                                <Chip

                                    key={index}

                                    icon={
                                        success ?

                                        <CheckCircle/>

                                        :

                                        <Cancel/>
                                    }

                                    label={skill}

                                    color={color}

                                    variant={
                                        success
                                        ? "filled"
                                        : "outlined"
                                    }

                                    sx={{

                                        fontWeight:600,

                                        px:1,

                                        py:2.4,

                                        fontSize:15,

                                        transition:"0.25s",

                                        "&:hover":{

                                            transform:"translateY(-3px)",

                                            boxShadow:
                                            "0 8px 18px rgba(0,0,0,.12)",

                                        },

                                    }}

                                />

                            ))

                        }

                    </Stack>

                )

            }

            <Box mt={4}>

                <Typography
                    color="text.secondary"
                    fontSize={14}
                >

                    {

                        success ?

                        `${skills.length} skills detected from the resume.`

                        :

                        `${skills.length} important skills are missing.`

                    }

                </Typography>

            </Box>

        </Paper>

    );

}