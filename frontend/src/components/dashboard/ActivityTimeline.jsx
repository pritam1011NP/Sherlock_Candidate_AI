import {
    Box,
    Typography,
    Avatar,
    Chip,
    Card,
    CardContent,
} from "@mui/material";

import {
    PersonAdd,
    Face,
    Psychology,
    CheckCircle,
    Warning,
    UploadFile,
} from "@mui/icons-material";

const activities = [
    {
        id:1,
        candidate:"Rahul Sharma",
        action:"AI matched candidate profile",
        score:"94% Match",
        time:"2 minutes ago",
        type:"success",
        icon:<Psychology />,
        avatar:"RS"
    },

    {
        id:2,
        candidate:"Priya Singh",
        action:"Face verification completed",
        score:"Verified",
        time:"15 minutes ago",
        type:"verified",
        icon:<Face />,
        avatar:"PS"
    },

    {
        id:3,
        candidate:"Amit Kumar",
        action:"New resume uploaded",
        score:"Processing",
        time:"1 hour ago",
        type:"pending",
        icon:<UploadFile />,
        avatar:"AK"
    },

    {
        id:4,
        candidate:"Sneha Patel",
        action:"AI screening completed",
        score:"82% Match",
        time:"3 hours ago",
        type:"warning",
        icon:<Warning />,
        avatar:"SP"
    }
];


const colors = {

    success:"#22c55e",
    verified:"#3b82f6",
    pending:"#f59e0b",
    warning:"#ef4444"

};



export default function ActivityTimeline(){

return (

<Box>


<Typography
variant="h6"
fontWeight={700}
mb={3}
>
Recent Activity
</Typography>



<Box
sx={{
position:"relative",
ml:2
}}
>


{/* vertical line */}

<Box
sx={{
position:"absolute",
left:18,
top:10,
bottom:10,
width:"3px",
background:"#e5e7eb"
}}
/>



{
activities.map((item)=>(


<Box
key={item.id}
sx={{
display:"flex",
gap:2,
mb:3,
position:"relative"
}}
>



{/* icon */}

<Box
sx={{
zIndex:2,
width:38,
height:38,
borderRadius:"50%",
display:"flex",
alignItems:"center",
justifyContent:"center",
background:colors[item.type],
color:"#fff",

boxShadow:
`0 0 0 5px #fff,0 5px 15px ${colors[item.type]}55`,

transition:"0.3s",

"&:hover":{
transform:"scale(1.15)"
}

}}
>

{item.icon}

</Box>




<Card

elevation={0}

sx={{

flex:1,

borderRadius:3,

border:"1px solid #e5e7eb",

transition:"0.3s",

"&:hover":{
transform:"translateY(-4px)",
boxShadow:
"0 10px 25px rgba(0,0,0,0.08)"
}

}}

>


<CardContent>


<Box
display="flex"
alignItems="center"
gap={2}
>


<Avatar

sx={{
width:45,
height:45,
fontWeight:700,
background:"#111827"
}}

>

{item.avatar}

</Avatar>



<Box flex={1}>

<Typography
fontWeight={700}
>
{item.candidate}
</Typography>


<Typography
variant="body2"
color="text.secondary"
>

{item.action}

</Typography>


<Typography
variant="caption"
color="gray"
>

{item.time}

</Typography>


</Box>



<Chip

label={item.score}

size="small"

sx={{
background:
`${colors[item.type]}20`,
color:
colors[item.type],
fontWeight:700
}}

 />



</Box>


</CardContent>


</Card>



</Box>



))

}



</Box>


</Box>


)

}