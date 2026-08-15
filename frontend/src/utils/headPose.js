import * as faceapi from "face-api.js";

export async function estimateHeadPose(video) {

    const detection = await faceapi
        .detectSingleFace(
            video,
            new faceapi.TinyFaceDetectorOptions()
        )
        .withFaceLandmarks();

    if (!detection) return null;

    const landmarks = detection.landmarks;

    const nose = landmarks.getNose()[3];

    const jaw = landmarks.getJawOutline();

    const leftJaw = jaw[0];

    const rightJaw = jaw[16];

    const eyeLeft = landmarks.getLeftEye();

    const eyeRight = landmarks.getRightEye();

    const eyeCenterX =
        (eyeLeft[0].x + eyeRight[3].x) / 2;

    const eyeCenterY =
        (eyeLeft[0].y + eyeRight[3].y) / 2;

    const yaw =
        ((nose.x - eyeCenterX) /
            (rightJaw.x - leftJaw.x)) *
        100;

    const pitch =
        ((nose.y - eyeCenterY) /
            (rightJaw.x - leftJaw.x)) *
        100;

    let direction = "Center";

    if (yaw < -12)

        direction = "Left";

    else if (yaw > 12)

        direction = "Right";

    if (pitch < -10)

        direction = "Up";

    else if (pitch > 15)

        direction = "Down";

    return {

        yaw,

        pitch,

        direction,

    };

}