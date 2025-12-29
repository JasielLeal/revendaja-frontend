'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
    Heart,
    ShoppingBag,
    Star,
    MapPin,
    Phone,
    Clock,
    Instagram,
    Facebook,
} from "lucide-react"
import { formatCurrency } from "@/lib/format-currency"
import { useStoreBySubdomain } from "./hooks/use-store"
import { useStoreProducts, type StoreProduct } from "./hooks/use-store-products"
import { useCart } from "@/app/context/cart-context"

interface FavoriteProduct {
    id: string
    name: string
    brand: string
    category: string
    price: number
    originalPrice?: number
    image: string
    rating: number
    reviews: number
    stock: number
    isNew: boolean
    isBestseller: boolean
}

// Função para extrair subdomain do hostname
function getSubdomainFromHostname(): string {
    if (typeof window === 'undefined') return "demo"

    const hostname = window.location.hostname
    console.log("Hostname completo:", hostname)

    // Para desenvolvimento local: perfumaria.localhost
    // Para produção: perfumaria.seudominio.com
    const parts = hostname.split('.')

    if (parts.length >= 2) {
        // Se tem subdomínio (ex: perfumaria.localhost ou perfumaria.seudominio.com)
        const extractedSubdomain = parts[0]

        // Evitar usar 'www' como subdomain
        if (extractedSubdomain !== 'www' && extractedSubdomain !== 'localhost') {
            console.log("Subdomain extraído:", extractedSubdomain)
            return extractedSubdomain
        } else {
            // Se é www.seudominio.com ou apenas localhost, usar 'demo'
            console.log("Usando subdomain padrão: demo")
            return "demo"
        }
    } else {
        // Se não há subdomínio, usar 'demo'
        console.log("Sem subdomain detectado, usando: demo")
        return "demo"
    }
}

// Função para validar se é uma URL válida
function isValidUrl(string: string): boolean {
    if (!string || typeof string !== 'string') return false
    try {
        new URL(string)
        return true
    } catch {
        // Se não é URL absoluta, verificar se pelo menos começa com /
        return string.startsWith('/')
    }
}

// Função para obter URL de imagem segura
function getSafeImageUrl(bannerUrl: string | { mobile: string; desktop: string } | undefined): string {
    // Se bannerUrl é um objeto com mobile/desktop
    if (bannerUrl && typeof bannerUrl === 'object') {
        return bannerUrl.desktop || bannerUrl.mobile || "/template.jpg"
    }

    // Se é uma string e é uma URL válida
    if (bannerUrl && typeof bannerUrl === 'string' && isValidUrl(bannerUrl)) {
        return bannerUrl
    }

    // Fallback para imagem padrão
    return "/template.jpg"
}

