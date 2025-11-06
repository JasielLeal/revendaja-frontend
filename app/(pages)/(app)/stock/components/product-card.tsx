'use client'

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { formatCurrency } from "@/lib/format-currency"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import Image from "next/image"
import type { StoreProduct } from "../../sales/hooks/use-store-products"

export function ProductCard({ product }: { product: StoreProduct }) {
    return (
        <Card className="group overflow-hidden">
            <div className="relative aspect-square">
                <div className="absolute right-2 top-2 z-10">
                    <Badge variant={product.quantity > 0 ? "default" : "destructive"}>
                        {product.quantity} em estoque
                    </Badge>
                </div>
                <Image
                    src={product.imgUrl}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, 50vw"
                />
            </div>
            <div className="flex h-[260px] flex-col p-4">
                <div className="min-h-20 space-y-1">
                    <h3 className="line-clamp-2 font-medium leading-tight">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">{product.company}</p>
                </div>
                <div className="mt-auto space-y-4">
                    <div className="space-y-1">
                        <div className="font-medium">{formatCurrency(product.price)}</div>
                        <div className="text-sm text-muted-foreground">
                            Catálogo: {formatCurrency(product.catalogPrice)}
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <Badge variant="outline" className="pointer-events-none truncate max-w-[120px]">
                            {product.category}
                        </Badge>
                        <Badge
                            variant={product.status === "Active" ? "default" : "secondary"}
                            className="pointer-events-none shrink-0"
                        >
                            {product.status === "Active" ? "Ativo" : "Inativo"}
                        </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                        Atualizado em {format(new Date(product.updatedAt), "dd 'de' MMMM", { locale: ptBR })}
                    </div>
                </div>
            </div>
        </Card>
    )
}