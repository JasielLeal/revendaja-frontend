"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useChangePassword } from "./hooks/use-change-password";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const changePasswordSchema = z.object({
    newPassword: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
});

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

export default function ChangePasswordPage() {
    const searchParams = useSearchParams();
    const changePasswordMutation = useChangePassword();

    const token = searchParams.get('token');

    const [success, setSuccess] = useState(false);
    const [tokenValid] = useState<boolean>(() => !!token);

    const { register, handleSubmit, formState: { errors } } = useForm<ChangePasswordFormData>({
        resolver: zodResolver(changePasswordSchema),
    });

    const onSubmit = async (data: ChangePasswordFormData) => {
        if (!token) return;

        try {
            await changePasswordMutation.mutateAsync({
                token,
                newPassword: data.newPassword
            });
            setSuccess(true);
            toast.success("Senha alterada com sucesso!", {
                description: "Sua senha foi redefinida. Agora você pode fazer login."
            });
        } catch (err) {
            const errorMessage = err instanceof AxiosError
                ? err.response?.data?.error || "Erro ao alterar senha"
                : "Erro desconhecido";

            toast.error("Erro ao alterar senha", {
                description: errorMessage === "Invalid token" || errorMessage === "Token expired"
                    ? "Link de redefinição inválido ou expirado"
                    : errorMessage
            });
        }
    };

    // Se não há token, mostrar erro
    if (!tokenValid) {
        return (
            <div className="w-full max-w-md space-y-8 text-center">
                <div className="space-y-4">
                    <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                        <AlertCircle className="w-8 h-8 text-red-600" />
                    </div>
                    <h2 className="text-3xl text-foreground font-semibold tracking-tighter">
                        Link inválido
                    </h2>
                    <p className="text-muted-foreground tracking-tighter">
                        O link de redefinição de senha é inválido ou expirou.
                    </p>
                    <div className="space-y-3">
                        <Link href="/forgot-password">
                            <Button className="w-full h-12 bg-primary text-white hover:opacity-90">
                                Solicitar novo link
                            </Button>
                        </Link>
                        <p className="text-sm text-muted-foreground">
                            Já tem uma conta?{" "}
                            <Link href="/sign-in" className="text-primary hover:underline font-medium">
                                Fazer login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-md space-y-8 text-center">
            {!success ? (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <h2 className="text-3xl text-foreground font-semibold tracking-tighter">
                            Nova senha
                        </h2>
                        <p className="text-muted-foreground tracking-tighter">
                            Digite sua nova senha abaixo.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="newPassword">Nova senha</Label>
                            <Input
                                id="newPassword"
                                type="password"
                                placeholder="Digite sua nova senha"
                                {...register("newPassword")}
                            />
                            {errors.newPassword && (
                                <p className="text-red-500 text-sm">{errors.newPassword.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirmar senha</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="Confirme sua nova senha"
                                {...register("confirmPassword")}
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
                            )}
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full h-12 bg-primary text-white hover:opacity-90"
                        disabled={changePasswordMutation.isPending}
                    >
                        {changePasswordMutation.isPending ? "Alterando..." : "Alterar senha"}
                    </Button>

                    <p className="text-sm text-muted-foreground">
                        Lembrou da senha?{" "}
                        <Link href="/sign-in" className="text-primary hover:underline font-medium">
                            Voltar ao login
                        </Link>
                    </p>
                </form>
            ) : (
                <div className="space-y-4">
                    <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <h2 className="text-3xl text-foreground font-semibold tracking-tighter">
                        Senha alterada!
                    </h2>
                    <p className="text-muted-foreground tracking-tighter">
                        Sua senha foi redefinida com sucesso. Agora você pode fazer login com sua nova senha.
                    </p>
                    <Link href="/sign-in">
                        <Button className="w-full h-12 bg-primary text-white hover:opacity-90">
                            Ir para login
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    );
}