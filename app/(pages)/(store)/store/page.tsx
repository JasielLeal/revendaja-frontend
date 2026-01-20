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
import { useStoreProductsOnSale } from "./hooks/use-store-products-on-sale"
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

    // Buscar produtos em promoção
    const { data: onSaleProductsData, isLoading: onSaleProductsLoading } = useStoreProductsOnSale({
        subdomain: subdomain
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

    // Função para transformar produto em promoção (formato simplificado)
    const transformOnSaleProduct = (product: any) => ({
        id: product.id,
        name: product.name,
        brand: product.brand,
        category: product.category,
        price: product.price,
        originalPrice: product.catalogPrice && product.catalogPrice > product.price ? product.catalogPrice : undefined,
        image: product.imgUrl || "/template.jpg",
        rating: 4.5,
        reviews: 0,
        stock: product.quantity,
        isNew: false,
        isBestseller: false,
        description: `${product.brand} - ${product.category}`
    })

    console.log("Preço originais dos produtos", rawProducts.map(p => p.catalogPrice))

    // Produtos transformados
    const products = rawProducts.map(transformProduct)

    return (
        <div className="min-h-screen bg-gray-50">


            {/* Banner Hero - Compacto e Promocional para Mobile */}
            <section className="relative bg-gray-50 rounded-2xl">
                <div className="w-full px-4 py-4 lg:px-0 lg:py-0">
                    <div className="lg:max-w-7xl lg:mx-auto lg:px-8">
                        <div className="relative h-[180px] lg:h-[420px] overflow-hidden rounded-2xl lg:rounded-none shadow-lg lg:shadow-2xl"
                        >
                        {/* Imagem do Banner */}
                        <Image
                            src={getSafeImageUrl(storeData.bannerUrl)}
                            alt="Banner da loja"
                            fill
                            className="object-cover lg:object-cover rounded-2xl"
                            priority
                        />

                        {/* Overlay Gradiente - Apenas Desktop */}
                        <div className="hidden lg:block absolute inset-0 bg-linear-to-r from-black/60 via-black/30 to-transparent rounded-2xl"></div>
                    </div>
                </div>
            </div>
            </section>

            {/* Categorias Horizontais - Mobile */}
            <section className="lg:hidden py-4 px-4 bg-gray-50">
                <div className="flex gap-4 overflow-x-auto hide-scrollbar">
                    {storeData.categories.slice(0, 5).map((category) => (
                        <button
                            key={category}
                            onClick={() => router.push(`/search?category=${encodeURIComponent(category)}`)}
                            className="flex items-center px-4 py-2 rounded-full gap-2 flex-shrink-0"
                            style={{background: `${storeData.primaryColor}`}}
                        >

                            <ShoppingBag  className="text-white"/>

                            <span className="text-sm text-white">{category}</span>
                        </button>
                    ))}
                </div>
            </section>

            {/* Grid de Produtos */}
            <main className="py-4 lg:py-16 bg-gray-50 lg:bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-4 lg:mb-10">
                        <div>
                            <h2 className="text-lg sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-0 lg:mb-2">
                                Novos
                            </h2>
                            <p className="hidden lg:block text-gray-600">Confira nossa seleção especial para você</p>
                        </div>
                        <Button
                            variant="ghost"
                            className="gap-1 font-medium text-sm lg:text-base p-0 lg:px-4 h-auto hover:bg-transparent"
                            style={{ color: storeData.primaryColor }}
                            onClick={() => router.push('/search')}
                        >
                            Ver tudo
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
                            <div className="flex gap-3 overflow-x-auto pb-4 lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible hide-scrollbar">
                                {products.map((product) => (
                                    <div key={product.id} role="listitem" className="shrink-0 w-[48%] sm:w-[50%] md:w-[30%] lg:w-auto">
                                        <Card 
                                            className={`group overflow-hidden hover:shadow-lg lg:hover:shadow-2xl shadow-sm lg:shadow-md bg-white rounded-xl lg:rounded-lg ${
                                                product.originalPrice && product.originalPrice > product.price 
                                                ? 'border-2 relative' 
                                                : 'border-0 lg:border lg:border-gray-200'
                                            }`}
                                            
                                        >
                                            <div className="relative">
                                                {/* Badges - Apenas desktop ou com desconto significativo */}
                                                <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
                                                    {product.originalPrice && product.originalPrice > product.price && (
                                                        <Badge className="text-white text-xs lg:text-sm font-bold px-2 py-1 lg:px-3 lg:py-1.5 shadow-lg" style={{ background: storeData.primaryColor }}>
                                                            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                                                        </Badge>
                                                    )}
                                                </div>

                                                {/* Botão favoritar - Apenas Desktop */}
                                                <div className="hidden lg:block absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
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
                                                <div className="relative aspect-square overflow-hidden rounded-t-xl lg:rounded-t-lg">
                                                    <Image
                                                        src={product.image}
                                                        alt={product.name}
                                                        fill
                                                        className="object-cover group-hover:scale-105 lg:group-hover:scale-110 transition-transform duration-500 lg:duration-700"
                                                    />
                                                </div>
                                            </div>

                                            <CardContent className="p-2 lg:p-3">
                                                {/* Marca - Mobile Clean */}
                                                <p className="text-[10px] lg:text-xs font-medium lg:font-semibold text-gray-500 lg:uppercase tracking-wide mb-0.5 lg:mb-1.5">
                                                    {product.brand}
                                                </p>

                                                {/* Nome */}
                                                <h3 className="font-medium lg:font-semibold text-gray-900 mb-1 lg:mb-2 line-clamp-2 text-xs lg:text-xs leading-tight h-7 lg:h-8">
                                                    {product.name}
                                                </h3>

                                                {/* Preço - Com destaque para desconto */}
                                                <div className="mb-2 lg:mb-3 flex items-center justify-between lg:block">
                                                    <div className="flex flex-col lg:flex-row lg:items-baseline gap-0.5 lg:gap-2">
                                                        {product.originalPrice && product.originalPrice > product.price && (
                                                            <span className="text-[10px] lg:text-xs text-gray-400 line-through order-1 lg:order-2">
                                                                De {formatCurrency(product.originalPrice)}
                                                            </span>
                                                        )}
                                                        <span 
                                                            className="text-sm lg:text-lg font-bold order-2 lg:order-1"
                                                            style={product.originalPrice && product.originalPrice > product.price ? {
                                                                color: storeData.primaryColor
                                                            } : undefined}
                                                        >
                                                            {formatCurrency(product.price)}
                                                        </span>
                                                    </div>

                                                    {/* Botão Mobile - Ícone Circular */}
                                                    <Button
                                                        size="icon"
                                                        className="lg:hidden w-8 h-8 rounded-full text-white shadow-md"
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
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                        </svg>
                                                    </Button>
                                                </div>

                                                {/* Botão Desktop */}
                                                <Button
                                                    className="hidden lg:flex w-full text-white font-semibold h-9 hover:opacity-90 transition-all shadow-md hover:shadow-lg"
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

            {/* Seção de Promoções */}
            <section className="py-4 lg:py-16 bg-gray-50 lg:bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-4 lg:mb-10">
                        <div>
                            <h2 className="text-lg sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-0 lg:mb-2">
                                Promoções
                            </h2>
                            <p className="hidden lg:block text-gray-600">Aproveite as melhores ofertas</p>
                        </div>
                        <Button
                            variant="ghost"
                            className="gap-1 font-medium text-sm lg:text-base p-0 lg:px-4 h-auto hover:bg-transparent"
                            style={{ color: storeData.primaryColor }}
                            onClick={() => router.push('/search?onSale=true')}
                        >
                            Ver tudo
                        </Button>
                    </div>

                    {onSaleProductsLoading ? (
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
                    ) : !onSaleProductsData || onSaleProductsData.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500">Nenhuma promoção disponível no momento.</p>
                        </div>
                    ) : (
                        <div className="">
                            <div className="flex gap-3 overflow-x-auto pb-4 lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible hide-scrollbar">
                                {onSaleProductsData.map(transformOnSaleProduct).map((product) => (
                                    <div key={product.id} role="listitem" className="shrink-0 w-[48%] sm:w-[50%] md:w-[30%] lg:w-auto">
                                        <Card 
                                            className={`group overflow-hidden hover:shadow-lg lg:hover:shadow-2xl shadow-sm lg:shadow-md bg-white rounded-xl lg:rounded-lg ${
                                                product.originalPrice && product.originalPrice > product.price 
                                                ? 'border-2 relative' 
                                                : 'border-0 lg:border lg:border-gray-200'
                                            }`}
                                            
                                        >
                                            <div className="relative">
                                                {/* Badges - Apenas desktop ou com desconto significativo */}
                                                <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
                                                    {product.originalPrice && product.originalPrice > product.price && (
                                                        <Badge className="text-white text-xs lg:text-sm font-bold px-2 py-1 lg:px-3 lg:py-1.5 shadow-lg" style={{ background: storeData.primaryColor }}>
                                                            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                                                        </Badge>
                                                    )}
                                                </div>

                                                {/* Botão favoritar - Apenas Desktop */}
                                                <div className="hidden lg:block absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
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
                                                <div className="relative aspect-square overflow-hidden rounded-t-xl lg:rounded-t-lg">
                                                    <Image
                                                        src={product.image}
                                                        alt={product.name}
                                                        fill
                                                        className="object-cover group-hover:scale-105 lg:group-hover:scale-110 transition-transform duration-500 lg:duration-700"
                                                    />
                                                </div>
                                            </div>

                                            <CardContent className="p-2 lg:p-3">
                                                {/* Marca - Mobile Clean */}
                                                <p className="text-[10px] lg:text-xs font-medium lg:font-semibold text-gray-500 lg:uppercase tracking-wide mb-0.5 lg:mb-1.5">
                                                    {product.brand}
                                                </p>

                                                {/* Nome */}
                                                <h3 className="font-medium lg:font-semibold text-gray-900 mb-1 lg:mb-2 line-clamp-2 text-xs lg:text-xs leading-tight h-7 lg:h-8">
                                                    {product.name}
                                                </h3>

                                                {/* Preço - Com destaque para desconto */}
                                                <div className="mb-2 lg:mb-3 flex items-center justify-between lg:block">
                                                    <div className="flex flex-col lg:flex-row lg:items-baseline gap-0.5 lg:gap-2">
                                                        {product.originalPrice && product.originalPrice > product.price && (
                                                            <span className="text-[10px] lg:text-xs text-gray-400 line-through order-1 lg:order-2">
                                                                De {formatCurrency(product.originalPrice)}
                                                            </span>
                                                        )}
                                                        <span 
                                                            className="text-sm lg:text-lg font-bold order-2 lg:order-1"
                                                            style={product.originalPrice && product.originalPrice > product.price ? {
                                                                color: storeData.primaryColor
                                                            } : undefined}
                                                        >
                                                            {formatCurrency(product.price)}
                                                        </span>
                                                    </div>

                                                    {/* Botão Mobile - Ícone Circular */}
                                                    <Button
                                                        size="icon"
                                                        className="lg:hidden w-8 h-8 rounded-full text-white shadow-md"
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
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                        </svg>
                                                    </Button>
                                                </div>

                                                {/* Botão Desktop */}
                                                <Button
                                                    className="hidden lg:flex w-full text-white font-semibold h-9 hover:opacity-90 transition-all shadow-md hover:shadow-lg"
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
            </section>

            {/* Footer */}
            <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Main Footer Content */}
                    <div className="py-8 lg:py-12">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8">
                            {/* Sobre a Loja */}
                            <div className="lg:col-span-2">
                                <h3 className="font-bold text-xl lg:text-2xl mb-3 lg:mb-4" style={{ color: storeData.primaryColor }}>
                                    {storeData.name}
                                </h3>
                                <p className="text-gray-400 mb-4 text-sm lg:text-base leading-relaxed">
                                    Sua loja online de confiança com os melhores produtos e atendimento personalizado.
                                </p>
                                
                                {/* Redes Sociais */}
                                <div className="mb-4">
                                    <p className="text-sm font-semibold mb-2 text-gray-300">Siga-nos</p>
                                    <div className="flex items-center space-x-3">
                                        <Button 
                                            variant="outline" 
                                            size="icon" 
                                            className="border-gray-700 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white h-9 w-9 transition-all"
                                        >
                                            <Instagram className="h-4 w-4" />
                                        </Button>
                                        <Button 
                                            variant="outline" 
                                            size="icon" 
                                            className="border-gray-700 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white h-9 w-9 transition-all"
                                        >
                                            <Facebook className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Links Rápidos */}
                            <div>
                                <h4 className="font-semibold mb-3 lg:mb-4 text-sm lg:text-base text-white">Links Rápidos</h4>
                                <ul className="space-y-2 text-xs lg:text-sm">
                                    <li>
                                        <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                                            Início
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/search" className="text-gray-400 hover:text-white transition-colors">
                                            Produtos
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/favorites" className="text-gray-400 hover:text-white transition-colors">
                                            Favoritos
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/cart" className="text-gray-400 hover:text-white transition-colors">
                                            Carrinho
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            {/* Atendimento */}
                            <div>
                                <h4 className="font-semibold mb-3 lg:mb-4 text-sm lg:text-base text-white">Atendimento</h4>
                                <ul className="space-y-2 text-xs lg:text-sm">
                                    <li>
                                        <button className="text-gray-400 hover:text-white transition-colors text-left">
                                            Central de Ajuda
                                        </button>
                                    </li>
                                    <li>
                                        <button className="text-gray-400 hover:text-white transition-colors text-left">
                                            Política de Troca
                                        </button>
                                    </li>
                                    <li>
                                        <button className="text-gray-400 hover:text-white transition-colors text-left">
                                            Política de Privacidade
                                        </button>
                                    </li>
                                    <li>
                                        <button className="text-gray-400 hover:text-white transition-colors text-left">
                                            Termos de Uso
                                        </button>
                                    </li>
                                </ul>
                            </div>

                            {/* Contato */}
                            <div>
                                <h4 className="font-semibold mb-3 lg:mb-4 text-sm lg:text-base text-white">Contato</h4>
                                <div className="space-y-3 text-xs lg:text-sm">
                                    <div className="flex items-start gap-2">
                                        <MapPin className="h-4 w-4 text-gray-500 mt-0.5 shrink-0" />
                                        <span className="text-gray-400">{storeData.address}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-gray-500 shrink-0" />
                                        <span className="text-gray-400">{storeData.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-gray-500 shrink-0" />
                                        <span className="text-gray-400">Seg-Dom: 9h-18h</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Categorias - Versão Desktop */}
                        {storeData.categories.length > 0 && (
                            <div className="hidden lg:block mt-8 pt-8 border-t border-gray-800">
                                <h4 className="font-semibold mb-4 text-sm text-white">Categorias</h4>
                                <div className="flex flex-wrap gap-2">
                                    {storeData.categories.map((category) => (
                                        <Button
                                            key={category}
                                            variant="outline"
                                            size="sm"
                                            className="border-gray-700 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white text-xs transition-all"
                                            onClick={() => router.push(`/search?category=${encodeURIComponent(category)}`)}
                                        >
                                            {category}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Bottom Footer */}
                    <div className="border-t border-gray-800">
                        <div className="py-6 lg:py-8">
                            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
                                {/* Copyright */}
                                <div className="text-center lg:text-left">
                                    <p className="text-gray-400 text-xs lg:text-sm">
                                        © {new Date().getFullYear()} {storeData.name}. Todos os direitos reservados.
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}