
import api from "./api";

export interface LoginPayload {
    email: string;
    password: string;
}

export interface LoginResponse {
    success: boolean;
    message: string;
    data: {
        token: string;
        admin: {
            id: string;
            email: string;
        };
    };
}

export const loginAdmin = async (payload: LoginPayload) => {
    const response = await api.post<LoginResponse>(
        "/auth/login",
        payload
    );

    return response.data;
};
