// Base API response structure
export interface ApiResponse<T = unknown> {
    success: boolean;
    message: string;
    data?: T;
}

// Auth-specific response that includes account
export interface AuthApiResponse<T = unknown> {
    success: boolean;
    message: string;
    data?: T;
}

// Common error response
export interface ApiErrorResponse {
    success: false;
    message: string;
    error?: string;
    details?: unknown;
}

// Utility type for handling both success and error responses
export type ApiResult<T = unknown> = ApiResponse<T> | ApiErrorResponse;
export type AuthApiResult<T = unknown> = AuthApiResponse<T> | ApiErrorResponse; 