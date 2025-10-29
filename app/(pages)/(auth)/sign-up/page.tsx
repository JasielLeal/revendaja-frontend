"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

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

    const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
        mode: "onSubmit"
    });

    const onSubmit = (data: SignUpFormData) => {
        console.log("Cadastro", data);
    };

    return (

        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md space-y-8">
            <div className="text-center space-y-2">
                <h2 className="text-3xl text-foreground font-semibold tracking-tighter">Criar conta</h2>
                <p className="text-muted-foreground tracking-tighter">
                    Preencha seus dados para começar a usar a Revendaja.
                </p>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Nome completo</Label>
                    <Input id="name" placeholder="John Doe" {...register("name")} />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
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

            <Button type="submit" className="w-full h-12 bg-primary text-white hover:opacity-90 cursor-pointer">
                Criar conta
            </Button>
            <div className="flex items-center justify-center gap-1">
                <p>Já tem conta?</p>
                <Link href={'/sign-in'} className="font-medium text-primary hover:underline">
                    Entrar agora
                </Link>
            </div>
        </form>
    );
}
