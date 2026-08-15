import {
    Paper,
    Typography,
    Divider,
    Stack,
    Box,
} from "@mui/material";

import SchoolIcon from "@mui/icons-material/School";

export default function EducationCard({

    education = [

        {
            degree: "B.Tech",
            stream: "Computer Science & Engineering",
            institute: "MAKAUT",
            year: "2023",
            score: "8.91 CGPA",
        },

        {
            degree: "Higher Secondary",
            stream: "Science",
            institute: "WBCHSE",
            year: "2019",
            score: "91%",
        },

    ],

}) {

    return (

        <Paper
            elevation={3}
            sx={{
                p:3,
                borderRadius:3,
            }}
        >

            <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                mb={2}
            >

                <SchoolIcon color="primary"/>

                <Typography
                    variant="h5"
                    fontWeight={700}
                >
                    Education
                </Typography>

            </Stack>

            <Divider sx={{mb:3}}/>

            {

                education.map((item,index)=>(

                    <Box
                        key={index}
                        mb={3}
                    >

                        <Typography
                            fontWeight={700}
                            fontSize={18}
                        >
                            {item.degree}
                        </Typography>

                        <Typography>

                            {item.stream}

                        </Typography>

                        <Typography
                            color="text.secondary"
                        >

                            {item.institute}

                        </Typography>

                        <Typography
                            color="text.secondary"
                        >

                            {item.year}

                        </Typography>

                        <Typography
                            color="primary"
                        >

                            {item.score}

                        </Typography>

                    </Box>

                ))

            }

        </Paper>

    );

}