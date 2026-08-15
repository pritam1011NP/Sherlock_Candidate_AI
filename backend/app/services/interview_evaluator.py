import re


def grammar_score(transcript: str):

    transcript = transcript.strip()

    if len(transcript) == 0:
        return 0

    words = transcript.split()

    score = 100

    # Too short
    if len(words) < 8:
        score -= 30

    # Too many repeated words
    unique_ratio = len(set(word.lower() for word in words)) / len(words)

    if unique_ratio < 0.55:
        score -= 15

    # Missing sentence ending
    if transcript[-1] not in ".!?":
        score -= 5

    # Very long sentence
    if len(words) > 80:
        score -= 10

    return max(0, min(score, 100))


def relevance_score(question: str, transcript: str):

    q_words = set(re.findall(r"\w+", question.lower()))
    a_words = set(re.findall(r"\w+", transcript.lower()))

    overlap = len(q_words.intersection(a_words))

    if len(q_words) == 0:
        return 50

    score = int((overlap / len(q_words)) * 100)

    return max(20, min(score, 100))


def confidence_score(transcript: str):

    transcript = transcript.lower()

    filler_words = [

        "um",
        "uh",
        "like",
        "actually",
        "basically",
        "you know",
        "hmm",

    ]

    score = 100

    for word in filler_words:

        score -= transcript.count(word) * 5

    return max(0, score)


def communication_score(transcript: str):

    words = transcript.split()

    if len(words) == 0:
        return 0

    avg_word_length = sum(len(w) for w in words) / len(words)

    score = 60

    if len(words) > 20:
        score += 20

    if avg_word_length > 4:
        score += 20

    return min(score, 100)


def evaluate_answer(question: str, transcript: str):

    grammar = grammar_score(transcript)

    relevance = relevance_score(
        question,
        transcript,
    )

    confidence = confidence_score(transcript)

    communication = communication_score(transcript)

    overall = round(

        (
            grammar +
            relevance +
            confidence +
            communication

        ) / 4

    )

    if overall >= 85:

        feedback = (
            "Excellent answer. Clear, confident and relevant."
        )

    elif overall >= 70:

        feedback = (
            "Good answer. Minor improvements possible."
        )

    elif overall >= 50:

        feedback = (
            "Average answer. Improve confidence and relevance."
        )

    else:

        feedback = (
            "Needs significant improvement."
        )

    return {

        "grammar_score": grammar,

        "relevance_score": relevance,

        "confidence_score": confidence,

        "communication_score": communication,

        "overall_score": overall,

        "feedback": feedback,

    }