export default function StoreTemplate() {
    const router = useRouter()
    const [subdomain] = useState(() => getSubdomainFromHostname())
    const [favorites, setFavorites] = useState<FavoriteProduct[]>(() => {
        if (typeof window === 'undefined') return []
        const savedFavorites = localStorage.getItem('favorites')
        if (savedFavorites) {
            try {
                return JSON.parse(savedFavorites)
            } catch (error) {
                console.error('Erro ao carregar favoritos:', error)
                return []
            }
        }
        return []
    })
    const { addItem } = useCart()

    // Verificar se produto está nos favoritos
    const isFavorite = (productId: string) => {
        return favorites.some(fav => fav.id === productId)
    }

    // Adicionar ou remover dos favoritos
    const toggleFavorite = (product: FavoriteProduct) => {
        let updated: FavoriteProduct[]

        if (isFavorite(product.id)) {
            updated = favorites.filter(fav => fav.id !== product.id)
        } else {
            updated = [...favorites, product]
        }

        setFavorites(updated)
        localStorage.setItem('favorites', JSON.stringify(updated))
    }

    // Buscar dados da loja
    const { data: storeData, isLoading, error } = useStoreBySubdomain(subdomain)

    // Buscar produtos da loja (8 mais novos) - apenas se não há busca
    const { data: productsData, isLoading: productsLoading } = useStoreProducts({
        subdomain: subdomain,
        pageSize: 8,
        search: undefined // Não usar busca na página principal
    })

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Carregando loja...</p>
                    <p className="text-xs text-gray-400 mt-2">Subdomain: {subdomain}</p>
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
                    <p className="text-xs text-gray-400 mt-2">Subdomain: {subdomain}</p>
                </div>
            </div>
        )
    }

    // Produtos da loja (dados reais da API)
    const rawProducts = productsData?.data || []
    const isLoadingProducts = productsLoading || isLoading

    // Função para transformar produto da API para o formato esperado pelos cards
    const transformProduct = (product: StoreProduct) => ({
        id: product.id,
        name: product.name,
        brand: product.brand,
        category: product.category,
        price: product.price,
        originalPrice: product.catalogPrice > product.price ? product.catalogPrice : undefined,
        image: product.imgUrl || "/template.jpg",
        rating: 4.5, // Temporário até ter rating real
        reviews: 0, // Temporário até ter reviews reais
        stock: product.quantity,
        isNew: true, // Pode ser calculado baseado em createdAt
        isBestseller: false, // Será implementado depois com produtos mais vendidos
        description: `${product.brand} - ${product.category}`
    })

    // Produtos transformados
    const products = rawProducts.map(transformProduct)

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Banner Hero - Moderno e Dinâmico */}
            <section className="relative bg-linear-to-b from-white to-gray-50">
                <div className="w-full">
                    <div className="relative h-[420px] overflow-hidden shadow-2xl">
                        {/* Imagem do Banner */}
                        <Image
                            src={getSafeImageUrl(storeData.bannerUrl)}
                            alt="Banner da loja"
                            fill
                            className="object-cover"
                            priority
                        />

                        {/* Overlay Gradiente */}
                        <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/30 to-transparent"></div>

                    </div>
                </div>

            </section>

            {/* Grid de Produtos */}
            <main className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                                Produtos em Destaque
                            </h2>
                            <p className="hidden lg:block text-gray-600">Confira nossa seleção especial para você</p>
                        </div>
                        <Button
                            variant="outline"
                            className="gap-2 font-medium"
                            style={{ borderColor: storeData.primaryColor, color: storeData.primaryColor }}
                            onClick={() => router.push('/search')}
                        >
                            Ver todos os produtos
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Button>
                    </div>

                    {isLoadingProducts ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
                                    <div className="aspect-4/5 bg-gray-200 rounded-lg mb-4"></div>
                                    <div className="space-y-2">
                                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                        <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : products.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500">Nenhum produto disponível no momento.</p>
                        </div>
                    ) : (
                        <div className="">
                            <div className="flex gap-4 overflow-x-auto pb-4 lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible hide-scrollbar">
                                {products.map((product) => (
                                    <div key={product.id} role="listitem" className="shrink-0 w-[64%] sm:w-[44%] md:w-[28%] lg:w-auto">
                                        <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-gray-300 bg-white">
                                            <div className="relative">
                                                {/* Badges */}
                                                <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                                                    {product.isNew && (
                                                        <Badge className=" text-white text-xs font-semibold px-2 py-1" style={{ background: storeData.primaryColor }}>
                                                            NOVO
                                                        </Badge>
                                                    )}
                                                    {product.isBestseller && (
                                                        <Badge className="bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold px-2 py-1">
                                                            MAIS VENDIDO
                                                        </Badge>
                                                    )}
                                                    {product.originalPrice && product.originalPrice > product.price && (
                                                        <Badge className="bg-green-500 text-white text-xs font-semibold px-2 py-1">
                                                            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                                                        </Badge>
                                                    )}
                                                </div>

                                                {/* Botão favoritar */}
                                                <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className={`hover:bg-white`}
                                                        onClick={(e) => {
                                                            e.preventDefault()
                                                            toggleFavorite({
                                                                id: product.id,
                                                                name: product.name,
                                                                brand: product.brand,
                                                                category: product.category,
                                                                price: product.price,
                                                                originalPrice: product.originalPrice,
                                                                image: product.image,
                                                                rating: product.rating,
                                                                reviews: product.reviews,
                                                                stock: product.stock,
                                                                isNew: product.isNew,
                                                                isBestseller: product.isBestseller,
                                                            })
                                                        }}
                                                    >
                                                        <Heart className={`h-4 w-4 ${isFavorite(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                                                    </Button>
                                                </div>

                                                {/* Imagem */}
                                                <div className="relative aspect-square overflow-hidden bg-gray-50">
                                                    <Image
                                                        src={product.image}
                                                        alt={product.name}
                                                        fill
                                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                                    />
                                                </div>
                                            </div>

                                            <CardContent className="p-3">
                                                {/* Marca */}
                                                <p className="text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: storeData.primaryColor }}>
                                                    {product.brand}
                                                </p>

                                                {/* Nome */}
                                                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-xs leading-tight h-8">
                                                    {product.name}
                                                </h3>

                                                {/* Preço */}
                                                <div className="mb-3 h-14">
                                                    <div className="flex items-baseline gap-2 mb-0.5">
                                                        <span className="text-lg font-bold text-gray-900">
                                                            {formatCurrency(product.price)}
                                                        </span>
                                                        {product.originalPrice && product.originalPrice > product.price && (
                                                            <span className="text-xs text-gray-500 line-through">
                                                                {formatCurrency(product.originalPrice)}
                                                            </span>
                                                        )}
                                                    </div>
                                                    {product.originalPrice && product.originalPrice > product.price && (
                                                        <p className="text-xs text-green-600 font-medium">
                                                            Economize {formatCurrency(product.originalPrice - product.price)}
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Botão */}
                                                <Button
                                                    className="w-full text-white font-semibold h-9 hover:opacity-90 transition-all shadow-md hover:shadow-lg"
                                                    style={{ backgroundColor: storeData.primaryColor }}
                                                    disabled={product.stock === 0}
                                                    onClick={() => addItem({
                                                        id: product.id,
                                                        name: product.name,
                                                        brand: product.brand,
                                                        price: product.price,
                                                        originalPrice: product.originalPrice,
                                                        image: product.image,
                                                        stock: product.stock
                                                    })}
                                                >
                                                    {product.stock === 0 ? 'Indisponível' : (
                                                        <span className="flex items-center justify-center gap-2">
                                                            <ShoppingBag className="h-3.5 w-3.5" />
                                                            Adicionar
                                                        </span>
                                                    )}
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* Footer da Loja */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Informações da Loja */}
                        <div>
                            <h3 className="font-bold text-lg mb-4">{storeData.name}</h3>
                            <p className="text-gray-300 mb-4">Sua loja online de confiança</p>
                            <div className="flex items-center space-x-4">
                                <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                                    <Instagram className="h-5 w-5" />
                                </Button>
                                <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                                    <Facebook className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>

                        {/* Contato */}
                        <div>
                            <h4 className="font-semibold mb-4">Contato</h4>
                            <div className="space-y-3 text-sm">
                                <div className="flex items-start gap-2">
                                    <MapPin className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" />
                                    <span className="text-gray-300">{storeData.address}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-gray-400" />
                                    <span className="text-gray-300">{storeData.phone}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-gray-400" />
                                    <span className="text-gray-300">Seg-Dom: 9h-18h</span>
                                </div>
                            </div>
                        </div>

                        {/* Categorias */}
                        <div>
                            <h4 className="font-semibold mb-4">Categorias</h4>
                            <ul className="space-y-2 text-sm">
                                {storeData.categories.map((category) => (
                                    <li key={category}>
                                        <Button
                                            variant="link"
                                            className="text-gray-300 hover:text-white p-0 h-auto"
                                            onClick={() => router.push(`/search?category=${encodeURIComponent(category)}`)}
                                        >
                                            {category}
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <Separator className="my-8 bg-gray-700" />

                    <div className="text-center text-gray-400 text-sm">
                        © 2025 {storeData.name}. Todos os direitos reservados.
                    </div>
                </div>
            </footer>
        </div>
    )
}