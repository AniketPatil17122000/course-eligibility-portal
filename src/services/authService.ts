
import type { LoginPayload, LoginResponse } from "../interfaces/interfaces";
import api from "./api";



export const loginAdmin = async (payload: LoginPayload) => {
    const response = await api.post<LoginResponse>(
        "/auth/login",
        payload
    );

    return response.data;
};
