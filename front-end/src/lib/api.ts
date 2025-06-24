import { ApiResponse } from "@/types/api";

interface RequestOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    body?: Record<string, unknown> | string | FormData | null;
    headers?: Record<string, string>;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';

export async function sendRequest<T = Record<string, unknown>>(
    endpoint: string,
    options: RequestOptions = {}
): Promise<ApiResponse<T>> {
    const { method = 'GET', body, headers = {} } = options;

    const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

    const config: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
    };

    if (body && method !== 'GET') {
        config.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(url, config);
        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: data.message || `API Error: ${response.status}`,
                statusCode: response.status,
                ...data
            } as ApiResponse<T>;
        }

        return {
            success: true,
            ...data
        } as ApiResponse<T>;
    } catch (error) {
        console.error('Fetch error:', error);
        return {
            success: false,
            message: 'Network error or server unavailable',
            statusCode: 500
        } as ApiResponse<T>;
    }
}
