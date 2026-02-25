export interface User {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  role?: string;
  account_state?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginRequestResponse {
  status: string; // email_sent | malformed_request | wrong_password | user_not_found
  statuscode: number;
}

export interface LoginPromiseRequest {
  id: string;
  confirmation_token: string;
}

export interface LoginResponse {
  jwt_token: string;
  session_token?: string;
  jwt_token_expiration?: string;
  user_state: UserState;
}

export interface RegistrationRequest {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
}

export interface RegistrationPromiseRequest {
  id: string;
  token: string;
}

export interface RegistrationResponse {
  status: string;
  statuscode: number;
  jwt_token: string;
  jwt_token_expiration: string;
  session_token: string;
  session_token_expiration: string;
  user?: User;
}

// chpass_request
export interface PasswordChangeRequest {
  email: string;
  password: string;
}

export interface PasswordChangePromiseRequest {
  id: string;
  token: string;
}

export interface AccountDeletionRequest {
  id: string;
  password: string;
}

export interface AccountDeletionPromiseRequest {
  id: string;
  token: string;
}

export interface ApiErrorResponse {
  status: string;
  message?: string;
  statusCode?: number;
}

export type UserState = 'ADMIN' | 'VERIFIED' | 'USER';

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  sessionToken: string | null;
  expiresAt: Date | null;
  role: UserState | null;
}

export interface JWTPayload {
  sub?: string;
  email?: string;
  name?: string;
  exp?: number;
  iat?: number;
  iss?: string;
  aud?: string;
  jti?: string;
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'?: string;
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'?: string;
}
