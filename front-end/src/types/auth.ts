export interface LoginFormType {
    username: string;
    password: string;
    remember: boolean;
}

export interface RegisterFormType {
    username: string;
    password: string;
    confirm_password: string;
}

export interface ForgotPasswordFormType {
    username: string;
}

export interface AccountType {
    id: string;
    username: string;
    email: string;
    access_token: string;
    refresh_token: string;
    refresh_token_expiry: string;
}