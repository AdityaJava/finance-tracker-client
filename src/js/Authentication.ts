import axios from "axios";
import { API_ENDPOINTS } from "./apiConstants";
import type { RegisterRequest } from "../types/auth.types";
import { useNavigate } from "react-router-dom";

export async function authenticate(username: String, password: String) {
    try {
        const response = await axios.post(API_ENDPOINTS.LOGIN, {
            "userName": username,
            "password": password,
        });
        const data = response.data; // ✅ Axios gives parsed JSON here
        localStorage.setItem("token", data.accessToken);
        console.log("Authentication successful");
        return data;
    } catch (error) {
        console.error("Authentication failed:", error);
        throw error;
    }
}

export function signInWithGoogle(): void {
    window.location.href = API_ENDPOINTS.GOOGLE_LOGIN;
}

export async function signUp(registerRequest: RegisterRequest) {
    try {
        await axios.post(API_ENDPOINTS.SIGN_UP, registerRequest);

    } catch (error) {
        console.log("Error in signup")
    }
}