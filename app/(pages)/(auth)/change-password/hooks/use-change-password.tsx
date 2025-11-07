import { useMutation } from "@tanstack/react-query";
import { ChangePassword } from "../services/change-password";

interface ChangePasswordData {
    token: string;
    newPassword: string;
}

export function useChangePassword() {
    return useMutation({
        mutationFn: (data: ChangePasswordData) => ChangePassword(data),
    });
}