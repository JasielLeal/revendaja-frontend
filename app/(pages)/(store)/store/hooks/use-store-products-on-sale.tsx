'use client'

import { useQuery } from "@tanstack/react-query"
import { api } from "@/app/backend/axios"

// Tipo para produto em promoção conforme API
interface OnSaleProduct {
    id: string
    name: string
    price: number
    quantity: number
    catalogPrice: number
    catalogId: number
    isOnSale: boolean
    barcode: string
    category: string
    imgUrl: string
    status: string
    brand: string
    company: string
    storeId: string
    type: string
    createdAt: string
    updatedAt: string
}

interface UseStoreProductsOnSaleParams {
    subdomain: string
}

async function fetchStoreProductsOnSale({ subdomain }: UseStoreProductsOnSaleParams): Promise<OnSaleProduct[]> {
    const response = await api.get(`/store-product/on-sale`, {
        params: {
            subdomain,
        }
    })
    return response.data
}

export function useStoreProductsOnSale({ subdomain }: UseStoreProductsOnSaleParams) {
    return useQuery({
        queryKey: ['store-products-on-sale', subdomain],
        queryFn: () => fetchStoreProductsOnSale({ subdomain }),
        enabled: !!subdomain,
        staleTime: 1000 * 60 * 5, // 5 minutos
    })
}

export type { OnSaleProduct }
