import api from "./axios";

/*
-----------------------------------------
Analyze Resume
-----------------------------------------
*/

export const analyzeResume = async (candidateId) => {

    const response = await api.post(
        `/resume-analysis/${candidateId}`
    );

    return response.data;
};


/*
-----------------------------------------
Get Previous Analysis
-----------------------------------------
*/

export const getResumeAnalysis = async (candidateId) => {

    const response = await api.get(
        `/resume-analysis/${candidateId}`
    );

    return response.data;
};