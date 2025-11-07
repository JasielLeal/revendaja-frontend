"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useCreateUser } from "./hooks/use-create-user";
import { toast } from "sonner";
import { AxiosError } from "axios";

const signUpSchema = z
    .object({
        name: z.string().min(2, "Nome muito curto"),
        email: z.string().email("E-mail inválido"),
        password: z.string().min(6, "Senha deve ter ao menos 6 caracteres"),
        confirmPassword: z.string().min(6, "Senha deve ter ao menos 6 caracteres"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "As senhas não coincidem",
        path: ["confirmPassword"],
    });

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [emailSent, setEmailSent] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
        mode: "onSubmit"
    });

    const createUserMutation = useCreateUser();

    const errorMap: Record<string, string> = {
        "User already exists": "Este e-mail já está cadastrado. Tente fazer login.",
        "Invalid email format": "Formato de e-mail inválido.",
        "Password too short": "A senha deve ter pelo menos 6 caracteres.",
        "Name too short": "O nome deve ter pelo menos 2 caracteres.",
    };

    const onSubmit = async (data: SignUpFormData) => {
        setError(null);

        try {
            await createUserMutation.mutateAsync({
                name: data.name,
                email: data.email,
                password: data.password
            });

            setEmailSent(data.email);

            toast.success("Conta criada com sucesso!", {
                description: "Verifique seu e-mail para ativar sua conta."
            });

        } catch (err) {
            const errorMessage = err instanceof AxiosError
                ? err.response?.data?.error || "Unknown error"
                : "Erro desconhecido";

            const friendlyMessage = errorMap[errorMessage] || "Algo deu errado. Tente novamente.";
            setError(friendlyMessage);
        }
    };

    // Se o email foi enviado, mostra a tela de confirmação
    if (emailSent) {
        return (
            <div className="w-full max-w-md space-y-8 text-center">
                <div className="space-y-4">
                    <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-gray-900">Verifique seu e-mail</h2>
                        <p className="text-gray-600">
                            Enviamos um link de verificação para:
                        </p>
                        <p className="font-semibold text-gray-900">{emailSent}</p>
                        <p className="text-sm text-gray-500">
                            Clique no link do e-mail para ativar sua conta.
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setEmailSent(null)}
                    >
                        Voltar ao cadastro
                    </Button>
                    <div className="text-center">
                        <p className="text-sm text-gray-600">
                            Já verificou seu e-mail?{" "}
                            <Link href="/sign-in" className="font-medium text-primary hover:text-primary/80">
                                Fazer login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-md space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">Criar conta</h2>
                    <p className="text-gray-600">
                        Preencha seus dados para começar a usar a Revendaja
                    </p>
                </div>
            </div>

            {/* Error Alert */}
            {error && (
                <div className="relative flex items-start gap-3 p-4 rounded-lg border border-red-200 bg-red-50">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-red-800">Erro ao criar conta</h4>
                        <p className="text-sm text-red-700 mt-1">{error}</p>
                    </div>
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                    {/* Nome */}
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                            Nome completo
                        </Label>
                        <Input
                            id="name"
                            placeholder="Seu nome completo"
                            className="h-11"
                            {...register("name")}
                        />
                        {errors.name && (
                            <p className="text-sm text-red-600 flex items-center gap-1">
                                <AlertCircle className="w-4 h-4" />
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">E-mail</Label>
                        <Input id="email" placeholder="exemplo@revendaja.com" {...register("email")} />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Senha</Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Digite sua senha"
                                {...register("password")}
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                        </div>
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirmar senha</Label>
                        <div className="relative">
                            <Input
                                id="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Repita sua senha"
                                {...register("confirmPassword")}
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                        </div>
                        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                    </div>
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    className="w-full h-11 font-medium"
                    disabled={createUserMutation.isPending}
                >
                    {createUserMutation.isPending ? (
                        <span className="flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Criando conta...
                        </span>
                    ) : (
                        "Criar conta"
                    )}
                </Button>

                {/* Sign in link */}
                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Já tem conta?{" "}
                        <Link href="/sign-in" className="font-medium text-primary hover:text-primary/80">
                            Entrar agora
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
}
