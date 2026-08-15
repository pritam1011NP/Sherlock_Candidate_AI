import api from "./axios";

export async function getCandidateSkills(id) {

    const { data } = await api.get(

        `/candidate-skills/${id}`

    );

    return data;

}