export interface User {
  id: number;
  lastName: string;
  firstName: string;
  middleName?: string;
  tgLink: string;
}

export interface UpdateUserData {
  lastName?: string;
  firstName?: string;
  middleName?: string;
  tgLink?: string;
}

export interface UpdatePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}