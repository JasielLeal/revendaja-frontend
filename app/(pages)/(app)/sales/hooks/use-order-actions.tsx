import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/app/backend/axios'

// Hook para deletar venda
async function deleteOrder(orderId: string) {
    const response = await api.delete(`/orders/${orderId}`)
    return response.data
}

export function useDeleteOrder() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (orderId: string) => deleteOrder(orderId),
        onSuccess: () => {
            // Invalidate specific queries for orders and metrics
            queryClient.invalidateQueries({ queryKey: ['show-orders'] })
            queryClient.invalidateQueries({ queryKey: ['show-orders-metrics'] })
            queryClient.invalidateQueries({ queryKey: ['orders'] })
            queryClient.invalidateQueries({ queryKey: ['dashboard-data'] })
        },
    })
}

// Hook para atualizar status da venda
async function updateOrderStatus(orderId: string, status: string) {
    const response = await api.patch(`/orders/${orderId}/status`, { status })
    return response.data
}

export function useUpdateOrderStatus() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ orderId, status }: { orderId: string; status: string }) =>
            updateOrderStatus(orderId, status),
        onSuccess: () => {
            // Use partial matching to invalidate all related queries
            queryClient.invalidateQueries({
                predicate: (query) => {
                    return query.queryKey[0] === 'show-orders' ||
                        query.queryKey[0] === 'show-orders-metrics' ||
                        query.queryKey[0] === 'orders' ||
                        query.queryKey[0] === 'dashboard-data'
                }
            })

            // Force immediate refetch of active queries
            queryClient.refetchQueries({
                predicate: (query) => {
                    return (query.queryKey[0] === 'show-orders' ||
                        query.queryKey[0] === 'show-orders-metrics') &&
                        query.state.status === 'success'
                }
            })
        },
    })
}