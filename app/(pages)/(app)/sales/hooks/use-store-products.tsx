// src/hooks/useInfiniteStoreProducts.ts
import { api } from "@/app/backend/axios"
import { useInfiniteQuery } from "@tanstack/react-query"


export interface StoreProduct {
    id: string
    name: string
    price: number
    quantity: number
    brand: string
    company: string
    catalogPrice: number
    catalogId: number
    category: string
    imgUrl: string
    status: string
    storeId: string
    type: string
    createdAt: string
    updatedAt: string
}

interface Pagination {
    page: number
    pageSize: number
    total: number
    totalPages: number
}

interface StoreProductsResponse {
    data: StoreProduct[]
    pagination: Pagination
}


export function useInfiniteStoreProducts(searchTerm?: string, limit = 9) {
    return useInfiniteQuery<StoreProductsResponse>({
        queryKey: ["store-products", searchTerm],
        queryFn: async ({ pageParam = 1 }) => {
            const params = new URLSearchParams({
                page: String(pageParam),
                pageSize: String(limit),
            })
            if (searchTerm) params.append("query", searchTerm)

            const { data } = await api.get<StoreProductsResponse>(`/store-product?${params.toString()}`)
            return data
        },
        getNextPageParam: (lastPage) => {
            const { page, totalPages } = lastPage.pagination
            return page < totalPages ? page + 1 : undefined
        },
        initialPageParam: 1,
    })
}
