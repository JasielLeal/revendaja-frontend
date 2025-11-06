import { api } from "@/app/backend/axios"
import { useInfiniteQuery } from "@tanstack/react-query"

export interface CatalogProduct {
    id: number
    name: string
    brand: string
    company: string
    price: number
    image: string
}

interface Pagination {
    page: number
    pageSize: number
    total: number
    totalPages: number
}

interface BackendResponse {
    products: CatalogProduct[]
    page: number
    pageSize: number
}

interface CatalogResponse {
    data: CatalogProduct[]
    pagination: Pagination
}

export function useCatalogProducts(searchTerm?: string, limit = 12) {
    return useInfiniteQuery<CatalogResponse>({
        queryKey: ["catalog-products", searchTerm],
        queryFn: async ({ pageParam = 1 }) => {
            const params = new URLSearchParams({
                page: String(pageParam),
                pageSize: String(limit),
            })
            if (searchTerm) params.append("query", searchTerm)

            const { data: response } = await api.get<BackendResponse>(`/catalog/find-all?${params.toString()}`)

            // Ajustando o formato da resposta para o esperado pelo React Query
            return {
                data: response.products,
                pagination: {
                    page: response.page,
                    pageSize: response.pageSize,
                    total: response.products.length,
                    // Se recebemos exatamente pageSize produtos, provavelmente há mais páginas
                    totalPages: response.products.length === response.pageSize ? response.page + 1 : response.page
                }
            }
        },
        getNextPageParam: (lastPage) => {
            // Se a página atual retornou exatamente pageSize produtos, há mais páginas
            if (lastPage.data.length === lastPage.pagination.pageSize) {
                return lastPage.pagination.page + 1
            }
            return undefined
        },
        initialPageParam: 1,
    })
}
