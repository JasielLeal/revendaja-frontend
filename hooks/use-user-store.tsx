import { useQuery } from "@tanstack/react-query";
import { api } from "@/app/backend/axios";
import { AxiosError } from "axios";

export interface UserStore {
    id: string;
    name: string;
    address: string;
    phone: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
}

async function getUserStore(): Promise<UserStore | null> {
    try {
        const response = await api.get("/stores/me");
        return response.data;
    } catch (error) {
        // Se retornar 404, significa que não tem loja
        if (error instanceof AxiosError && error.response?.status === 404) {
            return null;
        }
        throw error;
    }
}

export function useUserStore() {
    return useQuery({
        queryKey: ["user-store"],
        queryFn: getUserStore,
        retry: (failureCount, error) => {
            // Não retry em 404 (usuário sem loja)
            if (error instanceof AxiosError && error.response?.status === 404) {
                return false;
            }
            return failureCount < 3;
        },
        staleTime: 5 * 60 * 1000, // 5 minutos
    });
}