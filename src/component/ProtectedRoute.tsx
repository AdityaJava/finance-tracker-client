import { useEffect, type JSX } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
    children: JSX.Element;
}

export default function ProtectedRoute({ children }: Props) {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            window.location.href =
                "http://localhost:8090/oauth2/authorization/google";
        }
    }, []);

    return children;
}
