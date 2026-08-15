import {
    Paper,
    Typography,
    Divider,
    Stack,
    Box,
} from "@mui/material";

import WorkHistoryIcon from "@mui/icons-material/WorkHistory";

export default function ExperienceCard({

    experience = [

        {
            company: "Google",
            designation: "Software Engineer",
            duration: "Jan 2022 - Present",
        },

        {
            company: "Microsoft",
            designation: "Backend Developer",
            duration: "Jun 2020 - Dec 2021",
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

                <WorkHistoryIcon color="primary"/>

                <Typography
                    variant="h5"
                    fontWeight={700}
                >
                    Experience
                </Typography>

            </Stack>

            <Divider sx={{mb:3}}/>

            {

                experience.map((item,index)=>(

                    <Box
                        key={index}
                        mb={3}
                    >

                        <Typography
                            fontWeight={700}
                            fontSize={18}
                        >
                            {item.company}
                        </Typography>

                        <Typography
                            color="primary"
                        >
                            {item.designation}
                        </Typography>

                        <Typography
                            color="text.secondary"
                        >
                            {item.duration}
                        </Typography>

                    </Box>

                ))

            }

        </Paper>

    );

}