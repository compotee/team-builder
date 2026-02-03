export type Role = 'Тимлид' | 'Аналитик' | 'Дизайнер' | 'Frontend-разработчик' | 'Backend-разработчик';

export type DistributionStatus = 'active' | 'completed' | 'end';

export interface Distribution {
    id: number;
    name: string;
    max_members_team: number;
    possible_roles: Role[];
    status: DistributionStatus;
    auto_finish_date: string;
    auto_finish_time: string;
    team_expiry_date: string; 
    invite_link: string; 
    is_admin: boolean; 
    admin_id: number; 
}

export interface CreateDistributionData {
    name: string;
    max_members_team: number;
    possible_roles: Role[];
    auto_finish_date: string;
    auto_finish_time: string;
    team_expiry_date: string;
}

export interface Team {
    id: number;
    name: string;
    distribution_id: number;
    members: TeamMember[];
}

export interface TeamMember {
    id: number;
    user_id: number;
    username: string;
    role: Role;
    }

export interface DistributionMember {
    id: number;
    user_id: number;
    username: string;
    is_admin: boolean;
}

export interface DistributionResponse {
    distributions: Distribution[];
    total: number;
}

export interface TeamsResponse {
    teams: Team[];
    total: number;
}

export interface MembersResponse {
    members: DistributionMember[];
    total: number;
}

export interface InviteResponse {
    invite_link: string;
    expires_at: string;
}
