'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Heart,
    Search,
    ShoppingBag,
} from "lucide-react"
import { useStoreBySubdomain } from "./hooks/use-store"
import Link from "next/link"

// Função para extrair subdomain do hostname
function getSubdomainFromHostname(): string {
    if (typeof window === 'undefined') return "demo"

    const hostname = window.location.hostname
    const parts = hostname.split('.')

    if (parts.length >= 2) {
        const extractedSubdomain = parts[0]
        if (extractedSubdomain !== 'www' && extractedSubdomain !== 'localhost') {
            return extractedSubdomain
        } else {
            return "demo"
        }
    } else {
        return "demo"
    }
}

export default function StoreLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const router = useRouter()
    const [subdomain] = useState(() => getSubdomainFromHostname())
    const [searchQuery, setSearchQuery] = useState("")
    const [isScrolled, setIsScrolled] = useState(false)

    // Função para lidar com pesquisa
    const handleSearch = (query: string) => {
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query.trim())}`)
        }
    }

    // Detectar scroll para adicionar sombra no header
    useEffect(() => {
        if (typeof window === 'undefined') return

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Buscar dados da loja
    const { data: storeData, isLoading, error } = useStoreBySubdomain(subdomain)

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Carregando loja...</p>
                </div>
            </div>
        )
    }

    // Error state
    if (error || !storeData) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Loja não encontrada</h1>
                    <p className="text-gray-600">Verifique se o endereço está correto.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen">
            {/* Header da Loja */}
            <header className={`bg-white sticky top-0 z-50 transition-shadow duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Top Bar */}
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <Link href="/">
                            <h1 className="text-2xl font-bold cursor-pointer" style={{ color: storeData.primaryColor }}>
                                {storeData.name}
                            </h1>
                        </Link>

                        {/* Busca Central */}
                        <div className="flex-1 max-w-2xl mx-8">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <Input
                                    placeholder="O que você está procurando?"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleSearch(searchQuery)
                                        }
                                    }}
                                    className="pl-12 pr-4 h-12 text-base border-gray-300 focus:border-gray-400"
                                />
                            </div>
                        </div>

                        {/* Ações */}
                        <div className="flex items-center gap-3">
                            {/* Favoritos */}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="hover:bg-gray-100 rounded-full"
                            >
                                <Heart className="h-6 w-6" />
                            </Button>

                            {/* Carrinho */}
                            <Link href="/cart" className="relative block">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="hover:bg-gray-100 rounded-full relative"
                                >
                                    <ShoppingBag className="h-6 w-6" />

                                    {/* Badge */}
                                    <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                        3
                                    </span>
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Navigation Bar - Fora do header sticky */}
            <div className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center justify-start h-12 overflow-x-auto">
                        {storeData.categories.slice(0, 6).map((category) => (
                            <Link
                                key={category}
                                href={`/search?category=${encodeURIComponent(category)}`}
                                style={{ "--store-color": storeData.primaryColor } as React.CSSProperties}
                                className="mr-4 py-2 text-sm font-medium text-gray-700 rounded-md whitespace-nowrap hover:text-(--store-color)"
                            >
                                <p>{category}</p>
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Conteúdo da página */}
            {children}
        </div>
    )
}
