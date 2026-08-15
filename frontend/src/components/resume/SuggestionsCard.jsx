import {
    Paper,
    Typography,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@mui/material";

import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import LightbulbIcon from "@mui/icons-material/Lightbulb";

export default function SuggestionsCard({

    suggestions = [

        "Learn AWS Cloud.",

        "Add Kubernetes experience.",

        "Improve resume formatting.",

        "Add certifications.",

        "Mention measurable achievements.",

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

            <Typography
                variant="h5"
                fontWeight={700}
                gutterBottom
            >
                AI Suggestions
            </Typography>

            <Divider sx={{mb:2}}/>

            <List>

                {

                    suggestions.map((item,index)=>(

                        <ListItem
                            key={index}
                        >

                            <ListItemIcon>

                                <LightbulbIcon
                                    color="warning"
                                />

                            </ListItemIcon>

                            <ListItemText
                                primary={item}
                            />

                        </ListItem>

                    ))

                }

            </List>

        </Paper>

    );

}