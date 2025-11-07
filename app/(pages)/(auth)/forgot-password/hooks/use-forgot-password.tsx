import { useMutation } from "@tanstack/react-query";
import { ForgotPassword } from "../services/forgot-password";

interface ForgotPasswordData {
    email: string;
}

export function useForgotPassword() {
    return useMutation({
        mutationFn: (data: ForgotPasswordData) => ForgotPassword(data),
    });
}