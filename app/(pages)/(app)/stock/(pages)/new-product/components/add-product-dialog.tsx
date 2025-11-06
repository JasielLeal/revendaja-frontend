"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CatalogProduct } from "../../../hooks/use-catalog-products"
import { formatCurrency } from "@/lib/format-currency"
import { toast } from "sonner"

interface AddProductDialogProps {
    product: CatalogProduct | null
    onClose: () => void
    onConfirm: (quantity: number, price: number) => Promise<void>
}

export function AddProductDialog({ product, onClose, onConfirm }: AddProductDialogProps) {
    const [quantity, setQuantity] = useState(1)
    const [price, setPrice] = useState(product?.price ?? 0)
    const [priceInput, setPriceInput] = useState("")
    const [isAdding, setIsAdding] = useState(false)

    // Formata o valor para exibição
    const formatPriceDisplay = (valueInCents: number) => {
        return (valueInCents / 100).toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })
    }

    // Reset values when product changes
    useEffect(() => {
        if (product) {
            setQuantity(1)
            setPrice(product.price)
            setPriceInput(formatPriceDisplay(product.price))
        }
    }, [product])

    const handleSubmit = async () => {
        if (!product) return

        try {
            setIsAdding(true)
            await onConfirm(quantity, price)
            toast.success('Produto adicionado!', {
                description: `${product.name} foi adicionado ao estoque com sucesso.`
            })
        } catch (error) {
            console.log(error)
            toast.error('Erro ao adicionar produto', {
                description: error instanceof Error && 'response' in error && typeof (error as { response?: { data?: { error?: string } } }).response?.data?.error === 'string'
                    ? (error as { response: { data: { error: string } } }).response.data.error
                    : 'Tente novamente mais tarde.'
            })
        } finally {
            setIsAdding(false)
        }
    }

    return (
        <Dialog open={!!product} onOpenChange={open => !open && onClose()}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle className="text-2xl">Adicionar ao Estoque</DialogTitle>
                    <DialogDescription>
                        Configure a quantidade e o preço de venda para este produto
                    </DialogDescription>
                </DialogHeader>

                {product && (
                    <div className="space-y-6 py-4">
                        {/* Product Info */}
                        <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                            <div className="flex-1 space-y-1">
                                <h3 className="font-semibold leading-tight">{product.name}</h3>
                                <p className="text-sm text-muted-foreground">{product.company}</p>
                                <div className="flex items-baseline gap-2 mt-2">
                                    <span className="text-xs text-muted-foreground">Preço catálogo:</span>
                                    <span className="font-semibold text-primary">{formatCurrency(product.price)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Inputs */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="quantity" className="text-sm font-medium">
                                    Quantidade
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="quantity"
                                        type="number"
                                        min={1}
                                        value={quantity}
                                        onChange={e => setQuantity(Math.max(1, Number(e.target.value)))}
                                        className="pr-12"
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                                        un.
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="price" className="text-sm font-medium">
                                    Preço de Venda
                                </Label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                                        R$
                                    </span>
                                    <Input
                                        id="price"
                                        type="text"
                                        inputMode="decimal"
                                        value={priceInput}
                                        onChange={e => {
                                            const value = e.target.value

                                            // Remove tudo que não é número
                                            const numbersOnly = value.replace(/\D/g, '')

                                            if (numbersOnly === '') {
                                                setPriceInput('')
                                                setPrice(0)
                                                return
                                            }

                                            // Converte para número (em centavos)
                                            const numValue = parseInt(numbersOnly)
                                            setPrice(numValue)

                                            // Formata para exibição
                                            setPriceInput(formatPriceDisplay(numValue))
                                        }}
                                        placeholder="0,00"
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Summary */}
                        <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg border border-primary/10">
                            <span className="text-sm font-medium">Total:</span>
                            <span className="text-xl font-bold text-primary">
                                {formatCurrency(price * quantity)}
                            </span>
                        </div>
                    </div>
                )}

                <DialogFooter className="gap-2">
                    <Button variant="outline" onClick={onClose} disabled={isAdding}>
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={!product || isAdding || quantity < 1 || price <= 0}
                        className="min-w-[120px]"
                    >
                        {isAdding ? (
                            <span className="flex items-center gap-2">
                                <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                Adicionando...
                            </span>
                        ) : (
                            'Adicionar'
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}