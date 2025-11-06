"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const forgotSchema = z.object({
    email: z.string().email("E-mail inválido"),
});

type ForgotFormData = z.infer<typeof forgotSchema>;

export default function ForgotPasswordPage() {
    const [success, setSuccess] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<ForgotFormData>({
        resolver: zodResolver(forgotSchema),
    });

    const onSubmit = (data: ForgotFormData) => {
        setSuccess(true);
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

                        <Button type="submit" className="w-full h-12 bg-primary text-white hover:opacity-90 cursor-pointer">
                            Enviar link
                        </Button>
                    </>
                ) : (
                    <div className="space-y-4">
                        <h2 className="text-3xl text-foreground font-semibold tracking-tighter">Verifique seu e-mail</h2>
                        <p className="text-muted-foreground tracking-tighter">
                            Enviamos um link de redefinição para o e-mail informado.
                        </p>
                        <Button onClick={() => setSuccess(false)} className="w-full h-12 bg-primary text-white hover:opacity-90 cursor-pointer">
                            Enviar novamente
                        </Button>
                    </div>
                )}
            </form>
    );
}
