import { api } from "@/app/backend/axios";

interface ForgotPasswordData {
    // Define the structure of the data parameter here
    email: string;
}

export async function ForgotPassword(data: ForgotPasswordData) {
    const response = await api.post("/forgot-password", {
        ...data
    })

    return response.data;
}