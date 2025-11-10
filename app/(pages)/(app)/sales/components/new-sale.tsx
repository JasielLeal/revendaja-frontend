"use client"

import { useEffect, useRef, useState } from "react"
import { Controller, useForm, Resolver } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import {
    Plus,
    X,
    Search,
    ShoppingCart,
    User,
    Phone,
    CreditCard,
    DollarSign,
} from "lucide-react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { formatCurrency } from "@/lib/format-currency"
import { useInfiniteStoreProducts } from "@/app/(pages)/(app)/sales/hooks/use-store-products"
import { CreateOrderBody, useCreateOrder } from "../hooks/use-create-order"
import { InvalidateQueryFilters, useQueryClient } from "@tanstack/react-query"

// ✅ Schema de validação
const formSchema = z.object({
    customerName: z.string().min(1, "Informe o nome do cliente"),
    customerPhone: z.string().optional(),
    paymentMethod: z.enum(["pix", "credito", "debito", "dinheiro"]).optional(),
    status: z.enum(["approved", "pending", "canceled"]).default("pending"),
    items: z
        .array(
            z.object({
                storeProductId: z.string().min(1, "Selecione o produto"),
                quantity: z.number().min(1, "Quantidade mínima é 1"),
            })
        )
        .min(1, "Adicione ao menos um item"),
})

type FormData = z.infer<typeof formSchema>

