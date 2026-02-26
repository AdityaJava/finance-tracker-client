import axios from "axios";
import isTokenExpired from "../js/JWTUtils";

const api = axios.create({
    baseURL: "http://localhost:8080",
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        if (isTokenExpired(token)) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;
