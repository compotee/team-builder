import { httpClient } from '../httpClient';
import type { RegisterRequest, LoginRequest, AuthResponse } from './types';


export const authApi = {
    register: (data: RegisterRequest): Promise<AuthResponse> => {
        return httpClient.post<AuthResponse>('/auth/signUp', data);
    },

    login: (data: LoginRequest): Promise<AuthResponse> => {
        return httpClient.post<AuthResponse>('/auth/signIn', data);
    },
};