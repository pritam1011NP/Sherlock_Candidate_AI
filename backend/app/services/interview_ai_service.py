import os
import whisper


# -----------------------------------
# Load Whisper once
# -----------------------------------

print("Loading Whisper model...")

model = whisper.load_model("base")

print("Whisper loaded.")




# -----------------------------------
# Speech → Text
# -----------------------------------

def speech_to_text(audio_path):

    result = model.transcribe(audio_path)

    return result["text"]


# -----------------------------------
# Grammar Score
# -----------------------------------

def grammar_score(text):

    matches = tool.check(text)

    mistakes = len(matches)

    score = max(0, 100 - mistakes * 5)

    return score


# -----------------------------------
# Communication Score
# -----------------------------------

def communication_score(text):

    words = len(text.split())

    if words > 120:
        return 95

    if words > 80:
        return 85

    if words > 40:
        return 75

    if words > 20:
        return 60

    return 40


# -----------------------------------
# Confidence Score
# -----------------------------------

def confidence_score(text):

    filler_words = [
        "um",
        "uh",
        "like",
        "actually",
        "basically",
        "you know",
    ]

    penalty = 0

    lower = text.lower()

    for word in filler_words:

        penalty += lower.count(word)

    return max(0, 100 - penalty * 5)


# -----------------------------------
# Relevance Score
# -----------------------------------

def relevance_score(question, answer):

    question_words = set(question.lower().split())

    answer_words = set(answer.lower().split())

    overlap = len(question_words & answer_words)

    total = len(question_words)

    if total == 0:

        return 0

    return int(overlap / total * 100)


# -----------------------------------
# Overall Score
# -----------------------------------

def overall_score(grammar, confidence, relevance, communication):

    return int(

        (grammar + confidence + relevance + communication) / 4

    )