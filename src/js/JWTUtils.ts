import { jwtDecode, type JwtPayload } from "jwt-decode";

export default function isTokenExpired(token: string): boolean {
    try {
        const decoded = jwtDecode<JwtPayload>(token);
        return Date.now() >= (decoded.exp ? decoded.exp * 1000 : 0);
    } catch (error) {
        return true;
    }
}