import time
from pathlib import Path

from deepface import DeepFace

from app.config import MIN_CONFIDENCE


DEFAULT_MODEL = "ArcFace"
DEFAULT_DETECTOR = "retinaface"
DEFAULT_METRIC = "cosine"


def compare(
    candidate_path: Path,
    participant_path: Path,
):
    """
    Compare two face images using DeepFace.

    Returns:
        verified
        similarity
        confidence
        distance
        threshold
        processing_time
    """

    start_time = time.time()

    try:

        result = DeepFace.verify(
            img1_path=str(candidate_path),
            img2_path=str(participant_path),
            model_name=DEFAULT_MODEL,
            detector_backend=DEFAULT_DETECTOR,
            distance_metric=DEFAULT_METRIC,
            enforce_detection=True,
            align=True,
        )

        distance = float(
            result.get(
                "distance",
                1.0,
            )
        )

        threshold = float(
            result.get(
                "threshold",
                0.68,
            )
        )

        similarity = max(
            0.0,
            min(
                100.0,
                (1 - distance) * 100,
            ),
        )

        verified = (
            result.get("verified", False)
            and similarity >= MIN_CONFIDENCE
        )

        processing_time = round(
            time.time() - start_time,
            3,
        )

        return {

            "success": True,

            "verified": verified,

            "similarity": round(
                similarity,
                2,
            ),

            "confidence": round(
                similarity,
                2,
            ),

            "distance": round(
                distance,
                4,
            ),

            "threshold": round(
                threshold,
                4,
            ),

            "processing_time": processing_time,

            "model": DEFAULT_MODEL,

            "detector": DEFAULT_DETECTOR,
        }

    except Exception as e:

        return {

            "success": False,

            "verified": False,

            "similarity": 0.0,

            "confidence": 0.0,

            "distance": 1.0,

            "threshold": 0.0,

            "processing_time": round(
                time.time() - start_time,
                3,
            ),

            "model": DEFAULT_MODEL,

            "detector": DEFAULT_DETECTOR,

            "error": str(e),
        }