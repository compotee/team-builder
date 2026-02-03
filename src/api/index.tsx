import { authApi } from './auth/authApi';
import { userApi } from './user/userApi';
import { formsApi } from './form/formApi';
import { distributionsApi } from './distributions/distributionsApi';

export const api = {
    auth: authApi,
    user: userApi,
    forms: formsApi,
    distributions: distributionsApi
};

export type { RegisterRequest, LoginRequest } from './auth/types';
export type { User, UpdateUserData, UpdatePasswordData } from './user/types';
export type { Form, FormRole, Experience } from './form/types';
export type { Distribution, Team, DistributionMember, Role, DistributionStatus } from './distributions/types';
