import * as faceapi from "face-api.js";

let loaded = false;

export async function loadModels() {

    if (loaded) return;

    const MODEL_URL = "/models";

    try {

        await Promise.all([

            faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),

            faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),

            faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),

            faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),

        ]);

        loaded = true;

        console.log("FaceAPI models loaded successfully.");

    }

    catch (err) {

        console.error("Unable to load FaceAPI models.", err);

    }

}

export async function detectFaces(video) {

    if (!video) return [];

    try {

        return await faceapi

            .detectAllFaces(

                video,

                new faceapi.TinyFaceDetectorOptions({

                    inputSize: 416,

                    scoreThreshold: 0.5,

                })

            )

            .withFaceLandmarks()

            .withFaceExpressions()

            .withFaceDescriptors();

    }

    catch (err) {

        console.error(err);

        return [];

    }

}

/*
-----------------------------------------
Real Mouth Opening
-----------------------------------------
*/

export function getMouthOpening(landmarks) {

    if (!landmarks) return 0;

    const mouth = landmarks.getMouth();

    const upper = mouth[13];

    const lower = mouth[19];

    return Math.abs(lower.y - upper.y);

}

/*
-----------------------------------------
Real Mouth Width
-----------------------------------------
*/

export function getMouthWidth(landmarks) {

    if (!landmarks) return 0;

    const mouth = landmarks.getMouth();

    return Math.abs(

        mouth[6].x - mouth[0].x

    );

}

/*
-----------------------------------------
Eye Aspect Ratio
(Blink Detection)
-----------------------------------------
*/

export function getEyeAspectRatio(landmarks) {

    if (!landmarks) return 0;

    const leftEye = landmarks.getLeftEye();

    const vertical1 = Math.abs(leftEye[1].y - leftEye[5].y);

    const vertical2 = Math.abs(leftEye[2].y - leftEye[4].y);

    const horizontal = Math.abs(leftEye[0].x - leftEye[3].x);

    return (

        (vertical1 + vertical2) /

        (2 * horizontal)

    );

}

/*
-----------------------------------------
Face Center
-----------------------------------------
*/

export function getFaceCenter(face) {

    const box = face.detection.box;

    return {

        x: box.x + box.width / 2,

        y: box.y + box.height / 2,

    };

}

/*
-----------------------------------------
Dominant Emotion
-----------------------------------------
*/

export function getDominantEmotion(face) {

    if (!face?.expressions)

        return "neutral";

    return Object.entries(face.expressions)

        .sort((a, b) => b[1] - a[1])[0][0];

}

/*
-----------------------------------------
Face Quality Score
-----------------------------------------
*/

export function getFaceQuality(face) {

    if (!face)

        return 0;

    return Math.round(

        (face.detection.score || 0) * 100

    );

}