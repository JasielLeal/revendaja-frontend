"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserInfo } from "@/app/hooks/use-user-info";
import { useUserStore } from "@/hooks/use-user-store";
import { Loader2 } from "lucide-react";

interface AuthGuardProps {
    children: React.ReactNode;
    requireStore?: boolean; // Se true, verifica se tem loja
}

export function AuthGuard({ children, requireStore = true }: AuthGuardProps) {
    const router = useRouter();
    const { data: userInfo, isLoading: isLoadingUser, error: userError } = useUserInfo();
    const { data: userStore, isLoading: isLoadingStore, error: storeError } = useUserStore();

    useEffect(() => {
        // Aguarda carregar as informações do usuário
        if (isLoadingUser) return;

        // Se não conseguiu buscar dados do usuário, redireciona para login
        if (userError || !userInfo) {
            router.replace("/sign-in");
            return;
        }

        // Se o plano é free, redireciona para assinatura
        if (userInfo.plan === "free") {
            router.replace("/subscription");
            return;
        }

        // Se requireStore é true, verifica se precisa carregar dados da loja
        if (requireStore) {
            // Aguarda carregar dados da loja
            if (isLoadingStore) return;

            // Se houve erro ao carregar loja (exceto 404), tenta novamente
            if (storeError && storeError instanceof Error) {
                console.error("Erro ao carregar loja:", storeError);
                // Para outros erros que não sejam 404, você pode escolher o comportamento
                // Por enquanto, vamos continuar para criar loja
            }

            // Se não tem loja (userStore é null), redireciona para criar
            if (userStore === null) {
                router.replace("/create-store");
                return;
            }

            // Se chegou até aqui, tem loja e pode prosseguir
        }
    }, [
        userInfo,
        isLoadingUser,
        userError,
        userStore,
        isLoadingStore,
        storeError,
        router,
        requireStore
    ]);

    // Mostra loading enquanto verifica usuário ou loja (quando necessário)
    if (isLoadingUser || (requireStore && isLoadingStore)) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center space-y-4">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
                    <p className="text-muted-foreground">
                        {isLoadingUser ? "Verificando informações..." : "Carregando loja..."}
                    </p>
                </div>
            </div>
        );
    }

    // Não renderiza nada se ainda está redirecionando
    if (!userInfo || userInfo.plan === "free" || (requireStore && userStore === null)) {
        return null;
    }

    return <>{children}</>;
}