'use client'

import { useQuery } from "@tanstack/react-query"
import { api } from "@/app/backend/axios"

interface Banner {
    id: string
    name: string
    url: string
    category: string
    previewUrl: string
}

async function fetchBanner(bannerId: string): Promise<Banner> {
    const response = await api.get(`/banners/${bannerId}`)
    return response.data
}

export function useBanner(bannerId: string | null) {
    return useQuery({
        queryKey: ['banner', bannerId],
        queryFn: () => fetchBanner(bannerId!),
        enabled: !!bannerId && !isValidUrl(bannerId),
        staleTime: 1000 * 60 * 5, // 5 minutos
    })
}

// Função auxiliar para verificar se é uma URL válida
function isValidUrl(string: string): boolean {
    if (!string) return false
    try {
        new URL(string)
        return true
    } catch {
        return string.startsWith('/')
    }
}