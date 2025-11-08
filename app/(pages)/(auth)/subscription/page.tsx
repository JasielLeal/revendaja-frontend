"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, CreditCard, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useCreateCheckoutSession } from "@/app/hooks/use-stripe-checkout";
import { useUserInfo } from "@/app/hooks/use-user-info";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function SubscriptionPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [showCancelMessage, setShowCancelMessage] = useState(false);
    const createCheckoutSession = useCreateCheckoutSession();
    const { data: userInfo } = useUserInfo();
    const searchParams = useSearchParams();

    // Verificar se foi cancelado
    useEffect(() => {
        const canceled = searchParams.get('canceled');
        if (canceled === 'true') {
            setShowCancelMessage(true);
            toast.error("Pagamento cancelado", {
                description: "Você pode tentar novamente quando quiser"
            });
        }
    }, [searchParams]);

    const handleUpgrade = async () => {
        if (!userInfo?.id) {
            toast.error("Erro", {
                description: "Informações do usuário não encontradas. Tente fazer login novamente."
            });
            return;
        }

        setIsLoading(true);

        try {
            const { url } = await createCheckoutSession.mutateAsync({
                userId: userInfo.id,
                userEmail: userInfo.email,
                userName: userInfo.name
            });

            // Redirecionar para o Stripe Checkout
            window.location.href = url;
        } catch (error) {
            toast.error("Erro ao processar pagamento", {
                description: error instanceof Error ? error.message : "Tente novamente em alguns instantes"
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="w-full max-w-2xl space-y-8">
                {/* Banner de cancelamento */}
                {showCancelMessage && (
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                        <div className="flex items-center gap-3">
                            <AlertCircle className="w-5 h-5 text-orange-600" />
                            <div>
                                <h3 className="text-sm font-medium text-orange-800">
                                    Pagamento cancelado
                                </h3>
                                <p className="text-sm text-orange-700">
                                    Nenhuma cobrança foi realizada. Você pode tentar novamente.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight">
                        Assine o Plano Starter
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        Para continuar, você precisa assinar nosso plano e criar sua loja
                    </p>
                </div>

                <div className="flex justify-center">
                    {/* Plano Starter - Único plano disponível */}
                    <Card className="border-primary shadow-lg max-w-md w-full">
                        <CardHeader>
                            <div className="text-center">
                                <div className="inline-block px-3 py-1 bg-primary text-primary-foreground text-sm rounded-full mb-2">
                                    Plano Único
                                </div>
                            </div>
                            <CardTitle className="text-center">Plano Starter</CardTitle>
                            <CardDescription className="text-center">
                                Tudo que você precisa para sua loja online
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="text-center">
                                <span className="text-3xl font-bold">R$ 24,99</span>
                                <span className="text-muted-foreground">/mês</span>
                            </div>
                            <ul className="space-y-2">
                                <li className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-green-500" />
                                    <span className="text-sm">Loja personalizada</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-green-500" />
                                    <span className="text-sm">Subdomain exclusivo</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-green-500" />
                                    <span className="text-sm">Gestão completa de estoque</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-green-500" />
                                    <span className="text-sm">Dashboard avançado</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-green-500" />
                                    <span className="text-sm">Suporte completo</span>
                                </li>
                            </ul>
                            <Button
                                onClick={handleUpgrade}
                                className="w-full"
                                disabled={isLoading || createCheckoutSession.isPending}
                            >
                                {isLoading || createCheckoutSession.isPending ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Processando...
                                    </>
                                ) : (
                                    <>
                                        <CreditCard className="w-4 h-4 mr-2" />
                                        Assinar por R$ 24,99/mês
                                    </>
                                )}
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                <div className="text-center space-y-4">
                    <p className="text-sm text-muted-foreground">
                        Pagamento seguro processado pelo Stripe
                    </p>
                    <p className="text-xs text-muted-foreground">
                        Já tem uma assinatura ativa?{" "}
                        <Link href="/sign-in" className="text-primary hover:underline">
                            Fazer login novamente
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}