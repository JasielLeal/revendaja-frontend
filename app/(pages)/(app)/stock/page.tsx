'use client'

import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Plus, Package, Search } from "lucide-react";
import { ProductCard } from "./components/product-card";
import { StockFilters } from "./components/stock-filters";
import { EditProductDialog } from "./components/edit-product-dialog";
import { useInfiniteStoreProducts } from "../sales/hooks/use-store-products";
import { useUpdateStoreProduct } from "./hooks/use-update-store-product";
import { useEffect, useRef, useState } from "react";
import { useIntersection } from "@mantine/hooks";
import { useSearchParams, useRouter } from "next/navigation";
import type { StoreProduct } from "../sales/hooks/use-store-products";
import { toast } from "sonner";

export default function Stock() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const query = searchParams.get('query') ?? '';
    const brand = searchParams.get('brand') ?? '';
    const category = searchParams.get('category') ?? '';

    // Dialog state
    const [selectedProduct, setSelectedProduct] = useState<StoreProduct | null>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
        useInfiniteStoreProducts(query, 12);

    // Update product mutation
    const updateProductMutation = useUpdateStoreProduct();

    // Setup infinite scroll
    const lastCardRef = useRef<HTMLDivElement>(null);
    const { ref, entry } = useIntersection({
        root: null,
        threshold: 0.5,
        rootMargin: '100px',
    });

    // Handle opening edit dialog
    const handleProductClick = (product: StoreProduct) => {
        setSelectedProduct(product);
        setIsEditDialogOpen(true);
    };

    // Handle saving product changes
    const handleSaveProduct = async (productId: string, updates: {
        price?: number;
        quantity?: number;
        status?: string;
    }) => {
        try {
            await updateProductMutation.mutateAsync({ productId, data: updates });
            toast.success('Produto atualizado com sucesso!');
        } catch (error) {
            console.error('Error updating product:', error);
            toast.error('Erro ao atualizar produto');
        }
    };

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
                    <Button onClick={() => router.push('/stock/new-product')}>
                        <Plus className="mr-2 h-4 w-4" />
                        Novo produto
                    </Button>
                </div>
                <StockFilters />
            </div>

            {/* Grid de produtos */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
                {filteredProducts.map((product, index) => (
                    <div
                        key={product.id}
                        ref={index === products.length - 1 ? (node) => {
                            lastCardRef.current = node;
                            ref(node);
                        } : undefined}
                    >
                        <ProductCard
                            product={product}
                            onClick={() => handleProductClick(product)}
                        />
                    </div>
                ))}
            </div>

            {/* Estados de loading e empty */}
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
                <EmptyState
                    variant="card"
                    icon={query || brand !== '' || category !== '' ? Search : Package}
                    title={
                        query || brand !== '' || category !== ''
                            ? "Nenhum produto encontrado"
                            : "Nenhum produto em estoque"
                    }
                    description={
                        query || brand !== '' || category !== ''
                            ? "Tente ajustar os filtros ou pesquisar por outro termo"
                            : "Comece adicionando produtos ao seu estoque para gerenciar seu inventário"
                    }
                    action={
                        <Button onClick={() => router.push('/stock/new-product')}>
                            <Plus className="mr-2 h-4 w-4" />
                            Adicionar produto
                        </Button>
                    }
                />
            )}

            {/* Edit Product Dialog */}
            <EditProductDialog
                product={selectedProduct}
                open={isEditDialogOpen}
                onOpenChange={setIsEditDialogOpen}
                onSave={handleSaveProduct}
            />
        </div>
    )
}
