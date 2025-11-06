import { api } from "@/app/backend/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export interface AddCatalogProductBody {
    catalogId: number | string
    quantity: number
    price: number
}

export interface AddCatalogProductResponse {
    message: string
    storeProduct: {
        id: string
        name: string
        price: number
        quantity: number
        catalogId: number
        brand: string
        company: string
        category: string
        status: string
    }
}

export function useAddCatalogProductToStore() {
    const queryClient = useQueryClient()

    return useMutation<AddCatalogProductResponse, Error, AddCatalogProductBody>({
        mutationFn: async (data: AddCatalogProductBody) => {
            const response = await api.post<AddCatalogProductResponse>(`/store-product`, data)
            return response.data
        },
        onSuccess: () => {
            // Invalidate queries to refresh lists
            queryClient.invalidateQueries({ queryKey: ["store-products"] })
            queryClient.invalidateQueries({ queryKey: ["catalog-products"] })
        }
    })
}
