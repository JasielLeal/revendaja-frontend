'use client'

import { useState, useEffect, useRef } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import {
    Heart,
    Search,
    Filter,
    X,
    ChevronDown
} from "lucide-react"
import { formatCurrency } from "@/lib/format-currency"
import { useStoreBySubdomain } from "../hooks/use-store"
import { useInfinitSearchProducts } from "./hooks/use-infinite-search-products"
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

export default function SearchPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [subdomain] = useState(() => getSubdomainFromHostname())
    const { addItem } = useCart()
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

    // Ler diretamente da URL ao invés de usar estado
    const searchQuery = searchParams.get('q') || ""
    const selectedCategory = searchParams.get('category') || ""

    const [sortBy, setSortBy] = useState<string>("relevance")
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
    const [selectedBrands, setSelectedBrands] = useState<string[]>([])
    const [showMobileFilters, setShowMobileFilters] = useState(false)
    const observerTarget = useRef<HTMLDivElement>(null)

    // Buscar dados da loja
    const { data: storeData, isLoading: storeLoading, error } = useStoreBySubdomain(subdomain)

    // Buscar produtos com infinite scroll
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading: productsLoading,
    } = useInfinitSearchProducts(
        subdomain,
        9,
        searchQuery || undefined,
        selectedCategory !== "all" && selectedCategory !== "" ? selectedCategory : undefined
    )

    // Combinar todos os produtos de todas as páginas
    const allProducts = data?.pages.flatMap(page => page.data) ?? []
    const totalProducts = data?.pages[0]?.pagination.total ?? 0
    // Observer para infinite scroll
    useEffect(() => {
        const target = observerTarget.current

        if (!target) {
            return
        }

        const observer = new IntersectionObserver(
            (entries) => {

                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {

                    fetchNextPage()
                }
            },
            { threshold: 0.1 }
        )

        observer.observe(target)

        return () => {
            observer.disconnect()
        }
    }, [fetchNextPage, hasNextPage, isFetchingNextPage])

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
    interface RawProduct {
        id: string
        name: string
        brand: string
        category: string
        price: number
        catalogPrice: number
        imgUrl?: string
        quantity: number
    }

    const transformProduct = (product: RawProduct) => ({
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

    const products = allProducts.map(transformProduct)

    // Extrair marcas únicas dos produtos
    const uniqueBrands = Array.from(new Set(allProducts.map((p: RawProduct) => p.brand))).sort()

    const handleCategoryChange = (category: string) => {
        // Atualizar URL
        const params = new URLSearchParams()
        if (searchQuery) params.set('q', searchQuery)
        if (category && category !== "all") params.set('category', category)

        router.push(`/search?${params.toString()}`)
    }

    const handleBrandToggle = (brand: string) => {
        setSelectedBrands(prev =>
            prev.includes(brand)
                ? prev.filter(b => b !== brand)
                : [...prev, brand]
        )
    }

    const clearFilters = () => {
        setSelectedBrands([])
        setPriceRange([0, 1000])

        // Atualizar URL removendo filtros
        const params = new URLSearchParams()
        if (searchQuery) params.set('q', searchQuery)

        router.push(`/search?${params.toString()}`)
    }

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Resultados */}
            <main className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Layout com Sidebar */}
                    <div className="flex gap-8">

                        {/* Sidebar de Filtros - Desktop */}
                        <aside className="hidden lg:block w-64 shrink-0">
                            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">

                                {/* Header dos Filtros */}
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="font-bold text-lg text-gray-900">Filtros</h3>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={clearFilters}
                                        className="text-sm text-gray-600 hover:text-gray-900"
                                    >
                                        Limpar
                                    </Button>
                                </div>

                                <Separator className="mb-6" />

                                {/* Categorias */}
                                <div className="mb-6">
                                    <h4 className="font-semibold text-sm text-gray-900 mb-3">Categorias</h4>
                                    <div className="space-y-2">
                                        <button
                                            onClick={() => handleCategoryChange("")}
                                            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${!selectedCategory || selectedCategory === "all"
                                                ? 'bg-gray-100 font-medium text-gray-900'
                                                : 'text-gray-600 hover:bg-gray-50'
                                                }`}
                                        >
                                            Todas as categorias
                                        </button>
                                        {storeData.categories.map((category) => (
                                            <button
                                                key={category}
                                                onClick={() => handleCategoryChange(category)}
                                                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${selectedCategory === category
                                                    ? 'bg-gray-100 font-medium text-gray-900'
                                                    : 'text-gray-600 hover:bg-gray-50'
                                                    }`}
                                            >
                                                {category}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <Separator className="mb-6" />

                                {/* Marcas */}
                                <div className="mb-6">
                                    <h4 className="font-semibold text-sm text-gray-900 mb-3">Marcas</h4>
                                    <div className="space-y-2 max-h-64 overflow-y-auto">
                                        {uniqueBrands.map((brand) => (
                                            <label
                                                key={brand}
                                                className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-2 py-1.5 rounded-md transition-colors"
                                            >
                                                <Checkbox
                                                    checked={selectedBrands.includes(brand)}
                                                    onCheckedChange={() => handleBrandToggle(brand)}
                                                />
                                                <span className="text-sm text-gray-700">{brand}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <Separator className="mb-6" />

                                {/* Faixa de Preço */}
                                <div>
                                    <h4 className="font-semibold text-sm text-gray-900 mb-3">Faixa de Preço</h4>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-sm text-gray-600">
                                            <span>{formatCurrency(priceRange[0])}</span>
                                            <span>{formatCurrency(priceRange[1])}</span>
                                        </div>
                                        <Input
                                            type="range"
                                            min="0"
                                            max="1000"
                                            value={priceRange[1]}
                                            onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                                            className="w-full"
                                        />
                                    </div>
                                </div>

                            </div>
                        </aside>

                        {/* Conteúdo Principal */}
                        <div className="flex-1 min-w-0">

                            {/* Header dos Resultados */}
                            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 mb-1">
                                            {searchQuery ? `Resultado de busca para "${searchQuery}"` : 'Todos os produtos'}
                                        </h2>
                                        {totalProducts > 0 && (
                                            <p className="text-sm text-gray-600">
                                                Mostrando {allProducts.length} de {totalProducts} produtos
                                            </p>
                                        )}
                                    </div>

                                    {/* Ordenação */}
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm text-gray-600 whitespace-nowrap">Ordenar por:</span>
                                        <Select value={sortBy} onValueChange={setSortBy}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="relevance">Relevância</SelectItem>
                                                <SelectItem value="price-asc">Menor preço</SelectItem>
                                                <SelectItem value="price-desc">Maior preço</SelectItem>
                                                <SelectItem value="name-asc">Nome A-Z</SelectItem>
                                                <SelectItem value="name-desc">Nome Z-A</SelectItem>
                                                <SelectItem value="newest">Mais recentes</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* Filtros Aplicados */}
                                {(selectedBrands.length > 0 || selectedCategory) && (
                                    <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
                                        {selectedCategory && (
                                            <Badge variant="secondary" className="gap-1">
                                                Categoria: {selectedCategory}
                                                <X
                                                    className="h-3 w-3 cursor-pointer"
                                                    onClick={() => handleCategoryChange("")}
                                                />
                                            </Badge>
                                        )}
                                        {selectedBrands.map((brand) => (
                                            <Badge key={brand} variant="secondary" className="gap-1">
                                                {brand}
                                                <X
                                                    className="h-3 w-3 cursor-pointer"
                                                    onClick={() => handleBrandToggle(brand)}
                                                />
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Botão Filtros Mobile */}
                            <div className="lg:hidden mb-4">
                                <Button
                                    variant="outline"
                                    className="w-full justify-center gap-2"
                                    onClick={() => setShowMobileFilters(!showMobileFilters)}
                                >
                                    <Filter className="h-4 w-4" />
                                    Filtros
                                    <ChevronDown className={`h-4 w-4 transition-transform ${showMobileFilters ? 'rotate-180' : ''}`} />
                                </Button>
                            </div>

                            {/* Loading dos produtos */}
                            {productsLoading ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                        {products.map((product) => (
                                            <Card key={product.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-md">
                                                <div className="relative">
                                                    {/* Badges */}
                                                    <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
                                                        {product.isNew && (
                                                            <Badge className="text-white" style={{ background: storeData.primaryColor }}>
                                                                Novo
                                                            </Badge>
                                                        )}
                                                        {product.isBestseller && (
                                                            <Badge className="text-white" style={{ background: storeData.primaryColor }}>
                                                                Best Seller
                                                            </Badge>
                                                        )}
                                                    </div>

                                                    {/* Botão favoritar */}
                                                    <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="hover:bg-white"
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
                                                    <div className="relative aspect-square overflow-hidden">
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
                                                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm leading-tight h-12 flex items-start">
                                                        {product.name}
                                                    </h3>



                                                    {/* Preço */}
                                                    <div className="flex items-center gap-2 mb-3 h-14">
                                                        <div className="flex flex-col">
                                                            <span className="font-bold text-gray-900 text-lg">
                                                                {formatCurrency(product.price)}
                                                            </span>
                                                            {product.originalPrice && product.originalPrice > product.price && (
                                                                <div className="flex items-center gap-2">
                                                                    <span className="text-xs text-gray-400 line-through">
                                                                        {formatCurrency(product.originalPrice)}
                                                                    </span>
                                                                    <Badge variant="secondary" className="bg-green-50 text-green-600 text-xs px-1.5 py-0">
                                                                        Economize {formatCurrency(product.originalPrice - product.price)}
                                                                    </Badge>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Botão */}
                                                    <Button
                                                        className="w-full text-white hover:opacity-90"
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
                                                        {product.stock === 0 ? 'Indisponível' : 'Adicionar ao Carrinho'}
                                                    </Button>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>

                                    {/* Observer para Infinite Scroll */}
                                    <div ref={observerTarget} className="w-full py-8 flex justify-center min-h-[100px]">
                                        {isFetchingNextPage && (
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-300 border-t-gray-600"></div>
                                                <span className="text-sm">Carregando mais produtos...</span>
                                            </div>
                                        )}
                                        {!hasNextPage && allProducts.length > 0 && (
                                            <p className="text-sm text-gray-500">Você viu todos os produtos</p>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}