import { api } from "@/app/backend/axios";

export interface UserInfo {
    id: string;
    name: string;
    email: string;
    role: string;
    plan: string;
    stripeCustomerId: string;
}

export async function getUserInfo(): Promise<UserInfo> {
    const response = await api.get("/me");
    return response.data;
}