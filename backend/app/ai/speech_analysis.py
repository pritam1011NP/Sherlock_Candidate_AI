import librosa
import numpy as np


# -------------------------------------------------------
# Load Audio
# -------------------------------------------------------

def load_audio(audio_path):

    y, sr = librosa.load(
        audio_path,
        sr=16000,
    )

    return y, sr


# -------------------------------------------------------
# Speaking Rate
# -------------------------------------------------------

def speaking_rate(y, sr):

    duration = librosa.get_duration(y=y, sr=sr)

    intervals = librosa.effects.split(
        y,
        top_db=25,
    )

    words = len(intervals)

    if duration == 0:
        return 0

    wpm = words * 60 / duration

    return round(wpm, 2)


# -------------------------------------------------------
# Silence Detection
# -------------------------------------------------------

def silence_ratio(y):

    intervals = librosa.effects.split(
        y,
        top_db=25,
    )

    speech = 0

    for start, end in intervals:
        speech += end - start

    silence = len(y) - speech

    ratio = silence / len(y)

    return round(ratio * 100, 2)


# -------------------------------------------------------
# Pause Count
# -------------------------------------------------------

def pause_count(y):

    intervals = librosa.effects.split(
        y,
        top_db=25,
    )

    if len(intervals) <= 1:
        return 0

    return len(intervals) - 1


# -------------------------------------------------------
# Voice Energy
# -------------------------------------------------------

def voice_energy(y):

    rms = librosa.feature.rms(y=y)

    return float(np.mean(rms))


# -------------------------------------------------------
# Pitch
# -------------------------------------------------------

def average_pitch(y, sr):

    pitches, magnitudes = librosa.piptrack(
        y=y,
        sr=sr,
    )

    values = pitches[magnitudes > np.median(magnitudes)]

    if len(values) == 0:
        return 0

    return float(np.mean(values))


# -------------------------------------------------------
# Confidence Estimation
# -------------------------------------------------------

def confidence_score(
    energy,
    silence,
    pauses,
):

    score = 100

    if energy < 0.03:
        score -= 20

    if silence > 45:
        score -= 20

    if pauses > 20:
        score -= 15

    if score < 0:
        score = 0

    return score


# -------------------------------------------------------
# Recommendation
# -------------------------------------------------------

def recommendation(score):

    if score >= 90:
        return "Excellent communication"

    if score >= 75:
        return "Good communication"

    if score >= 60:
        return "Needs improvement"

    return "Poor communication"


# -------------------------------------------------------
# Main Analysis
# -------------------------------------------------------

def analyze(audio_path):

    y, sr = load_audio(audio_path)

    wpm = speaking_rate(y, sr)

    silence = silence_ratio(y)

    pauses = pause_count(y)

    energy = voice_energy(y)

    pitch = average_pitch(y, sr)

    confidence = confidence_score(
        energy,
        silence,
        pauses,
    )

    return {

        "speaking_rate": wpm,

        "silence_percent": silence,

        "pause_count": pauses,

        "voice_energy": round(energy, 4),

        "pitch": round(pitch, 2),

        "confidence": confidence,

        "recommendation": recommendation(confidence),

    }