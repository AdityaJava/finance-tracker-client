// OAuthSuccess.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OAuthSuccess() {
    const navigate = useNavigate();

    useEffect(() => {
        // Only process if we're actually on the oauth-success page
        if (!window.location.pathname.includes('oauth-success')) {
            return;
        }

        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");

        if (token) {
            localStorage.setItem("token", token);
            navigate("/", { replace: true }); // Use replace to avoid back button issues
        } else {
            navigate("/login", { replace: true });
        }
    }, [navigate]);
    return <div>Logging you in...</div>;
}
