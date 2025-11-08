import { useMutation } from "@tanstack/react-query";
import { createStore } from "@/app/(pages)/(auth)/create-store/services/create-store";

interface CreateStoreData {
    name: string;
    address: string;
    phone: string;
}

export function useCreateStore() {
    return useMutation({
        mutationFn: (data: CreateStoreData) => createStore(data),
    });
}