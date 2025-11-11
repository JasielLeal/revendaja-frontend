'use client'

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Heart,
    Search,
    ShoppingBag,
    Star,
    ArrowLeft,
    Filter
} from "lucide-react"
import { formatCurrency } from "@/lib/format-currency"
import { useStoreBySubdomain } from "../hooks/use-store"
import { useBanner } from "../hooks/use-banner"
import { useSearchProducts } from "./hooks/use-search-products"
import { StoreProduct } from "../hooks/use-store-products"

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

// Função para validar se é uma URL válida
function isValidUrl(string: string): boolean {
    if (!string) return false
    try {
        new URL(string)
        return true
    } catch {
        return string.startsWith('/')
    }
}

// Função para obter URL de imagem segura
function getSafeImageUrl(bannerUrl: string, bannerData?: { url: string } | null): string {
    if (isValidUrl(bannerUrl)) {
        return bannerUrl
    }

    if (bannerData?.url) {
        return bannerData.url
    }

    return "/template.jpg"
}

export default function SearchPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [subdomain] = useState(() => getSubdomainFromHostname())

    const initialSearch = searchParams.get('q') || ""
    const initialCategory = searchParams.get('category') || ""

    const [searchQuery, setSearchQuery] = useState(initialSearch)
    const [selectedCategory, setSelectedCategory] = useState(initialCategory)
    const [currentPage, setCurrentPage] = useState(1)

    // Buscar dados da loja
    const { data: storeData, isLoading: storeLoading, error } = useStoreBySubdomain(subdomain)

    // Buscar dados do banner se bannerUrl não for uma URL válida
    const shouldFetchBanner = storeData && !isValidUrl(storeData.bannerUrl)
    const { data: bannerData } = useBanner(shouldFetchBanner ? storeData.bannerUrl : null)

    // Buscar produtos com filtros - usando o hook específico de pesquisa
    const { data: productsData, isLoading: productsLoading } = useSearchProducts({
        subdomain: subdomain,
        pageSize: 20, // Mais produtos na página de pesquisa
        page: currentPage,
        search: searchQuery || undefined,
        category: selectedCategory !== "all" && selectedCategory !== "" ? selectedCategory : undefined,
        enabled: !!subdomain
    })

    // Loading state
    if (storeLoading) {
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

    // Produtos transformados
    const rawProducts = productsData?.data || []
    const pagination = productsData?.pagination

    const transformProduct = (product: StoreProduct) => ({
        id: product.id,
        name: product.name,
        brand: product.brand,
        category: product.category,
        price: product.price,
        originalPrice: product.catalogPrice > product.price ? product.catalogPrice : undefined,
        image: product.imgUrl || "/template.jpg",
        rating: 4.5,
        reviews: 0,
        stock: product.quantity,
        isNew: true,
        isBestseller: false,
        description: `${product.brand} - ${product.category}`
    })

    const products = rawProducts.map(transformProduct)

    const handleSearch = (query: string) => {
        setSearchQuery(query)
        setCurrentPage(1)

        // Atualizar URL
        const params = new URLSearchParams()
        if (query) params.set('q', query)
        if (selectedCategory && selectedCategory !== "all") params.set('category', selectedCategory)

        router.push(`/search?${params.toString()}`)
    }

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category)
        setCurrentPage(1)

        // Atualizar URL
        const params = new URLSearchParams()
        if (searchQuery) params.set('q', searchQuery)
        if (category && category !== "all") params.set('category', category)

        router.push(`/search?${params.toString()}`)
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const goBack = () => {
        router.back()
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-rose-50 via-white to-amber-50">
            {/* Header da Loja */}
            <header className="bg-white/90 backdrop-blur-sm border-b border-rose-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo e Voltar */}
                        <div className="flex items-center space-x-4">
                            <Button variant="ghost" size="icon" onClick={goBack}>
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                            <div className="flex items-center space-x-3">
                                <div className="relative h-10 w-10 rounded-full overflow-hidden">
                                    <Image
                                        src={getSafeImageUrl(storeData.bannerUrl, bannerData)}
                                        alt={storeData.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h1 className="text-lg font-bold text-gray-900">{storeData.name}</h1>
                                    <p className="text-xs text-gray-500">Pesquisar produtos</p>
                                </div>
                            </div>
                        </div>

                        {/* Ações */}
                        <div className="flex items-center space-x-4">
                            <Button variant="ghost" size="icon">
                                <Heart className="h-5 w-5" />
                            </Button>
                            <Button variant="ghost" size="icon">
                                <ShoppingBag className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Busca e Filtros */}
            <section className="py-6 bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        {/* Busca principal */}
                        <div className="relative flex-1 max-w-2xl">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Buscar produtos..."
                                value={searchQuery}
                                onChange={(e) => handleSearch(e.target.value)}
                                className="pl-9 h-10"
                            />
                        </div>

                        {/* Filtros */}
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <Filter className="h-4 w-4 text-gray-500" />
                                <span className="text-sm text-gray-600">Filtros:</span>
                            </div>

                            <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                                <SelectTrigger className="w-[200px]">
                                    <SelectValue placeholder="Categoria" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todas Categorias</SelectItem>
                                    {storeData.categories.map((category) => (
                                        <SelectItem key={category} value={category}>
                                            {category}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
            </section>

            {/* Resultados */}
            <main className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header dos resultados */}
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            {searchQuery ? `Resultados para "${searchQuery}"` : 'Todos os produtos'}
                        </h2>
                        {pagination && (
                            <p className="text-sm text-gray-600">
                                Mostrando {((currentPage - 1) * pagination.pageSize) + 1} - {Math.min(currentPage * pagination.pageSize, pagination.total)} de {pagination.total} produtos
                                {selectedCategory && selectedCategory !== "all" && selectedCategory !== "" && ` em ${selectedCategory}`}
                            </p>
                        )}
                    </div>

                    {/* Loading dos produtos */}
                    {productsLoading ? (
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
                            <div className="max-w-md mx-auto">
                                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    Nenhum produto encontrado
                                </h3>
                                <p className="text-gray-600">
                                    {searchQuery
                                        ? `Não encontramos produtos para "${searchQuery}". Tente uma busca diferente.`
                                        : 'Não há produtos disponíveis no momento.'
                                    }
                                </p>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Grid de produtos */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                                {products.map((product) => (
                                    <Card key={product.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-md">
                                        <div className="relative">
                                            {/* Badges */}
                                            <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
                                                {product.isNew && (
                                                    <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white">
                                                        Novo
                                                    </Badge>
                                                )}
                                                {product.isBestseller && (
                                                    <Badge className="bg-amber-500 hover:bg-amber-600 text-white">
                                                        Best Seller
                                                    </Badge>
                                                )}
                                            </div>

                                            {/* Botão favoritar */}
                                            <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white">
                                                    <Heart className="h-4 w-4" />
                                                </Button>
                                            </div>

                                            {/* Imagem */}
                                            <div className="relative aspect-4/5 overflow-hidden">
                                                <Image
                                                    src={product.image}
                                                    alt={product.name}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>
                                        </div>

                                        <CardContent className="p-4">
                                            {/* Marca */}
                                            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                                                {product.brand}
                                            </p>

                                            {/* Nome */}
                                            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm leading-tight h-10 flex items-start">
                                                {product.name}
                                            </h3>

                                            {/* Rating */}
                                            <div className="flex items-center gap-1 mb-3 h-4">
                                                <div className="flex items-center">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`h-3 w-3 ${i < Math.floor(product.rating)
                                                                ? 'text-amber-400 fill-current'
                                                                : 'text-gray-300'
                                                                }`}
                                                        />
                                                    ))}
                                                </div>
                                                <span className="text-xs text-gray-500">
                                                    {product.rating} ({product.reviews})
                                                </span>
                                            </div>

                                            {/* Preço */}
                                            <div className="flex items-center gap-2 mb-3 min-h-6">
                                                <span className="font-bold text-gray-900">
                                                    {formatCurrency(product.price)}
                                                </span>
                                                {product.originalPrice && product.originalPrice > product.price && (
                                                    <span className="text-xs text-gray-500 line-through">
                                                        {formatCurrency(product.originalPrice)}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Stock */}
                                            <div className="mb-3 h-4 flex items-center">
                                                {product.stock > 10 ? (
                                                    <span className="text-xs text-emerald-600">
                                                        ✓ Em estoque
                                                    </span>
                                                ) : product.stock > 0 ? (
                                                    <span className="text-xs text-amber-600">
                                                        ⚠ Últimas {product.stock} unidades
                                                    </span>
                                                ) : (
                                                    <span className="text-xs text-red-600">
                                                        ✗ Indisponível
                                                    </span>
                                                )}
                                            </div>

                                            {/* Botão */}
                                            <Button
                                                className="w-full text-white hover:opacity-90"
                                                style={{ backgroundColor: storeData.primaryColor }}
                                                disabled={product.stock === 0}
                                            >
                                                {product.stock === 0 ? 'Indisponível' : 'Adicionar ao Carrinho'}
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            {/* Paginação */}
                            {pagination && pagination.totalPages > 1 && (
                                <div className="flex justify-center items-center gap-2">
                                    <Button
                                        variant="outline"
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                    >
                                        Anterior
                                    </Button>

                                    <div className="flex items-center gap-1">
                                        {[...Array(pagination.totalPages)].map((_, i) => {
                                            const page = i + 1
                                            if (
                                                page === 1 ||
                                                page === pagination.totalPages ||
                                                (page >= currentPage - 2 && page <= currentPage + 2)
                                            ) {
                                                return (
                                                    <Button
                                                        key={page}
                                                        variant={currentPage === page ? "default" : "outline"}
                                                        size="sm"
                                                        onClick={() => handlePageChange(page)}
                                                        style={currentPage === page ? { backgroundColor: storeData.primaryColor } : {}}
                                                    >
                                                        {page}
                                                    </Button>
                                                )
                                            } else if (
                                                page === currentPage - 3 ||
                                                page === currentPage + 3
                                            ) {
                                                return <span key={page} className="px-2">...</span>
                                            }
                                            return null
                                        })}
                                    </div>

                                    <Button
                                        variant="outline"
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === pagination.totalPages}
                                    >
                                        Próxima
                                    </Button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>
        </div>
    )
}