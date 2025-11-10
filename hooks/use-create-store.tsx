import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createStore } from "@/app/(pages)/(auth)/create-store/services/create-store";

interface CreateStoreData {
    name: string;
    address: string;
    phone: string;
}

export function useCreateStore() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateStoreData) => createStore(data),
        onSuccess: () => {
            // Invalida o cache da loja do usuário para recarregar
            queryClient.invalidateQueries({ queryKey: ["user-store"] });
        },
    });
}