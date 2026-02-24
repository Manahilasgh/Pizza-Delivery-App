"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const API_URL = "http://localhost:8000/auth";

interface User {
    username: string;
    email?: string;
    is_staff?: boolean;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (data: any) => Promise<void>;
    signup: (data: any) => Promise<void>;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check for token in localStorage on mount
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (storedToken) {
            setToken(storedToken);
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        }
        setLoading(false);
    }, []);

    const login = async (data: any) => {
        try {
            const response = await axios.post(`${API_URL}/login`, data);
            const { access, refresh } = response.data;

            setToken(access);
            localStorage.setItem("token", access);
            localStorage.setItem("refresh", refresh);

            // Decode token or user data not provided in login response fully, 
            // but we know username from input. Ideally fetch user profile. 
            // For now, store minimal user info.
            const userData = { username: data.username }; // API response doesn't return user obj
            setUser(userData);
            localStorage.setItem("user", JSON.stringify(userData));

            router.push("/");
        } catch (error) {
            console.error("Login failed", error);
            throw error;
        }
    };

    const signup = async (data: any) => {
        try {
            await axios.post(`${API_URL}/signup`, data);
            // Auto login or redirect to login
            router.push("/auth/login");
        } catch (error) {
            console.error("Signup failed", error);
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("refresh");
        localStorage.removeItem("user");
        router.push("/auth/login");
    };

    return (
        <AuthContext.Provider value={{ user, token, login, signup, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
