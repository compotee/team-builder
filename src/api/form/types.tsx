export type FormRole = 'Тимлид' | 'Аналитик' | 'Дизайнер' | 'Frontend-разработчик' | 'Backend-разработчик';

export type Experience = 'Нет практического опыта' | 'До полугода' | 'От полугода до года' | 'Более одного года менее трёх лет' | 'Более трёх лет';

export interface Form {
    id: number;
    user_id: number;
    role: FormRole;
    experience: Experience;
    skills: string[]; 
}

export interface FormResponse {
    forms: Form[];
}

export interface CreateFormData {
    role: FormRole;
    experience: Experience;
    skills: string[];
}

export interface UpdateFormData {
    role?: FormRole;
    experience?: Experience;
    skills?: string[];
}