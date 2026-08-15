import api from "./axios";

/* Upload Candidate */

export const uploadCandidate = async (formData) => {

    const response = await api.post(
        "/candidates",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};

/* Get All Candidates */

export const getCandidates = async () => {

    const response = await api.get("/candidates");

    return response.data;
};

/* Get Candidate */

export const getCandidate = async (id) => {

    const response = await api.get(`/candidates/${id}`);

    return response.data;
};

/* Update Candidate */

export const updateCandidate = async (id, formData) => {

    const response = await api.put(
        `/candidates/${id}`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};

/* Delete Candidate */

export const deleteCandidate = async (id) => {

    const response = await api.delete(
        `/candidates/${id}`
    );

    return response.data;
};

/* Candidate Status */


export async function updateCandidateStatus(candidateId, status) {

    const { data } = await axios.put(

        `/candidate/${candidateId}/status`,

        {
            status,
        }

    );

    return data;

}