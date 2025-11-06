'use client'

import { useInfiniteStoreProducts } from "../../sales/hooks/use-store-products";
import { useEffect, useRef } from "react";
import { useIntersection } from "@mantine/hooks";
import Image from "next/image";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/format-currency";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

// Loading skeleton component
function TableRowSkeleton() {
    return (
        <TableRow>
            <TableCell>
                <div className="flex items-center gap-3">
                    <Skeleton className="h-12 w-12 rounded-md" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[200px]" />
                        <Skeleton className="h-4 w-[150px]" />
                    </div>
                </div>
            </TableCell>
            <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
            <TableCell><Skeleton className="h-4 w-20" /></TableCell>
            <TableCell><Skeleton className="h-4 w-20" /></TableCell>
            <TableCell><Skeleton className="h-4 w-[50px]" /></TableCell>
            <TableCell><Skeleton className="h-6 w-[60px]" /></TableCell>
        </TableRow>
    )
}

export function ProductsTable() {
    const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
        useInfiniteStoreProducts();

    // Create a ref for the last row to observe
    const lastRowRef = useRef<HTMLTableRowElement>(null);

    // Setup intersection observer
    const { ref, entry } = useIntersection({
        root: null,
        threshold: 0.5,
        rootMargin: '100px',
    });

    // Load more data when last row is visible
    useEffect(() => {
        if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [entry?.isIntersecting, fetchNextPage, hasNextPage, isFetchingNextPage]);

    // Combine all pages of data
    const products = data?.pages.flatMap((page) => page.data) ?? [];

    if (isLoading) {
        return (
            <Card className="p-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Produto</TableHead>
                            <TableHead>Categoria</TableHead>
                            <TableHead>Marca</TableHead>
                            <TableHead>Preço</TableHead>
                            <TableHead>Estoque</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <TableRowSkeleton key={i} />
                        ))}
                    </TableBody>
                </Table>
            </Card>
        );
    }

    return (
        <Card className="p-4">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="min-w-[300px]">Produto</TableHead>
                        <TableHead>Categoria</TableHead>
                        <TableHead>Marca</TableHead>
                        <TableHead>Preço</TableHead>
                        <TableHead>Estoque</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.map((product, index) => (
                        <TableRow
                            key={product.id}
                            ref={index === products.length - 1 ? (node) => {
                                lastRowRef.current = node;
                                ref(node);
                            } : undefined}
                            className="group"
                        >
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <div className="relative h-12 w-12 overflow-hidden rounded-md border">
                                        <Image
                                            src={product.imgUrl}
                                            alt={product.name}
                                            fill
                                            className="object-cover"
                                            sizes="48px"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <div className="font-medium">{product.name}</div>
                                        <div className="text-sm text-muted-foreground">
                                            {product.company}
                                        </div>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell>{product.brand}</TableCell>
                            <TableCell>
                                <div className="space-y-1">
                                    <div className="font-medium">{formatCurrency(product.price)}</div>
                                    <div className="text-sm text-muted-foreground">
                                        Catálogo: {formatCurrency(product.catalogPrice)}
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge variant={product.quantity > 0 ? "default" : "destructive"} className="w-12 justify-center">
                                    {product.quantity}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <Badge
                                    variant={product.status === "Active" ? "default" : "secondary"}
                                    className="w-16 justify-center"
                                >
                                    {product.status === "Active" ? "Ativo" : "Inativo"}
                                </Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                    {isFetchingNextPage && (
                        <TableRowSkeleton />
                    )}
                </TableBody>
            </Table>
        </Card>
    );
}