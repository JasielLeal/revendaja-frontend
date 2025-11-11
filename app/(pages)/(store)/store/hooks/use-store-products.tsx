'use client'

import { useQuery } from "@tanstack/react-query"
import { api } from "@/app/backend/axios"

interface StoreProduct {
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

interface StoreProductsResponse {
    data: StoreProduct[]
    pagination: {
        page: number
        pageSize: number
        total: number
        totalPages: number
    }
}

interface UseStoreProductsParams {
    subdomain: string
    page?: number
    pageSize?: number
    search?: string
    category?: string
}

async function fetchStoreProducts({ subdomain, page = 1, pageSize = 8, search, category }: UseStoreProductsParams): Promise<StoreProductsResponse> {
    const params = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
    })

    if (search) {
        params.append('search', search)
    }

    if (category) {
        params.append('category', category)
    }

    const response = await api.get(`web/store/${subdomain}/products/list?${params.toString()}`)
    return response.data
}

export function useStoreProducts({ subdomain, page = 1, pageSize = 8, search, category }: UseStoreProductsParams) {
    return useQuery({
        queryKey: ['store-products', subdomain, page, pageSize, search, category],
        queryFn: () => fetchStoreProducts({ subdomain, page, pageSize, search, category }),
        enabled: !!subdomain,
        staleTime: 1000 * 60 * 5, // 5 minutos,
    })
}

export type { StoreProduct, StoreProductsResponse }