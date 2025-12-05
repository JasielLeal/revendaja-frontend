import { api } from "@/app/backend/axios"
import { useMutation } from "@tanstack/react-query"

export interface CreateOrderResponse {
    message: string
    order: {
        id: string
        orderNumber: string
        total: number
        status: string
        paymentMethod: string
    }
}
export interface CreateOrderBody {
    customerName: string
    customerPhone: string
    status: string
    subdomain: string
    paymentMethod: string
    createdAt: string
    isDelivery: boolean
    deliveryStreet?: string
    deliveryNumber?: string
    deliveryNeighborhood?: string
    items: {
        storeProductId: string
        quantity: number
    }[]
}


export function useCreateOrder() {
    return useMutation<CreateOrderResponse, Error, CreateOrderBody>({
        mutationFn: async (data: CreateOrderBody) => {
            try {
                const response = await api.post<CreateOrderResponse>(
                    `/orders/online`,
                    data
                )

                return response.data
            } catch (error: unknown) {
                // se a API retorna erro no formato { message: "..." }
                const message = error instanceof Error ? error.message : "Erro ao criar pedido"
                throw new Error(message)
            }
        },
    })
}
