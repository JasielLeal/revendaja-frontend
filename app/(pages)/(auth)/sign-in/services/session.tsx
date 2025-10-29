import { api } from "@/app/backend/axios";

interface SessionData {
    // Define the structure of the data parameter here
    email: string;
    password: string;
}

export async function Session(data: SessionData) {
    const response = await api.post("/signin", {
        ...data
    })

    return response.data;
}