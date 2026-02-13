import { Navigate } from "react-router-dom";

interface Props {
    children: JSX.Element;
}

export default function ProtectedRoute({ children }: Props) {

    const token = localStorage.getItem("token");

    if (!token) {
        // window.location.href =
        //     "http://localhost:8090/oauth2/authorization/google";
        return <Navigate to="/login" replace ></Navigate>;
    }
    return children;
}
