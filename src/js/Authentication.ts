import axios from "axios";
import { API_ENDPOINTS } from "./apiConstants";

export async function authenticate(username: String, password: String) {
    try {
        const response = await axios.post(API_ENDPOINTS.LOGIN, {
            "userName": username,
            "password": password,
        });
        const data = response.data; // ✅ Axios gives parsed JSON here
        localStorage.setItem("token", data.accessToken); // assuming backend returns { token: "..." }
        return data;
    } catch (error) {
        console.error("Authentication failed:", error);
        throw error;
    }
}
