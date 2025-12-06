import { api } from "@/app/backend/axios"
import { useInfiniteQuery } from "@tanstack/react-query"

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

async function fetchSearchProducts({ subdomain, page = 1, pageSize = 9, search, category }: UseSearchProductsParams): Promise<StoreProductsResponse> {
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

export function useInfinitSearchProducts(subdomain: string, pageSize = 9, search?: string, category?: string) {
    return useInfiniteQuery<StoreProductsResponse, Error>({
        queryKey: ['store-products-infinite', subdomain, search, category],
        queryFn: async ({ pageParam = 1 }) => {
            const result = await fetchSearchProducts({ subdomain, page: typeof pageParam === 'number' ? pageParam : 1, pageSize, search, category })
            return result
        },
        getNextPageParam: (lastPage: StoreProductsResponse) => {
            const nextPage = lastPage.pagination.page < lastPage.pagination.totalPages
                ? lastPage.pagination.page + 1
                : undefined
            return nextPage
        },
        initialPageParam: 1,
        enabled: !!subdomain,
    })
}