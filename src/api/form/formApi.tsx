import { httpClient } from '../httpClient';
import type { Form, FormResponse, CreateFormData, UpdateFormData } from './types';


export const formsApi = {
    getAll: (): Promise<FormResponse> => {
        return httpClient.get<FormResponse>('/form');
    },
    
    getById: (id: number): Promise<Form> => {
        return httpClient.get<Form>(`/form/${id}`);
    },

    create: (data: CreateFormData): Promise<Form> => {
        return httpClient.post<Form>('/form', data);
    },
    
    update: (id: number, data: UpdateFormData): Promise<Form> => {
        return httpClient.put<Form>(`/form/${id}`, data);
    },

        delete: (id: number): Promise<{ success: boolean; message: string }> => {
        return httpClient.delete(`/form/${id}`);
    }
};