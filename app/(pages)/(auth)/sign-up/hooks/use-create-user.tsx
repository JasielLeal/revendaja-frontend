import { api } from "@/app/backend/axios"
import { useMutation } from "@tanstack/react-query"

export interface CreateUserBody {
    name: string
    email: string
    password: string
}

export interface CreateUserResponse {
    message: string
    user: {
        id: string
        name: string
        email: string
        createdAt: string
    }
}

export function useCreateUser() {
    return useMutation<CreateUserResponse, Error, CreateUserBody>({
        mutationFn: async (data: CreateUserBody) => {
            const response = await api.post<CreateUserResponse>("/users", data)
            return response.data
        }
    })
}