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
  id: string; // Base64 encoded email (used as identifier by backend)
  password: string; // Base64 encoded password
}

export interface LoginRequestResponse {
  status: string; // email_sent | malformed_request | wrong_password | user_not_found
  statuscode: number;
}

export interface LoginPromiseRequest {
  id: string; // Base64 encoded user id
  confirmation_token: string; // Base64 encoded confirmation token from email link
}

export interface LoginResponse {
  status: string;
  statuscode: number;
  jwt_token: string;
  jwt_token_expiration: string;
  session_token: string;
  session_token_expiration: string;
}

export interface RegistrationRequest {
  email: string; // Base64 encoded email
  password: string; // Base64 encoded password
  firstname: string; // Base64 encoded first name
  lastname: string; // Base64 encoded last name
}

export interface RegistrationPromiseRequest {
  id: string; // Base64 encoded user ID
  token: string; // Base64 encoded confirmation token
}

export interface RegistrationResponse {
  status: string;
  statuscode: number;
  jwt_token: string;
  jwt_token_expiration: string;
  session_token: string;
  session_token_expiration: string;
  user?: User; // Optional user data
}

export interface PasswordChangeRequest {
  email: string; // Base64 encoded email
  password: string; // Base64 encoded new password
}

export interface PasswordChangePromiseRequest {
  id: string; // Base64 encoded user ID
  token: string; // Base64 encoded confirmation token
}

export interface AccountDeletionRequest {
  id: string; // Base64 encoded user ID
  password: string; // Base64 encoded password
}

export interface AccountDeletionPromiseRequest {
  id: string; // Base64 encoded user ID
  token: string; // Base64 encoded confirmation token
}

export interface ApiErrorResponse {
  error: string; // Error code (e.g., "hianyzo_auth_header", "hibas_token")
  message?: string; // Optional error message
  statusCode?: number; // HTTP status code
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null; // JWT token
  expiresAt: Date | null; // Token expiration time
}

export interface JWTPayload {
  sub?: string; // Subject (user ID)
  email?: string;
  name?: string;
  exp?: number; // Expiration timestamp
  iat?: number; // Issued at timestamp
  iss?: string; // Issuer
  aud?: string; // Audience
  jti?: string; // JWT ID
  // .NET specific claims
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'?: string;
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'?: string;
}
