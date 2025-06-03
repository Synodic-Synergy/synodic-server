export type UserRole = 'admin' | 'staff' | 'student';

export interface User {
  id: string;
  email: string;
  password: string; // hashed
  role: UserRole;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface InviteCode {
  code: string;
  role: UserRole;
  createdBy: string;
  createdAt: Date;
  expiresAt: Date;
  used: boolean;
  usedBy?: string;
  usedAt?: Date;
}

export interface AuthResponse {
  user: Omit<User, 'password'>;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  inviteCode: string;
}

export interface AdminSetupCredentials {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  setupKey: string;
} 