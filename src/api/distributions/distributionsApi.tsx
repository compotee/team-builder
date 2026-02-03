import { httpClient } from '../httpClient';
import type { Distribution, DistributionResponse, Team, TeamsResponse, MembersResponse, InviteResponse, CreateDistributionData } from './types';


export const distributionsApi = {
  getAll: (): Promise<DistributionResponse> => {
    return httpClient.get<DistributionResponse>('/split');
  },
  
  getById: (id: number): Promise<Distribution> => {
    return httpClient.get<Distribution>(`/split/${id}`);
  },
  
  create: (data: CreateDistributionData): Promise<Distribution> => {
    return httpClient.post<Distribution>('/split', data);
  },
  
  generateInvite: (id: number): Promise<InviteResponse> => {
    return httpClient.post<InviteResponse>(`/split/${id}/invite`);
  },
  
  joinByInvite: (inviteLink: string): Promise<{ success: boolean; distribution_id: number; message: string }> => {
    return httpClient.post(`/split/join/${inviteLink}`);
  },
  
  getTeams: (id: number): Promise<TeamsResponse> => {
    return httpClient.get<TeamsResponse>(`/split/${id}/teams`);
  },
  
  getMyTeam: (id: number): Promise<Team> => {
    return httpClient.get<Team>(`/split/${id}/team`);
  },
  
  getMembers: (id: number): Promise<MembersResponse> => {
    return httpClient.get<MembersResponse>(`/split/${id}/members`);
  }
};
