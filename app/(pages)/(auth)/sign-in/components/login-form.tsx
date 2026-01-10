"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, AlertCircle, X, Loader2 } from "lucide-react";
import { Session } from "../services/session";
import Link from "next/link";
import Image from "next/image";
import logoBlack from "@/public/icon.png";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const loginSchema = z.object({
    email: z.string().email("E-mail inválido"),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const errorMap: Record<string, string> = {
        "Email not verified": "Seu e-mail ainda não foi confirmado. Dê uma olhadinha na sua caixa de entrada.",
        "Invalid email or password": "E-mail ou senha incorretos. Tente novamente.",
        "Password too short": "Sua senha precisa ter pelo menos 6 caracteres.",
        "User not found": "E-mail ou senha incorretos. Tente novamente.",
    };

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const loginMutation = useMutation({
        mutationFn: (data: LoginFormData) => Session(data),
        onSuccess: (data) => {
            toast.success("Login realizado com sucesso!", {
                description: "Redirecionando para o dashboard..."
            });
            // Simular um cookie store (você pode ajustar conforme sua implementação)
            document.cookie = `revendaja-token=${data.token}; path=/`;
            setTimeout(() => router.replace("/dashboard"), 1000);
        },
        onError: (error: AxiosError<{ error: string }>) => {
            const englishMessage = error.response?.data?.error || "Unknown error";
            const friendlyMessage = errorMap[englishMessage] || "Algo deu errado. Tente novamente em instantes.";
            setError(friendlyMessage);
            toast.error("Erro no login", {
                description: friendlyMessage
            });
        },
    });

    const onSubmit = (data: LoginFormData) => {
        loginMutation.mutate(data);
    };

    return (
        <div className="w-full max-w-md space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
                <div className="flex items-center justify-center md:hidden gap-2 mb-4">
                    <Image src={logoBlack} alt="logo do site" width={32} height={32} className="rounded-lg" />
                    <span className="text-xl font-semibold">Revendaja</span>
                </div>
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">Bem-vindo de volta</h2>
                    <p className="text-gray-600">
                        Entre com seu e-mail e senha para acessar o sistema
                    </p>
                </div>
            </div>

            {/* Error Alert */}
            {error && (
                <div className="relative flex items-start gap-3 p-4 rounded-lg border border-red-200 bg-red-50">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-red-800">Não foi possível entrar</h4>
                        <p className="text-sm text-red-700 mt-1">{error}</p>
                    </div>
                    <button
                        onClick={() => setError(null)}
                        className="p-1 rounded-md hover:bg-red-100 transition-colors"
                        type="button"
                    >
                        <X className="w-4 h-4 text-red-600" />
                    </button>
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* E-mail */}
                <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="exemplo@revendaja.com"
                        {...register("email")}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                {/* Senha */}
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

                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <input type="checkbox" id="remember" className="rounded border-gray-300 cursor-pointer" />
                        <Label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
                            Lembrar de mim
                        </Label>
                    </div>
                    <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                        Esqueceu sua senha?
                    </Link>
                </div>

                <Button className="w-full h-12 text-sm font-medium text-white bg-primary hover:opacity-90 cursor-pointer" type="submit" disabled={loginMutation.isPending}>
                    {loginMutation.isPending ? (
                        <span className="flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Entrando...
                        </span>
                    ) : (
                        "Entrar"
                    )}
                </Button>

                <div className="flex items-center justify-center gap-1">
                    <p>Não tem conta?</p>
                    <Link href={'/sign-up'} className="font-medium text-primary hover:underline">
                        Criar agora
                    </Link>
                </div>
            </form>
        </div>
    );
}
