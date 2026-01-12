// src/components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";

import { useAuth } from "./AuthContext";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { token, loading } = useAuth();

    if(loading) return null;

    // Redirect if user is not authenticated
    if (!token) return <Navigate replace to="/" />;

    return children;
};
