import {
    Paper,
    Typography,
    Divider,
    Stack,
    Box,
    Chip,
} from "@mui/material";

import FolderSpecialIcon from "@mui/icons-material/FolderSpecial";

export default function ProjectsCard({

    projects = [

        {
            title: "Sherlock Candidate AI",
            technology: "React • FastAPI • InsightFace",
        },

        {
            title: "Attendance System",
            technology: "Python • OpenCV",
        },

        {
            title: "Hospital Management",
            technology: "React • MySQL",
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

                <FolderSpecialIcon color="primary"/>

                <Typography
                    variant="h5"
                    fontWeight={700}
                >
                    Projects
                </Typography>

            </Stack>

            <Divider sx={{mb:3}}/>

            {

                projects.map((project,index)=>(

                    <Box
                        key={index}
                        mb={3}
                    >

                        <Typography
                            fontWeight={700}
                            fontSize={18}
                        >
                            {project.title}
                        </Typography>

                        <Chip
                            label={project.technology}
                            color="primary"
                            sx={{mt:1}}
                        />

                    </Box>

                ))

            }

        </Paper>

    );

}