"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";
import { useVerifyEmail } from "./hooks/use-verify-email";
import { toast } from "sonner";
import { AxiosError } from "axios";

export default function VerifyEmailPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const verifyEmailMutation = useVerifyEmail();

    const token = searchParams.get('token');
    const hasAttemptedRef = useRef(false);

    const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error'>(() => {
        return token ? 'loading' : 'error';
    });
    const [errorMessage, setErrorMessage] = useState<string>(() => {
        return token ? '' : 'Token de verificação não encontrado na URL.';
    });

    useEffect(() => {
        if (!token || hasAttemptedRef.current) {
            return;
        }

        hasAttemptedRef.current = true;

        const errorMap: Record<string, string> = {
            "Invalid token": "Link de verificação inválido ou expirado.",
            "Token expired": "Link de verificação expirado. Solicite um novo.",
            "User already verified": "Sua conta já foi verificada.",
            "User not found": "Usuário não encontrado.",
        };

        const verifyEmail = async () => {
            try {
                await verifyEmailMutation.mutateAsync({ token });
                setVerificationStatus('success');
                toast.success("E-mail verificado com sucesso!", {
                    description: "Sua conta foi ativada. Você já pode fazer login."
                });
            } catch (err) {
                if (err instanceof AxiosError && err.response?.status === 400) {
                    // Se for erro 400, trata como sucesso (email já verificado)
                    setVerificationStatus('success');
                    return;
                }

                // Para outros erros, trata como erro normal
                let friendlyMessage = "Erro ao verificar e-mail. Tente novamente.";

                if (err instanceof AxiosError) {
                    const errorResponse = err.response?.data?.error || "Unknown error";
                    friendlyMessage = errorMap[errorResponse] || "Erro ao verificar e-mail. Tente novamente.";
                }

                setErrorMessage(friendlyMessage);
                setVerificationStatus('error');

                toast.error("Erro na verificação", {
                    description: friendlyMessage
                });
            }
        };

        verifyEmail();
    }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleGoToLogin = () => {
        router.replace('/sign-in');
    };

    return (
        <div className="w-full max-w-md space-y-8 text-center">
            {verificationStatus === 'loading' && (
                <div className="space-y-4">
                    <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-gray-900">Verificando e-mail...</h2>
                        <p className="text-gray-600">
                            Aguarde enquanto confirmamos sua conta.
                        </p>
                    </div>
                </div>
            )}

            {verificationStatus === 'success' && (
                <div className="space-y-6">
                    <div className="space-y-4">
                        <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-8 h-8 text-green-600" />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold text-gray-900">E-mail verificado!</h2>
                            <p className="text-gray-600">
                                Sua conta foi ativada com sucesso. Agora você pode fazer login.
                            </p>
                        </div>
                    </div>

                    <Button
                        className="w-full"
                        onClick={handleGoToLogin}
                    >
                        Ir para o login
                    </Button>
                </div>
            )}

            {verificationStatus === 'error' && (
                <div className="space-y-6">
                    <div className="space-y-4">
                        <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                            <AlertCircle className="w-8 h-8 text-red-600" />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold text-gray-900">Erro na verificação</h2>
                            <p className="text-gray-600">
                                {errorMessage}
                            </p>
                            {!token && (
                                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                                    <p className="text-sm text-yellow-800">
                                        <strong>Dica:</strong> Certifique-se de que está acessando via HTTP e não HTTPS:
                                        <br />
                                        <code className="text-xs bg-yellow-100 px-1 py-0.5 rounded">
                                            http://localhost:3000/verify-email?token=...
                                        </code>
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={handleGoToLogin}
                        >
                            Ir para o login
                        </Button>
                        <div className="text-center">
                            <p className="text-sm text-gray-600">
                                Precisa de ajuda?{" "}
                                <Link href="/sign-up" className="font-medium text-primary hover:text-primary/80">
                                    Criar nova conta
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}