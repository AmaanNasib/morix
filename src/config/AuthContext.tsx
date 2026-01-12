import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

import { User } from "@/interface";

// 🔹 Auth state definition
type AuthState = {
    token: string | null;
    user: User | null;
    loading: boolean;
};

// 🔹 Context contract
type AuthContextValue = AuthState & {
    loginWithToken: (token: string, user: User) => Promise<void>;
    logout: () => void;
    refreshUser: (user: User) => void;
};

// 🔹 Context setup
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = "auth_token";
const STORAGE_USER = "auth_user";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // 🔹 Hydrate from localStorage on mount
    useEffect(() => {
        try {
            const storedToken = localStorage.getItem(STORAGE_KEY);
            const storedUser = localStorage.getItem(STORAGE_USER);

            if (storedToken && storedUser) {
                setToken(storedToken);
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.warn("Failed to read auth data from localStorage:", error);
            localStorage.removeItem(STORAGE_KEY);
            localStorage.removeItem(STORAGE_USER);
        } finally {
            setLoading(false);
        }
    }, []);
    // console.log("token", token, "user", user);

    // 🔹 Write both token and user to localStorage
    const setSession = useCallback((t: string | null, u: User | null) => {
        if (t && u) {
            const { password, ...safeUser } = u;

            console.log(password);

            localStorage.setItem(STORAGE_KEY, t);
            localStorage.setItem(STORAGE_USER, JSON.stringify(safeUser));
            setToken(t);
            setUser(safeUser);
        } else {
            localStorage.removeItem(STORAGE_KEY);
            localStorage.removeItem(STORAGE_USER);
            setToken(null);
            setUser(null);
        }
    }, []);

    // 🔹 Login function
    const loginWithToken = useCallback(async (t: string, userData: User) => {
        setSession(t, userData);
    }, [setSession]);

    // 🔹 Logout without nuking unrelated localStorage data
    const logout = useCallback(() => {
        setSession(null, null);
    }, [setSession]);

    // 🔹 Allow refreshing user info (e.g., after profile edit)
    const refreshUser = useCallback((newUser: User) => {
        setSession(token, newUser);
    }, [token, setSession]);

    const value: AuthContextValue = {
        token,
        user,
        loading,
        loginWithToken,
        logout,
        refreshUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 🔹 Safe hook for using auth context
export const useAuth = (): AuthContextValue => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("❌ useAuth must be used within an AuthProvider");
    }

    return context;
};
