"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserInfo } from "@/app/hooks/use-user-info";
import { Loader2 } from "lucide-react";

interface AuthGuardProps {
    children: React.ReactNode;
    requireStore?: boolean; // Se true, verifica se tem loja
}

export function AuthGuard({ children, requireStore = true }: AuthGuardProps) {
    const router = useRouter();
    const { data: userInfo, isLoading, error } = useUserInfo();

    useEffect(() => {
        if (isLoading) return;

        // Se não conseguiu buscar dados do usuário, redireciona para login
        if (error || !userInfo) {
            router.replace("/sign-in");
            return;
        }

        // Se o plano é free, redireciona para assinatura
        if (userInfo.plan === "Free") {
            router.replace("/subscription");
            return;
        }

        // Se requireStore é true e precisamos verificar se tem loja
        if (requireStore) {
            // Por enquanto, sempre redireciona para criar loja se não for free
            // TODO: Aqui você pode adicionar uma verificação de loja real
            router.replace("/create-store");
        }
    }, [userInfo, isLoading, error, router, requireStore]);

    // Mostra loading enquanto verifica
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center space-y-4">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
                    <p className="text-muted-foreground">Verificando informações...</p>
                </div>
            </div>
        );
    }

    // Não renderiza nada se ainda está redirecionando
    if (!userInfo || userInfo.plan === "free") {
        return null;
    }

    return <>{children}</>;
}