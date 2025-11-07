"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForgotPassword } from "./hooks/use-forgot-password";
import { toast } from "sonner";
import { AxiosError } from "axios";
import Link from "next/link";

const forgotSchema = z.object({
    email: z.string().email("E-mail inválido"),
});

type ForgotFormData = z.infer<typeof forgotSchema>;

export default function ForgotPasswordPage() {
    const [success, setSuccess] = useState(false);
    const forgotPasswordMutation = useForgotPassword();

    const { register, handleSubmit, formState: { errors }, reset } = useForm<ForgotFormData>({
        resolver: zodResolver(forgotSchema),
    });

    const onSubmit = async (data: ForgotFormData) => {
        try {
            await forgotPasswordMutation.mutateAsync(data);
            setSuccess(true);
            toast.success("E-mail enviado!", {
                description: "Verifique sua caixa de entrada para redefinir sua senha."
            });
        } catch (err) {
            const errorMessage = err instanceof AxiosError
                ? err.response?.data?.error || "Erro ao enviar e-mail"
                : "Erro desconhecido";

            toast.error("Erro ao enviar e-mail", {
                description: errorMessage
            });
        }
    };

    const handleSendAgain = () => {
        setSuccess(false);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md space-y-8 text-center">
            {!success ? (
                <>
                    <div className="space-y-2">
                        <h2 className="text-3xl text-foreground font-semibold tracking-tighter">Redefinir senha</h2>
                        <p className="text-muted-foreground tracking-tighter">
                            Informe seu e-mail e enviaremos um link para redefinir sua senha.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">E-mail</Label>
                        <Input id="email" placeholder="exemplo@revendaja.com" {...register("email")} />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    <Button
                        type="submit"
                        className="w-full h-12 bg-primary text-white hover:opacity-90 cursor-pointer"
                        disabled={forgotPasswordMutation.isPending}
                    >
                        {forgotPasswordMutation.isPending ? "Enviando..." : "Enviar link"}
                    </Button>

                    <p className="text-sm text-muted-foreground">
                        Lembrou da senha?{" "}
                        <Link href="/sign-in" className="text-primary hover:underline font-medium">
                            Voltar ao login
                        </Link>
                    </p>
                </>
            ) : (
                <div className="space-y-4">
                    <h2 className="text-3xl text-foreground font-semibold tracking-tighter">Verifique seu e-mail</h2>
                    <p className="text-muted-foreground tracking-tighter">
                        Enviamos um link de redefinição para o e-mail informado.
                    </p>
                    <Button
                        onClick={handleSendAgain}
                        className="w-full h-12 bg-primary text-white hover:opacity-90 cursor-pointer"
                        disabled={forgotPasswordMutation.isPending}
                    >
                        {forgotPasswordMutation.isPending ? "Enviando..." : "Enviar novamente"}
                    </Button>

                    <p className="text-sm text-muted-foreground">
                        Lembrou da senha?{" "}
                        <Link href="/sign-in" className="text-primary hover:underline font-medium">
                            Voltar ao login
                        </Link>
                    </p>
                </div>
            )}
        </form>
    );
}
