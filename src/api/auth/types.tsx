export interface RegisterRequest {
    lastName: string;
    firstName: string;
    middleName?: string;
    tgLink: string;
    username: string;
    password: string;
    password_repeat: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface AuthResponse {
    success: boolean;
    message: string;
}