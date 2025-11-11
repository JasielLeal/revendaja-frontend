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

interface UseSearchProductsParams {
    subdomain: string
    page?: number
    pageSize?: number
    search?: string
    category?: string
    enabled?: boolean
}

async function fetchSearchProducts({ subdomain, page = 1, pageSize = 20, search, category }: UseSearchProductsParams): Promise<StoreProductsResponse> {
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

export function useSearchProducts({ subdomain, page = 1, pageSize = 20, search, category, enabled = true }: UseSearchProductsParams) {
    return useQuery({
        queryKey: ['search-products', subdomain, page, pageSize, search, category],
        queryFn: () => fetchSearchProducts({ subdomain, page, pageSize, search, category }),
        enabled: enabled && !!subdomain,
        staleTime: 1000 * 60 * 2, // 2 minutos (menor que o hook principal)
    })
}

export type { StoreProduct, StoreProductsResponse }