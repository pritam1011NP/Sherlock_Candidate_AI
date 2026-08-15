import { useRef, useState } from "react";

export default function useRecorder() {

    const [recording, setRecording] = useState(false);

    const [audioURL, setAudioURL] = useState("");

    const mediaRecorder = useRef(null);

    const chunks = useRef([]);

    async function startRecording() {

        try {

            const stream = await navigator.mediaDevices.getUserMedia({

                audio: true,

            });

            mediaRecorder.current = new MediaRecorder(stream);

            chunks.current = [];

            mediaRecorder.current.ondataavailable = (event) => {

                if (event.data.size > 0) {

                    chunks.current.push(event.data);

                }

            };

            mediaRecorder.current.onstop = () => {

                const blob = new Blob(

                    chunks.current,

                    {

                        type: "audio/webm",

                    }

                );

                const url = URL.createObjectURL(blob);

                setAudioURL(url);

            };

            mediaRecorder.current.start();

            setRecording(true);

        }

        catch (error) {

            console.error(error);

            alert("Microphone permission denied.");

        }

    }

    function stopRecording() {

        if (!mediaRecorder.current) return;

        mediaRecorder.current.stop();

        mediaRecorder.current.stream

            .getTracks()

            .forEach(track => track.stop());

        setRecording(false);

    }

    return {

        recording,

        audioURL,

        startRecording,

        stopRecording,

    };

}