export interface LoginFormType {
    username: string;
    password: string;
    remember: boolean;
}

export interface AccountType {
    id: string;
    username: string;
    email: string;
    access_token: string;
    refresh_token: string;
    refresh_token_expiry: string;
}