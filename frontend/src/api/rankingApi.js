import axios from "./axios";

export async function getCandidateRanking() {

    const { data } = await axios.get("/ranking");

    return data;

}