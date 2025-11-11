import { useQuery } from '@tanstack/react-query'
import { api } from '@/app/backend/axios'

interface Store {
    id: string
    name: string
    subdomain: string
    address: string
    phone: string
    primaryColor: string
    bannerUrl: string
    createdAt: string
    categories: string[]
    totalProducts: number
    productsByCategory: {
        [key: string]: number
    }
}

async function fetchStoreBySubdomain(subdomain: string): Promise<Store> {
    const response = await api.get(`/web/store/${subdomain}`)
    return response.data
}

export function useStoreBySubdomain(subdomain: string) {
    return useQuery({
        queryKey: ['store', subdomain],
        queryFn: () => fetchStoreBySubdomain(subdomain),
        enabled: !!subdomain,
        retry: false
    })
}