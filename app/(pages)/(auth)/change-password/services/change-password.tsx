import { api } from "@/app/backend/axios";

interface ChangePasswordData {
    token: string;
    newPassword: string;
}

export async function ChangePassword(data: ChangePasswordData) {
    const response = await api.post("/change-password", data);
    return response.data;
}