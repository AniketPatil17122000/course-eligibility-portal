import api from "./api";

import type { StudentFormData } from "../interfaces/interfaces";
import type { EligibilityResult } from "../utils/eligibilityUtils";

interface EligibilityApiResponse {
    success: boolean;
    message: string;
    data: {
        student: StudentFormData;
        result: EligibilityResult;
    };
}

export const checkStudentEligibility = async (data: StudentFormData) => {
    const response = await api.post<EligibilityApiResponse>(
        "/students/check-eligibility",
        data
    );

    return response.data.data;
};

export interface StudentHistoryRecord {
    _id: string;
    studentName: string;
    desiredCourse: string;
    isEligible: boolean;
    createdAt: string;
}

interface StudentHistoryResponse {
    success: boolean;
    message: string;
    data: StudentHistoryRecord[];
}

export const getStudentHistory = async (): Promise<StudentHistoryRecord[]> => {
    const response = await api.get<StudentHistoryResponse>(
        "/students/history"
    );

    return response.data.data;
};