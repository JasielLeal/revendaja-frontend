'use client'

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { formatCurrency } from "@/lib/format-currency"
import { CatalogProduct } from "../hooks/use-catalog-products"


interface AddProductDialogProps {
    product: CatalogProduct
    onConfirm: (quantity: number, price: number) => Promise<void>
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    isLoading?: boolean
}

export function AddProductDialog({
    product,
    onConfirm,
    isOpen,
    onOpenChange,
    isLoading
}: AddProductDialogProps) {
    const [quantity, setQuantity] = useState("1")
    const [price, setPrice] = useState(String(product.price))

    const handleConfirm = async () => {
        const qtyNum = parseInt(quantity, 10)
        const priceNum = parseFloat(price)

        if (qtyNum > 0 && priceNum >= 0) {
            await onConfirm(qtyNum, priceNum)
            onOpenChange(false)
            // Reset form
            setQuantity("1")
            setPrice(String(product.price))
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Adicionar Produto ao Estoque</DialogTitle>
                    <DialogDescription>
                        {product.name} - {product.company}
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="quantity" className="text-right">
                            Quantidade
                        </Label>
                        <Input
                            id="quantity"
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className="col-span-3"
                            min="1"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="price" className="text-right">
                            Preço
                        </Label>
                        <div className="col-span-3 space-y-2">
                            <Input
                                id="price"
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                min="0"
                                step="0.01"
                            />
                            <p className="text-sm text-muted-foreground">
                                Preço sugerido: {formatCurrency(product.price)}
                            </p>
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancelar
                    </Button>
                    <Button onClick={handleConfirm} disabled={isLoading}>
                        {isLoading ? "Adicionando..." : "Confirmar"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}