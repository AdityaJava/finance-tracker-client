const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const AUTH_API_BASE_URL = import.meta.env.VITE_AUTH_API_BASE_URL;

export const API_ENDPOINTS = {
    BASE: API_BASE_URL,
    AUTH_BASE: AUTH_API_BASE_URL,
    LOGIN: `${AUTH_API_BASE_URL}/generate-token`,
    USERS: `${API_BASE_URL}/api/users`,
};
