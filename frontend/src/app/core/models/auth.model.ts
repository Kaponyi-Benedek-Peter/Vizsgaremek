export interface User {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string; // JWT token
  expires_in: number; // Token expiration in seconds (7 days = 604800)
}

export interface RegistrationRequest {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
}

export interface RegistrationPromiseRequest {
  sessionToken: string;
}

export interface RegistrationResponse {
  token: string;
  user: User;
}

export interface PasswordChangeRequest {
  email: string;
}

export interface PasswordChangePromiseRequest {
  sessionToken: string;
  newPassword: string;
}

export interface ApiErrorResponse {
  error: string;
  message?: string;
  statusCode?: number;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  expiresAt: Date | null;
}

export interface StorageOptions {
  stayLoggedIn: boolean;
}
