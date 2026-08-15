import {
    FilesetResolver,
    FaceLandmarker,
} from "@mediapipe/tasks-vision";

let faceLandmarker = null;

let initialized = false;

export async function loadLipSyncModel() {

    if (initialized) return;

    const vision = await FilesetResolver.forVisionTasks(

        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"

    );

    faceLandmarker = await FaceLandmarker.createFromOptions(

        vision,

        {

            baseOptions: {

                modelAssetPath:
                    "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task",

            },

            outputFaceBlendshapes: true,

            runningMode: "VIDEO",

            numFaces: 1,

        }

    );

    initialized = true;

}

export async function detectLipMovement(video) {

    if (!faceLandmarker) return null;

    if (!video) return null;

    if (video.readyState !== 4) return null;

    const result = faceLandmarker.detectForVideo(

        video,

        performance.now()

    );

    if (!result.faceLandmarks.length)

        return null;

    const mouth = result.faceLandmarks[0];

    const upperLip = mouth[13];

    const lowerLip = mouth[14];

    const leftLip = mouth[78];

    const rightLip = mouth[308];

    const vertical = Math.abs(

        upperLip.y - lowerLip.y

    );

    const horizontal = Math.abs(

        leftLip.x - rightLip.x

    );

    const openness =

        (vertical / horizontal) * 100;

    return {

        openness,

        landmarks: mouth,

    };

}