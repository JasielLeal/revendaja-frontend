"use client"

import { useCatalogProducts, CatalogProduct } from "../../hooks/use-catalog-products"
import { useAddCatalogProductToStore } from "../../hooks/use-add-catalog-product"
import { useEffect, useRef, useState } from "react"
import { useIntersection } from "@mantine/hooks"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { AddProductDialog } from "./components/add-product-dialog"
import { formatCurrency } from "@/lib/format-currency"
import { useDebounce } from "@/app/hooks/use-debounce"

export default function NewProduct() {
    const [query, setQuery] = useState("")
    const [selectedProduct, setSelectedProduct] = useState<CatalogProduct | null>(null)
    const debouncedQuery = useDebounce(query, 500)

    const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } = useCatalogProducts(debouncedQuery, 12)
    const { mutateAsync: addCatalogAsync, isPending: isAdding } = useAddCatalogProductToStore()

    const products = data?.pages?.flatMap(p => p.data) ?? []

    const lastRef = useRef<HTMLDivElement | null>(null)
    const { ref, entry } = useIntersection({ root: null, threshold: 0.5, rootMargin: '200px' })

    useEffect(() => {
        if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) fetchNextPage()
    }, [entry?.isIntersecting, fetchNextPage, hasNextPage, isFetchingNextPage])

    return (
        <div className="container mx-auto p-6 max-w-7xl space-y-8">
            {/* Header */}
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Catálogo de Produtos</h1>
                <p className="text-muted-foreground">Selecione produtos do catálogo para adicionar ao seu estoque</p>
            </div>

            {/* Search Bar */}
            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-md">
                    <Input
                        placeholder="Buscar produtos..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="pl-10"
                    />
                    <svg
                        className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                {products.length > 0 && (
                    <span className="text-sm text-muted-foreground">
                        {products.length} produto{products.length !== 1 ? 's' : ''} encontrado{products.length !== 1 ? 's' : ''}
                    </span>
                )}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {isLoading && (
                    Array.from({ length: 8 }).map((_, i) => (
                        <Card key={i} className="overflow-hidden">
                            <div className="aspect-square bg-muted animate-pulse" />
                            <div className="p-4 space-y-3">
                                <div className="h-4 bg-muted rounded animate-pulse" />
                                <div className="h-3 bg-muted rounded w-2/3 animate-pulse" />
                                <div className="h-8 bg-muted rounded animate-pulse" />
                            </div>
                        </Card>
                    ))
                )}

                {products.map((p, index) => (
                    <Card key={p.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col">
                        {/* Product Image */}
                        <div className="relative aspect-square overflow-hidden bg-muted">
                            {p.image ? (
                                <Image
                                    src={p.image}
                                    alt={p.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <svg className="w-12 h-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            )}
                        </div>

                        {/* Product Info */}
                        <div className="p-4 flex flex-col flex-1 space-y-3">
                            <div className="flex-1 space-y-1">
                                <h3 className="font-semibold line-clamp-2 text-sm leading-tight">{p.name}</h3>
                                <p className="text-xs text-muted-foreground">{p.company}</p>
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t">
                                <span className="text-lg font-bold text-primary">{formatCurrency(p.price)}</span>
                                <Button
                                    size="sm"
                                    disabled={isAdding}
                                    onClick={() => setSelectedProduct(p)}
                                    className="hover:scale-105 transition-transform"
                                >
                                    Adicionar
                                </Button>
                            </div>
                        </div>

                        {/* Infinite scroll ref */}
                        {index === products.length - 1 && (
                            <div ref={(node) => { lastRef.current = node; ref(node as unknown as Element) }} />
                        )}
                    </Card>
                ))}
            </div>

            {/* Loading More */}
            {isFetchingNextPage && (
                <div className="flex items-center justify-center py-8">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        <span>Carregando mais produtos...</span>
                    </div>
                </div>
            )}

            {/* Empty State */}
            {!isLoading && products.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
                    <div className="rounded-full bg-muted p-6">
                        <svg className="w-12 h-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                    </div>
                    <div className="space-y-2">
                        <h3 className="font-semibold text-lg">Nenhum produto encontrado</h3>
                        <p className="text-sm text-muted-foreground max-w-md">
                            Não encontramos produtos que correspondam à sua busca. Tente usar termos diferentes.
                        </p>
                    </div>
                </div>
            )}

            <AddProductDialog
                product={selectedProduct}
                onClose={() => setSelectedProduct(null)}
                onConfirm={async (quantity, price) => {
                    if (!selectedProduct) return
                    await addCatalogAsync({
                        catalogId: selectedProduct.id,
                        quantity,
                        price
                    })
                    setSelectedProduct(null)
                }}
            />
        </div>
    )
}