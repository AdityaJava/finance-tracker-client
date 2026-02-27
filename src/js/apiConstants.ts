const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const AUTH_API_BASE_URL = import.meta.env.VITE_AUTH_API_BASE_URL;

export const API_ENDPOINTS = {
    BASE: API_BASE_URL,
    AUTH_BASE: AUTH_API_BASE_URL,
    LOGIN: `${AUTH_API_BASE_URL}/generate-token`,
    GOOGLE_LOGIN: `${AUTH_API_BASE_URL}/oauth2/authorization/google`,
    SIGN_UP: `${AUTH_API_BASE_URL}/api/auth/signup`,
    USERS: `${API_BASE_URL}/api/users`,
};

export const ACCOUNT_ENDPOINTS = {
    ACCOUNTS_PAGE: `${API_BASE_URL}/api/accounts`,
    CREATE_ACCOUNT: `${API_BASE_URL}/api/accounts`,
}
