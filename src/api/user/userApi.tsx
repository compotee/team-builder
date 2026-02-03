import { httpClient } from '../httpClient';
import type { User, UpdateUserData, UpdatePasswordData } from './types';


export const userApi = {
    getMe: (): Promise<User> => {
        return httpClient.get<User>('/user/me');
    },
    
    updateMe: (data: UpdateUserData): Promise<User> => {
        return httpClient.put<User>('/user/me', data);
    },
    
    updatePassword: (data: UpdatePasswordData): Promise<{ 
        success: boolean; 
        message: string 
    }> => {
        return httpClient.put('/user/me/password', data);
    }
};