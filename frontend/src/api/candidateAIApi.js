import api from "./axios";

export async function getCandidateAI(id) {

    const { data } = await api.get(`/candidate-ai/${id}`);

    return data;

}