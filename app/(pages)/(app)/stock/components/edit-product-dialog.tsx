'use client'

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/format-currency"
import type { StoreProduct } from "../../sales/hooks/use-store-products"
import Image from "next/image"

interface EditProductDialogProps {
    product: StoreProduct | null
    open: boolean
    onOpenChange: (open: boolean) => void
    onSave: (productId: string, updates: {
        price: number
        quantity: number
        status: string
    }) => void
}

export function EditProductDialog({ product, open, onOpenChange, onSave }: EditProductDialogProps) {
    const [price, setPrice] = useState(() => product ? String(product.price) : '')
    const [quantity, setQuantity] = useState(() => product ? String(product.quantity) : '')
    const [status, setStatus] = useState(() => product?.status || '')

    const handleOpenChange = (newOpen: boolean) => {
        if (newOpen && product) {
            // Reset form when opening dialog
            setPrice(String(product.price))
            setQuantity(String(product.quantity))
            setStatus(product.status)
        }
        onOpenChange(newOpen)
    }

    // Handle status change to keep current values when changing to Inactive
    const handleStatusChange = (newStatus: string) => {
        setStatus(newStatus)

        if (newStatus === "Inactive" && product) {
            // When changing to Inactive, keep current values if fields are empty or unchanged
            if (price === '' || price === String(product.price)) {
                setPrice(String(product.price))
            }
            if (quantity === '' || quantity === String(product.quantity)) {
                setQuantity(String(product.quantity))
            }
        }
    }

    const handleSave = () => {
        if (!product) return

        // Sempre enviar todos os valores - ou os alterados ou os originais
        const updates = {
            price: price !== String(product.price) && price !== ''
                ? parseFloat(price) || product.price
                : product.price,
            quantity: quantity !== String(product.quantity) && quantity !== ''
                ? parseInt(quantity) || product.quantity
                : product.quantity,
            status: status !== product.status && status !== ''
                ? status
                : product.status
        }

        onSave(product.id, updates)
        onOpenChange(false)
    }

    if (!product) return null

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Editar produto</DialogTitle>
                    <DialogDescription>
                        Atualize as informações do produto no seu estoque
                    </DialogDescription>
                </DialogHeader>

                {/* Product info */}
                <div className="flex gap-4 p-4 bg-muted/50 rounded-lg">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md">
                        <Image
                            src={product.imgUrl}
                            alt={product.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate">{product.name}</h4>
                        <p className="text-sm text-muted-foreground">{product.company}</p>
                        <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                                {product.category}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                                Catálogo: {formatCurrency(product.catalogPrice)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Edit form */}
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="price">Preço de venda</Label>
                            <Input
                                id="price"
                                type="number"
                                step="0.01"
                                min="0"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="0,00"
                                className={status === "Inactive" && price === String(product.price) ?
                                    "border-amber-200 bg-amber-50" : ""
                                }
                            />
                            <p className="text-xs text-muted-foreground">
                                Preço atual: {formatCurrency(product.price)}
                                {status === "Inactive" && price === String(product.price) && (
                                    <span className="block text-amber-600">
                                        ✓ Mantendo valor atual
                                    </span>
                                )}
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="quantity">Quantidade</Label>
                            <Input
                                id="quantity"
                                type="number"
                                min="0"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                placeholder="0"
                                className={status === "Inactive" && quantity === String(product.quantity) ?
                                    "border-amber-200 bg-amber-50" : ""
                                }
                            />
                            <p className="text-xs text-muted-foreground">
                                Quantidade atual: {product.quantity}
                                {status === "Inactive" && quantity === String(product.quantity) && (
                                    <span className="block text-amber-600">
                                        ✓ Mantendo valor atual
                                    </span>
                                )}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Status do produto</Label>
                        <Select value={status} onValueChange={handleStatusChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione o status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Active">Ativo</SelectItem>
                                <SelectItem value="Inactive">Inativo</SelectItem>
                            </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">
                            Status atual: {product.status === "Active" ? "Ativo" : "Inativo"}
                            {status === "Inactive" && status !== product.status && (
                                <span className="block text-amber-600 font-medium">
                                    💡 Ao tornar inativo, os valores atuais serão mantidos
                                </span>
                            )}
                        </p>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancelar
                    </Button>
                    <Button onClick={handleSave}>
                        Salvar alterações
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}