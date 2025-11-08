"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Store, ArrowRight, CheckCircle2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useCreateStore } from "@/hooks/use-create-store";

const storeSchema = z.object({
    name: z.string().min(2, "Nome da loja deve ter pelo menos 2 caracteres"),
    address: z.string().min(5, "Endereço deve ter pelo menos 5 caracteres"),
    phone: z.string()
        .min(10, "Telefone deve ter pelo menos 10 caracteres")
        .regex(/^[\d\s\(\)\-\+]+$/, "Telefone deve conter apenas números e caracteres válidos"),
});

type StoreFormData = z.infer<typeof storeSchema>;

export default function CreateStorePage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const [showPaymentSuccess] = useState(!!sessionId);
    const createStoreMutation = useCreateStore();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<StoreFormData>({
        resolver: zodResolver(storeSchema),
        defaultValues: {
            name: "",
            address: "",
            phone: ""
        }
    });

    // Verificar se veio do Stripe com sucesso
    useEffect(() => {
        if (sessionId && showPaymentSuccess) {
            toast.success("Pagamento realizado com sucesso!", {
                description: "Agora você pode criar sua loja"
            });
        }
    }, [sessionId, showPaymentSuccess]);

    const onSubmit = async (data: StoreFormData) => {
        try {
            await createStoreMutation.mutateAsync(data);

            toast.success("Loja criada com sucesso!", {
                description: "Você será redirecionado para o dashboard"
            });

            // Redirecionar para o dashboard
            router.push('/dashboard');
        } catch {
            toast.error("Erro ao criar loja", {
                description: "Verifique os dados e tente novamente"
            });
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="w-full max-w-md space-y-8">
                {/* Banner de sucesso do pagamento */}
                {showPaymentSuccess && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center gap-3">
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                            <div>
                                <h3 className="text-sm font-medium text-green-800">
                                    Pagamento confirmado!
                                </h3>
                                <p className="text-sm text-green-700">
                                    Sua assinatura foi ativada. Agora crie sua loja.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                        <Store className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Crie sua loja
                    </h1>
                    <p className="text-muted-foreground">
                        Configure os detalhes da sua loja online
                    </p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Informações da Loja</CardTitle>
                        <CardDescription>
                            Preencha os dados da sua loja
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nome da Loja</Label>
                                <Input
                                    id="name"
                                    placeholder="Minha Perfumaria"
                                    {...register("name")}
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm">{errors.name.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="address">Endereço</Label>
                                <Input
                                    id="address"
                                    placeholder="Rua das Flores, 123 - Centro"
                                    {...register("address")}
                                />
                                {errors.address && (
                                    <p className="text-red-500 text-sm">{errors.address.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">Telefone</Label>
                                <Input
                                    id="phone"
                                    placeholder="(11) 99999-9999"
                                    {...register("phone")}
                                />
                                {errors.phone && (
                                    <p className="text-red-500 text-sm">{errors.phone.message}</p>
                                )}
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={createStoreMutation.isPending}
                            >
                                {createStoreMutation.isPending ? (
                                    "Criando loja..."
                                ) : (
                                    <>
                                        Criar Loja
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                        Após criar sua loja, você poderá personalizá-la completamente
                    </p>
                </div>
            </div>
        </div>
    );
}