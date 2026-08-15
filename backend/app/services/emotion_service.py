import random


EMOTIONS = [
    "Happy",
    "Neutral",
    "Confident",
    "Nervous",
    "Sad",
]


def analyze_voice(audio_path: str):

    emotion = random.choice(EMOTIONS)

    confidence = round(random.uniform(75, 99), 2)

    return {

        "dominant_emotion": emotion,

        "confidence": confidence,

        "happy": round(random.uniform(0,100),2),

        "neutral": round(random.uniform(0,100),2),

        "sad": round(random.uniform(0,100),2),

        "angry": round(random.uniform(0,100),2),

        "fear": round(random.uniform(0,100),2),

        "disgust": round(random.uniform(0,100),2),

        "surprise": round(random.uniform(0,100),2),

    }