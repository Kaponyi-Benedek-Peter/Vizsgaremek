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
  id: string; // Base64 encoded user id (already B64 from email link — do NOT re-encode!)
  confirmation_token: string; // Base64 encoded confirmation token (already B64 from email link)
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
  id: string; // Base64 encoded user ID (from URL — do NOT re-encode!)
  token: string; // Base64 encoded confirmation token (from URL — do NOT re-encode!)
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

// chpass_request: docs specify plain strings (no B64!)
export interface PasswordChangeRequest {
  email: string; // plain string — docs do NOT require B64 here
  password: string; // plain string — docs do NOT require B64 here
}

// chpass_promise: id and token come pre-encoded from URL — do NOT re-encode
export interface PasswordChangePromiseRequest {
  id: string; // from URL, already in the format the backend expects
  token: string; // from URL, already in the format the backend expects
}

export interface AccountDeletionRequest {
  id: string; // Base64 encoded user ID
  password: string; // Base64 encoded password
}

export interface AccountDeletionPromiseRequest {
  id: string; // Base64 encoded — value comes from URL, do NOT re-encode
  token: string; // Base64 encoded — value comes from URL, do NOT re-encode
}

export interface ApiErrorResponse {
  error: string;
  message?: string;
  statusCode?: number;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null; // JWT token
  sessionToken: string | null; // Session token (stored for admin API calls)
  expiresAt: Date | null;
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
