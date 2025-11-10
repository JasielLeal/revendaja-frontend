import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/app/backend/axios'

interface UpdateProductData {
    price?: number
    quantity?: number
    status?: string
}

async function updateStoreProduct(productId: string, data: UpdateProductData) {
    const response = await api.patch(`/store-product/${productId}`, data)
    return response.data
}

export function useUpdateStoreProduct() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ productId, data }: { productId: string; data: UpdateProductData }) =>
            updateStoreProduct(productId, data),
        onSuccess: () => {
            // Invalidate store products query to refresh the list
            queryClient.invalidateQueries({ queryKey: ['store-products'] })
        },
    })
}

