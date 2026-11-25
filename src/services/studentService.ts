import api from "./api";

import type { EligibilityApiResponse, StudentFormData, StudentHistoryRecord, StudentHistoryResponse } from "../interfaces/interfaces";



export const checkStudentEligibility = async (data: StudentFormData) => {
    const response = await api.post<EligibilityApiResponse>(
        "/students/check-eligibility",
        data
    );

    return response.data.data;
};


export const getStudentHistory = async (): Promise<StudentHistoryRecord[]> => {
    const response = await api.get<StudentHistoryResponse>(
        "/students/history"
    );

    return response.data.data;
};