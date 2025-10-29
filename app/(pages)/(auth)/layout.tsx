"use client";
import { ReactNode } from "react";

interface AuthLayoutProps {
    children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="min-h-screen flex font-sans">
            {/* Lado esquerdo */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-primary">
                <div className="relative z-10 flex flex-col justify-between w-full px-12 py-12">
                    <div className="flex items-center">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-3">
                            <div className="w-4 h-4 rounded-sm bg-primary"></div>
                        </div>
                        <h1 className="text-xl font-semibold text-white tracking-tighter">Revendaja</h1>
                    </div>

                    <div className="flex-1 flex flex-col justify-center">
                        <h2 className="text-4xl text-white mb-6 leading-tight tracking-tighter">
                            Gerencie sua perfumaria com elegância e eficiência.
                        </h2>
                        <p className="text-white/90 text-lg leading-relaxed">
                            Acesse o painel da Revendaja e tenha o controle de produtos, equipe e resultados — tudo em um só lugar.
                        </p>
                    </div>

                    <div className="flex justify-between items-center text-white/70 text-sm">
                        <span>© 2025 Revendaja. Todos os direitos reservados.</span>
                        <span className="cursor-pointer hover:text-white/90">Política de Privacidade</span>
                    </div>
                </div>
            </div>

            {/* Lado direito */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
                {children}
            </div>
        </div>
    );
}
