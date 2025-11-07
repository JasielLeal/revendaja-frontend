import { api } from "@/app/backend/axios"
import { useMutation } from "@tanstack/react-query"

export interface VerifyEmailBody {
    token: string
}

export interface VerifyEmailResponse {
    message: string
    user?: {
        id: string
        name: string
        email: string
        verified: boolean
    }
}

export function useVerifyEmail() {
    return useMutation<VerifyEmailResponse, Error, VerifyEmailBody>({
        mutationFn: async (data: VerifyEmailBody) => {
            const response = await api.put<VerifyEmailResponse>("/verify-email", data)
            return response.data
        }
    })
}