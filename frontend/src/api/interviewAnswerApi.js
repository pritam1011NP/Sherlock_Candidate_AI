import axios from "axios";

const API = "http://127.0.0.1:8000";

export async function uploadInterviewAnswer(
    candidateId,
    questionNumber,
    question,
    audioBlob,
) {
    const formData = new FormData();

    formData.append(
        "candidate_id",
        candidateId,
    );

    formData.append(
        "question_number",
        questionNumber,
    );

    formData.append(
        "question",
        question,
    );

    formData.append(
        "audio",
        new File(
            [audioBlob],
            `answer_${questionNumber}.webm`,
            {
                type: "audio/webm",
            },
        ),
    );

    const response = await axios.post(
        `${API}/interview-answers/upload`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        },
    );

    return response.data;
}