'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Heart,
    Search,
    ShoppingBag,
    Menu,
    User,
} from "lucide-react"
import { useStoreBySubdomain } from "./hooks/use-store"
import { CartProvider, useCart } from "@/app/context/cart-context"
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

interface StoreData {
    name: string
    primaryColor: string
    categories: string[]
    // Add other fields as needed
}

function StoreHeader({ storeData }: { storeData: StoreData }) {
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState("")
    const { totalItems } = useCart()

    // Carregar nome do cliente do localStorage com inicialização lazy
    const [customerName] = useState<string | null>(() => {
        if (typeof window === 'undefined') return null

        const savedData = localStorage.getItem('checkout_user_data')
        if (savedData) {
            try {
                const parsed = JSON.parse(savedData)
                if (parsed.name) {
                    // Pegar apenas o primeiro nome e capitalizar primeira letra
                    const firstName = parsed.name.split(' ')[0]
                    return firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase()
                }
            } catch (error) {
                console.error('Erro ao carregar nome do cliente:', error)
            }
        }
        return null
    })

    // Função para lidar com pesquisa
    const handleSearch = (query: string) => {
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query.trim())}`)
        }
    }

    return (
        <>
            {/* Header da Loja */}
            <header className="bg-white border-b sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Top Bar */}
                    <div className="flex items-center justify-between py-4">
                        {/* Logo */}
                        <Link href="/" className="shrink-0">
                            <div className="flex items-center gap-2">
                                <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-xl"
                                    style={{ backgroundColor: storeData.primaryColor }}
                                >
                                    {storeData.name.charAt(0).toUpperCase()}
                                </div>
                                <h1 className="text-2xl font-bold" style={{ color: storeData.primaryColor }}>
                                    {storeData.name}
                                </h1>
                            </div>
                        </Link>

                        {/* Busca Central */}
                        <div className="hidden md:flex flex-1 max-w-xl mx-8">
                            <div className="relative w-full">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <Input
                                    placeholder="Buscar produtos, marcas..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleSearch(searchQuery)
                                        }
                                    }}
                                    className="pl-12 pr-4 h-11 text-sm border-gray-300 rounded-full transition-all"
                                    style={{
                                        '--tw-ring-color': storeData.primaryColor,
                                    } as React.CSSProperties}
                                    onFocus={(e) => {
                                        e.currentTarget.style.borderColor = storeData.primaryColor
                                        e.currentTarget.style.boxShadow = `0 0 0 3px ${storeData.primaryColor}20`
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.borderColor = '#d1d5db'
                                        e.currentTarget.style.boxShadow = 'none'
                                    }}
                                />
                            </div>
                        </div>

                        {/* Ações do Header */}
                        <div className="flex items-center gap-2">
                            {/* Conta */}
                            <p
                                className="hidden lg:flex gap-2 text-gray-700 hover:text-gray-900  lg:items-center "
                            >
                                <User className="h-5 w-5" />
                                <div className="text-left">
                                    <p className="text-xs text-gray-500">Olá, {customerName || 'visitante'}</p>
                                </div>
                            </p>

                            {/* Favoritos */}
                            <Link href="/favorites">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="relative hover:bg-gray-100 rounded-full"
                                >
                                    <Heart className="h-6 w-6 text-gray-700" />
                                </Button>
                            </Link>

                            {/* Carrinho */}
                            <Link href="/cart">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="relative hover:bg-gray-100 rounded-full"
                                >
                                    <ShoppingBag className="h-6 w-6 text-gray-700" />
                                    {totalItems > 0 && (
                                        <span
                                            className="absolute -top-1 -right-1 text-white text-[11px] font-bold rounded-full h-5 min-w-5 px-1 flex items-center justify-center"
                                            style={{ backgroundColor: storeData.primaryColor }}
                                        >
                                            {totalItems}
                                        </span>
                                    )}
                                </Button>
                            </Link>

                            {/* Menu Mobile */}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="md:hidden hover:bg-gray-100 rounded-full"
                            >
                                <Menu className="h-6 w-6 text-gray-700" />
                            </Button>
                        </div>
                    </div>

                    {/* Busca Mobile */}
                    <div className="md:hidden pb-3">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Buscar produtos..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleSearch(searchQuery)
                                    }
                                }}
                                className="pl-10 pr-4 h-10 text-sm border-gray-300 rounded-full transition-all"
                                style={{
                                    '--tw-ring-color': storeData.primaryColor,
                                } as React.CSSProperties}
                                onFocus={(e) => {
                                    e.currentTarget.style.borderColor = storeData.primaryColor
                                    e.currentTarget.style.boxShadow = `0 0 0 3px ${storeData.primaryColor}20`
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.borderColor = '#d1d5db'
                                    e.currentTarget.style.boxShadow = 'none'
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Navigation Bar - Categorias */}
                <div className="border-t bg-gray-50/50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <nav className="flex items-center gap-1 h-12 overflow-x-auto scrollbar-hide">
                            {/* Todas as categorias */}
                            <Link
                                href="/search"
                                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 whitespace-nowrap rounded-md transition-colors"
                                style={{
                                    '--hover-bg': `${storeData.primaryColor}15`,
                                } as React.CSSProperties}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = `${storeData.primaryColor}15`
                                    e.currentTarget.style.color = storeData.primaryColor
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'transparent'
                                    e.currentTarget.style.color = '#374151'
                                }}
                            >
                                Todos os Produtos
                            </Link>

                            {/* Categorias dinâmicas */}
                            {storeData.categories.slice(0, 8).map((category) => (
                                <Link
                                    key={category}
                                    href={`/search?category=${encodeURIComponent(category)}`}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 whitespace-nowrap rounded-md transition-colors"
                                    style={{
                                        '--hover-bg': `${storeData.primaryColor}15`,
                                    } as React.CSSProperties}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = `${storeData.primaryColor}15`
                                        e.currentTarget.style.color = storeData.primaryColor
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'transparent'
                                        e.currentTarget.style.color = '#374151'
                                    }}
                                >
                                    {category}
                                </Link>
                            ))}

                            {/* Ver mais categorias */}
                            {storeData.categories.length > 8 && (
                                <Link
                                    href="/search"
                                    className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 whitespace-nowrap rounded-md transition-colors"
                                >
                                    Ver mais +
                                </Link>
                            )}
                        </nav>
                    </div>
                </div>
            </header>
        </>
    )
}

export default function StoreLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [subdomain] = useState(() => getSubdomainFromHostname())

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
        <CartProvider>
            <div className="min-h-screen">
                <StoreHeader storeData={storeData} />
                {/* Conteúdo da página */}
                {children}
            </div>
        </CartProvider>
    )
}