export function NewSale() {
    const [open, setOpen] = useState(false)
    const [items, setItems] = useState<{ storeProductId: string; quantity: number }[]>([])
    const [searchTerm, setSearchTerm] = useState("")

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema) as unknown as Resolver<FormData>,
        defaultValues: {
            customerName: "",
            customerPhone: "",
            status: "approved" as const,
            paymentMethod: "pix",
            items: [],
        },
    })

    function useDebounce<T>(value: T, delay = 500): T {
        const [debounced, setDebounced] = useState(value)

        useEffect(() => {
            const handler = setTimeout(() => setDebounced(value), delay)
            return () => clearTimeout(handler)
        }, [value, delay])

        return debounced
    }

    const debouncedSearch = useDebounce(searchTerm, 600)

    // ✅ Infinite Query Hook (busca de produtos)
    const {
        data,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteStoreProducts(debouncedSearch, 9)

    const products = data?.pages.flatMap((page) => page.data) ?? []

    // ✅ Ref para "sentinela" que carrega mais produtos
    const loadMoreRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (!hasNextPage || !loadMoreRef.current) return
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    fetchNextPage()
                }
            },
            { threshold: 1 }
        )
        observer.observe(loadMoreRef.current)
        return () => observer.disconnect()
    }, [hasNextPage, fetchNextPage])

    // Funções de manipulação de itens
    function handleAddItem(productId: string) {
        const product = getProductById(productId);

        // Verificar se o produto existe
        if (!product) {
            toast.error("Produto não encontrado");
            return;
        }

        // Verificar se há estoque disponível
        if (product.quantity <= 0) {
            toast.error("Este produto está sem estoque!");
            return;
        }

        const existing = items.find((i) => i.storeProductId === productId);

        if (existing) {
            // Verificar se a quantidade atual + 1 não excede o estoque
            if (existing.quantity >= product.quantity) {
                toast.error(`Estoque insuficiente! Disponível: ${product.quantity} unidades`);
                return;
            }

            const updated = items.map((i) =>
                i.storeProductId === productId ? { ...i, quantity: i.quantity + 1 } : i
            );
            setItems(updated);
            form.setValue("items", updated);
            toast.success(`${product.name} adicionado ao carrinho`);
        } else {
            const updated = [...items, { storeProductId: productId, quantity: 1 }];
            setItems(updated);
            form.setValue("items", updated);
            toast.success(`${product.name} adicionado ao carrinho`);
        }
    }

    function handleUpdateItemQuantity(productId: string, newQuantity: number) {
        const product = getProductById(productId);

        if (!product) {
            toast.error("Produto não encontrado");
            return;
        }

        if (newQuantity <= 0) {
            // Remove o item se a quantidade for 0 ou negativa
            const updated = items.filter((item) => item.storeProductId !== productId);
            setItems(updated);
            form.setValue("items", updated);
            return;
        }

        if (newQuantity > product.quantity) {
            toast.error(`Estoque insuficiente! Disponível: ${product.quantity} unidades`);
            return;
        }

        const updated = items.map((item) =>
            item.storeProductId === productId
                ? { ...item, quantity: newQuantity }
                : item
        );
        setItems(updated);
        form.setValue("items", updated);
    }

    function handleRemoveItem(index: number) {
        const updated = items.filter((_, i) => i !== index)
        setItems(updated)
        form.setValue("items", updated)
    }

    const getProductById = (id: string) => products.find((p) => p.id === id)

    const total = items.reduce((sum, item) => {
        const product = getProductById(item.storeProductId)
        return sum + (product ? product.price * item.quantity : 0)
    }, 0)

    const { mutate: createOrder, isPending } = useCreateOrder()

    const queryClient = useQueryClient();

    function handleSubmit(data: FormData) {
        // Validação final de estoque antes de submeter
        const invalidItems = items.filter(item => {
            const product = getProductById(item.storeProductId);
            return !product || product.quantity < item.quantity;
        });

        if (invalidItems.length > 0) {
            toast.error("Alguns itens não têm estoque suficiente. Verifique as quantidades.");
            return;
        }

        const payload: CreateOrderBody = {
            customerName: data.customerName,
            customerPhone: data.customerPhone || "",
            status: data.status,
            paymentMethod: data.paymentMethod || "pix",
            items,
        }

        createOrder(payload, {
            onSuccess: () => {
                toast.success("Venda criada com sucesso!")
                form.reset()
                queryClient.invalidateQueries(["show-orders-metrics"] as InvalidateQueryFilters);
                queryClient.invalidateQueries(["show-orders"] as InvalidateQueryFilters);
                setItems([])
                setOpen(false)
            },
            onError: (error) => {
                toast.error(error.message || "Erro ao criar venda.")
            },
        })
    }

    function onSubmit(data: FormData) {
        handleSubmit(data)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Nova venda
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-[95vw]! w-full h-[90vh] p-0 overflow-hidden flex flex-col">
                <DialogHeader className="p-6 border-b">
                    <DialogTitle className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <ShoppingCart className="w-5 h-5" />
                            Nova Venda
                        </div>
                    </DialogTitle>
                </DialogHeader>

                <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 h-full overflow-hidden">
                    {/* 🛍️ Catálogo de Produtos */}
                    <div className="lg:col-span-2 flex flex-col p-6 border-r overflow-y-auto">
                        <div className="mb-6 flex items-center gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                <Input
                                    placeholder="Busque usando o nome ou marca..."
                                    className="pl-10 w-full"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                            {isLoading ? (
                                <p className="text-center text-muted-foreground">Carregando produtos...</p>
                            ) : isError ? (
                                <p className="text-center text-destructive">Erro ao carregar produtos</p>
                            ) : products.length === 0 ? (
                                <p className="text-center text-muted-foreground">Nenhum produto encontrado</p>
                            ) : (
                                <>
                                    {products.map((product) => (
                                        <Card
                                            key={product.id}
                                            className={`cursor-pointer transition-all hover:shadow-md ${product.quantity <= 0
                                                ? 'opacity-60 cursor-not-allowed border-destructive/20 bg-muted/50'
                                                : 'hover:border-primary/20'
                                                }`}
                                            onClick={() => {
                                                if (product.quantity > 0) {
                                                    handleAddItem(product.id);
                                                }
                                            }}
                                        >
                                            <CardContent className="p-4 relative">
                                                {/* Badge de sem estoque */}
                                                {product.quantity <= 0 && (
                                                    <div className="absolute top-2 right-2 bg-destructive text-destructive-foreground px-2 py-1 rounded-md text-xs font-medium z-10">
                                                        Sem estoque
                                                    </div>
                                                )}

                                                <div className="flex justify-center mb-3">
                                                    <Image
                                                        src={product.imgUrl}
                                                        width={120}
                                                        height={120}
                                                        alt={product.name}
                                                        className={`rounded-lg object-cover ${product.quantity <= 0 ? 'grayscale' : ''
                                                            }`}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <p className="text-xs text-muted-foreground font-medium">
                                                        {product.company}
                                                    </p>
                                                    <p className="font-semibold text-sm line-clamp-2">{product.name}</p>
                                                    <div className="flex items-center gap-1">
                                                        <p className="text-xs text-muted-foreground font-medium">Estoque:</p>
                                                        <p
                                                            className={
                                                                product.quantity <= 0
                                                                    ? "text-red-600 text-xs font-bold"
                                                                    : product.quantity <= 3
                                                                        ? "text-orange-500 text-xs font-medium"
                                                                        : "text-green-500 text-xs"
                                                            }
                                                        >
                                                            {product.quantity <= 0 ? 'Esgotado' : product.quantity}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <p className="text-lg font-bold text-primary">
                                                            {formatCurrency(product.price)}
                                                        </p>
                                                        <Button
                                                            size="sm"
                                                            variant={product.quantity <= 0 ? "secondary" : "secondary"}
                                                            disabled={product.quantity <= 0}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                if (product.quantity > 0) {
                                                                    handleAddItem(product.id);
                                                                }
                                                            }}
                                                            className={product.quantity <= 0 ? "opacity-50" : ""}
                                                        >
                                                            <Plus className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}


                                </>
                            )}
                        </div>

                        {hasNextPage && (
                            <div ref={loadMoreRef} className=" flex justify-center items-center">
                                {isFetchingNextPage ? (
                                    <Button className="text-sm text-muted-foreground">Carregando mais...</Button>
                                ) : (
                                    <div className="flex items-center justify-center my-5 w-full">
                                        <Button
                                            onClick={() => fetchNextPage()}

                                        >
                                            Carregar mais produtos
                                        </Button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>



                    {/* 💳 Resumo da Venda */}
                    <div className="flex flex-col p-6 overflow-y-auto">
                        <div className="space-y-4 mb-6">
                            <h3 className="font-semibold text-lg">Informações do Cliente</h3>
                            <div className="space-y-3">
                                <div className="space-y-2">
                                    <Label htmlFor="customerName" className="flex items-center gap-2">
                                        <User className="w-4 h-4" />
                                        Nome do Cliente *
                                    </Label>
                                    <Input
                                        id="customerName"
                                        placeholder="Digite o nome do cliente"
                                        {...form.register("customerName")}
                                    />
                                    {form.formState.errors.customerName && (
                                        <p className="text-sm text-destructive">
                                            {form.formState.errors.customerName.message}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="customerPhone" className="flex items-center gap-2">
                                        <Phone className="w-4 h-4" />
                                        Telefone
                                    </Label>
                                    <Input
                                        id="customerPhone"
                                        placeholder="(00) 00000-0000"
                                        {...form.register("customerPhone")}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    {/* Método de Pagamento */}
                                    <div className="space-y-2">
                                        <Label htmlFor="paymentMethod" className="flex items-center gap-2">
                                            <DollarSign className="w-4 h-4" />
                                            Método de Pagamento
                                        </Label>
                                        <Controller
                                            name="paymentMethod"
                                            control={form.control}
                                            render={({ field }) => (
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <SelectTrigger id="paymentMethod">
                                                        <SelectValue placeholder="Selecione o método" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="pix">💸 Pix</SelectItem>
                                                        <SelectItem value="credito">💳 Cartão de Crédito</SelectItem>
                                                        <SelectItem value="debito">🏦 Cartão de Débito</SelectItem>
                                                        <SelectItem value="dinheiro">💰 Dinheiro</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />
                                    </div>

                                    {/* Status do Pagamento */}
                                    <div className="space-y-2">
                                        <Label htmlFor="status" className="flex items-center gap-2">
                                            <CreditCard className="w-4 h-4" />
                                            Status do Pagamento
                                        </Label>
                                        <Controller
                                            name="status"
                                            control={form.control}
                                            render={({ field }) => (
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <SelectTrigger id="status">
                                                        <SelectValue placeholder="Selecione o status" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="approved">✅ Aprovado</SelectItem>
                                                        <SelectItem value="pending">🕒 Pendente</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Itens da Venda */}
                        <div className="flex-1 overflow-hidden flex flex-col">
                            <h3 className="font-semibold text-lg mb-4">Itens da Venda</h3>

                            {items.length === 0 ? (
                                <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
                                    <ShoppingCart className="w-12 h-12 mb-4 opacity-50" />
                                    <p className="text-center">Nenhum item adicionado</p>
                                    <p className="text-sm text-center">Clique em um produto para adicionar</p>
                                </div>
                            ) : (
                                <>
                                    <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                                        {items.map((item, index) => {
                                            const product = getProductById(item.storeProductId)
                                            if (!product) return null

                                            return (
                                                <div
                                                    key={index}
                                                    className="flex items-center gap-3 p-3 bg-background rounded-lg border"
                                                >
                                                    <Image
                                                        src={product.imgUrl}
                                                        width={50}
                                                        height={50}
                                                        alt={product.name}
                                                        className="rounded-md"
                                                    />
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-medium text-sm truncate">
                                                            {product.name}
                                                        </p>
                                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                            <span>{formatCurrency(product.price)}</span>
                                                            <span>×</span>
                                                            <div className="flex items-center gap-1">
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    className="h-6 w-6 p-0"
                                                                    onClick={() => handleUpdateItemQuantity(item.storeProductId, item.quantity - 1)}
                                                                >
                                                                    -
                                                                </Button>
                                                                <span className="w-8 text-center">{item.quantity}</span>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    className="h-6 w-6 p-0"
                                                                    onClick={() => handleUpdateItemQuantity(item.storeProductId, item.quantity + 1)}
                                                                >
                                                                    +
                                                                </Button>
                                                            </div>
                                                        </div>
                                                        <div className="text-xs text-muted-foreground">
                                                            Estoque disponível: {product.quantity}
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-semibold">
                                                            {formatCurrency(product.price * item.quantity)}
                                                        </p>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                                                            onClick={() => handleRemoveItem(index)}
                                                        >
                                                            <X className="w-3 h-3" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>

                                    <div className="border-t pt-4 mt-4 space-y-3">
                                        <div className="flex justify-between items-center text-lg font-semibold">
                                            <span>Total:</span>
                                            <span className="text-primary">{formatCurrency(total)}</span>
                                        </div>

                                        <Button
                                            className="w-full"
                                            size="lg"
                                            onClick={form.handleSubmit(onSubmit)}
                                            disabled={isPending || items.length === 0}
                                        >
                                            {isPending
                                                ? "Processando..."
                                                : `Finalizar Venda - ${formatCurrency(total)}`}
                                        </Button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

            </DialogContent>
        </Dialog>
    )
}
