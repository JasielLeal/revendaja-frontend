"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { api } from "../backend/axios";
import Cookies from "universal-cookie";

interface User {
    id: string;
    name: string;
    email: string;
    role?: string;
    plan?: string;
}

interface UserContextType {
    user: User | null;
    isLoading: boolean;
    refreshUser: () => Promise<void>;
    logout: () => void;
}

const UserContext = createContext<UserContextType>({
    user: null,
    isLoading: true,
    refreshUser: async () => { },
    logout: () => { },
});

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const cookie = new Cookies();
    const token = cookie.get("revendaja-token");

    async function refreshUser() {

        try {
            const { data } = await api.get("/me", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUser(data);
        } catch (error) {
            console.error("Erro ao buscar usuário:", error);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    }


    function logout() {
        document.cookie = "token=; Max-Age=0; path=/;";
        setUser(null);
    }

    useEffect(() => {
        refreshUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, isLoading, refreshUser, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}
