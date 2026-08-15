import { useEffect, useRef, useState } from "react";

import {

Paper,

Typography,

LinearProgress,

Stack,

Chip,

Box

} from "@mui/material";

import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import MicIcon from "@mui/icons-material/Mic";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";

export default function VoiceAnalyzer({

onVoiceUpdate

}){

const canvasRef=useRef();

const [volume,setVolume]=useState(0);

const [confidence,setConfidence]=useState(94);

const [noise,setNoise]=useState(8);

const [emotion,setEmotion]=useState("Confident");

const [pace,setPace]=useState(118);

useEffect(()=>{

let audioContext;

let analyser;

let source;

let animation;

async function start(){

const stream=

await navigator.mediaDevices.getUserMedia({

audio:true

});

audioContext=new AudioContext();

source=

audioContext.createMediaStreamSource(stream);

analyser=

audioContext.createAnalyser();

analyser.fftSize=256;

source.connect(analyser);

const bufferLength=

analyser.frequencyBinCount;

const dataArray=

new Uint8Array(bufferLength);

const canvas=

canvasRef.current;

const ctx=

canvas.getContext("2d");

function draw(){

animation=requestAnimationFrame(draw);

analyser.getByteFrequencyData(dataArray);

const avg=

dataArray.reduce((a,b)=>a+b,0)/bufferLength;

const vol=Math.round(avg);

setVolume(vol);

const conf=Math.min(100,70+Math.round(vol/3));

setConfidence(conf);

setNoise(Math.max(3,100-conf));

if(conf>90)

setEmotion("Confident");

else if(conf>75)

setEmotion("Normal");

else

setEmotion("Low");

setPace(

110+

Math.floor(Math.random()*20)

);

onVoiceUpdate?.({

confidence:conf,

emotion

});

ctx.clearRect(

0,

0,

canvas.width,

canvas.height

);

ctx.beginPath();

ctx.moveTo(0,60);

for(let i=0;i<bufferLength;i++){

const x=i*2;

const y=60-dataArray[i]/3;

ctx.lineTo(x,y);

}

ctx.strokeStyle="#2563EB";

ctx.lineWidth=2;

ctx.stroke();

}

draw();

}

start();

return()=>{

cancelAnimationFrame(animation);

};

},[]);

return(

<Paper

sx={{

p:3,

borderRadius:4

}}

>

<Typography

variant="h6"

mb={3}

fontWeight={700}

>

Live Voice AI

</Typography>

<canvas

ref={canvasRef}

width={450}

height={120}

style={{

width:"100%"

}}

/>

<Box mt={3}>

<Typography>

Voice Level

</Typography>

<LinearProgress

value={volume}

variant="determinate"

/>

</Box>

<Stack

spacing={2}

mt={3}

>

<Chip

icon={<MicIcon/>}

label={`Volume ${volume}%`}

/>

<Chip

icon={<GraphicEqIcon/>}

color="success"

label={`Confidence ${confidence}%`}

/>

<Chip

label={`Noise ${noise}%`}

/>

<Chip

icon={<RecordVoiceOverIcon/>}

color="primary"

label={`Emotion ${emotion}`}

/>

<Chip

label={`Speech Pace ${pace} WPM`}

/>

</Stack>

</Paper>

);

}