'use client'

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ProductCard } from "./components/product-card";
import { StockFilters } from "./components/stock-filters";
import { useInfiniteStoreProducts } from "../sales/hooks/use-store-products";
import { useEffect, useRef } from "react";
import { useIntersection } from "@mantine/hooks";
import { useSearchParams } from "next/navigation";

export default function Stock() {
    const searchParams = useSearchParams();
    const query = searchParams.get('query') ?? '';
    const brand = searchParams.get('brand') ?? '';
    const category = searchParams.get('category') ?? '';

    const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
        useInfiniteStoreProducts(query, 12);

    // Setup infinite scroll
    const lastCardRef = useRef<HTMLDivElement>(null);
    const { ref, entry } = useIntersection({
        root: null,
        threshold: 0.5,
        rootMargin: '100px',
    });

    useEffect(() => {
        if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [entry?.isIntersecting, fetchNextPage, hasNextPage, isFetchingNextPage]);

    // Combine and filter products
    const products = data?.pages.flatMap((page) => page.data) ?? [];
    const filteredProducts = products.filter(product => {
        const matchesBrand = !brand || brand === 'all' || product.company.toLowerCase() === brand;
        const matchesCategory = !category || category === 'all' || product.category.toLowerCase().replace(/\s+/g, '-') === category;
        return matchesBrand && matchesCategory;
    });

    return (
        <div className="space-y-6 p-6">
            {/* Cabeçalho */}
            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-extrabold tracking-tight text-primary">
                        Estoque
                    </h1>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Novo produto
                    </Button>
                </div>
                <StockFilters />
            </div>

            {/* Grid de produtos */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {filteredProducts.map((product, index) => (
                    <div
                        key={product.id}
                        ref={index === products.length - 1 ? (node) => {
                            lastCardRef.current = node;
                            ref(node);
                        } : undefined}
                    >
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>

            {/* Loading states */}
            {isLoading && (
                <div className="flex items-center justify-center py-8">
                    <div className="text-muted-foreground">Carregando produtos...</div>
                </div>
            )}
            {isFetchingNextPage && (
                <div className="flex items-center justify-center py-4">
                    <div className="text-muted-foreground">Carregando mais produtos...</div>
                </div>
            )}
            {!isLoading && filteredProducts.length === 0 && (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                    <p className="text-lg font-medium">Nenhum produto encontrado</p>
                    <p className="text-muted-foreground">
                        Tente ajustar os filtros ou pesquisar por outro termo
                    </p>
                </div>
            )}
        </div>
    )
}
