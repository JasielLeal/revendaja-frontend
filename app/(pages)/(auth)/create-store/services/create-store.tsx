import { api } from "@/app/backend/axios";

interface CreateStoreData {
    name: string;
    address: string;
    phone: string;
}

export async function createStore(data: CreateStoreData) {
    const response = await api.post("/stores", data);
    return response.data;
}