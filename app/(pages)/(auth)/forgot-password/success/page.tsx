"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ForgotPasswordSuccessPage() {
    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-white">
            {/* Lado esquerdo */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-primary">
                <div className="relative z-10 flex flex-col justify-between w-full px-12 py-12">
                    <div className="flex items-center">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-3">
                            <div className="w-4 h-4 rounded-sm bg-primary"></div>
                        </div>
                        <h1 className="text-xl font-semibold text-white">Revendaja</h1>
                    </div>

                    <div className="flex-1 flex flex-col justify-center">
                        <h2 className="text-4xl text-white mb-6 leading-tight">
                            Tudo pronto para redefinir sua senha.
                        </h2>
                        <p className="text-white/90 text-lg leading-relaxed">
                            Enviamos um link de redefinição para o e-mail informado.
                            Verifique sua caixa de entrada ou a pasta de spam.
                        </p>
                    </div>

                    <div className="flex justify-between items-center text-white/70 text-sm">
                        <span>© 2025 Revendaja. Todos os direitos reservados.</span>
                        <span className="cursor-pointer hover:text-white/90">
                            Política de Privacidade
                        </span>
                    </div>
                </div>
            </div>

            {/* Lado direito */}
            <div className="flex items-center justify-center w-full lg:w-1/2 p-8">
                <div className="w-full max-w-md text-center space-y-6">
                    <h2 className="text-3xl text-foreground font-semibold">
                        Verifique seu e-mail
                    </h2>
                    <p className="text-muted-foreground text-sm">
                        Enviamos um link de redefinição de senha para o e-mail informado.
                        Verifique sua caixa de entrada ou pasta de spam para continuar.
                    </p>
                    <Link href="/sign-in">
                        <Button className="w-full h-12 text-sm font-medium text-white bg-primary hover:opacity-90">
                            Voltar para o login
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
