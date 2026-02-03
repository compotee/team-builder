import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { distributionsApi } from '../api/distributions/distributionsApi';
import type { 
  Distribution, 
  Team, 
  DistributionMember, 
  CreateDistributionData
} from '../api/distributions/types';

interface DistributionsContextType {
  distributions: Distribution[];
  participantDistributions: Distribution[];
  adminDistributions: Distribution[];
  loadDistributions: () => Promise<void>;
  createDistribution: (data: CreateDistributionData) => Promise<Distribution>;
  generateInvite: (id: number) => Promise<string>;
  joinByInvite: (inviteLink: string) => Promise<number>;
  getTeams: (id: number) => Promise<Team[]>;
  getMyTeam: (id: number) => Promise<Team | null>;
  getMembers: (id: number) => Promise<DistributionMember[]>;
}

const DistributionsContext = createContext<DistributionsContextType | undefined>(undefined);

export const DistributionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [distributions, setDistributions] = useState<Distribution[]>([]);

    const participantDistributions = distributions.filter(d => !d.is_admin);
    const adminDistributions = distributions.filter(d => d.is_admin);

    const loadDistributions = useCallback(async () => {
        try {
            const response = await distributionsApi.getAll();
            setDistributions(response.distributions);
        } catch (err) {
            console.log(err);
        } 
    }, []);

    const createDistribution = useCallback(async (data: CreateDistributionData): Promise<Distribution> => {
        try {
            const newDistribution = await distributionsApi.create(data);
            setDistributions(prev => [newDistribution, ...prev]);
            return newDistribution;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }, []);

    const generateInvite = useCallback(async (id: number): Promise<string> => {
        try {
            const response = await distributionsApi.generateInvite(id);
            return response.invite_link;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }, []);

    const joinByInvite = useCallback(async (inviteLink: string): Promise<number> => {
        try {
            const response = await distributionsApi.joinByInvite(inviteLink);
            await loadDistributions();

            return response.distribution_id;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }, [loadDistributions]);

    const getTeams = useCallback(async (id: number): Promise<Team[]> => {
        try {
            const response = await distributionsApi.getTeams(id);
            return response.teams;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }, []);

    const getMyTeam = useCallback(async (id: number): Promise<Team | null> => {
        try {
            const team = await distributionsApi.getMyTeam(id);
            return team;
        } catch (err) {
            console.log(err);
            return null;
        }
    }, []);

    const getMembers = useCallback(async (id: number): Promise<DistributionMember[]> => {
        try {
            const response = await distributionsApi.getMembers(id);
            return response.members;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }, []);

    useEffect(() => {
        const loadData = async () => {
            await loadDistributions();
        };
        
        const timer = setTimeout(() => {
            loadData();
        }, 0);
        
        return () => clearTimeout(timer);
    }, [loadDistributions]);

    const value: DistributionsContextType = {
        distributions,
        participantDistributions,
        adminDistributions,
        loadDistributions,
        createDistribution,
        generateInvite,
        joinByInvite,
        getTeams,
        getMyTeam,
        getMembers
    };

    return (
        <DistributionsContext.Provider value={value}>
        {children}
        </DistributionsContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDistributions = () => {
  const context = useContext(DistributionsContext);
  if (!context) {
    throw new Error('useDistributions must be used within DistributionsProvider');
  }
  return context;
};