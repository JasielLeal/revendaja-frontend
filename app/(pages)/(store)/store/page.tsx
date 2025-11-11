'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
    Heart,
    Search,
    ShoppingBag,
    Star,
    MapPin,
    Phone,
    Clock,
    Instagram,
    Facebook
} from "lucide-react"
import { formatCurrency } from "@/lib/format-currency"
import { useStoreBySubdomain } from "./hooks/use-store"
import { useBanner } from "./hooks/use-banner"
import { useStoreProducts, type StoreProduct } from "./hooks/use-store-products"

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
    if (!string) return false
    try {
        new URL(string)
        return true
    } catch {
        // Se não é URL absoluta, verificar se pelo menos começa com /
        return string.startsWith('/')
    }
}

// Função para obter URL de imagem segura
function getSafeImageUrl(bannerUrl: string, bannerData?: { url: string } | null): string {
    if (isValidUrl(bannerUrl)) {
        return bannerUrl
    }

    // Se temos dados do banner da API, usar a URL retornada
    if (bannerData?.url) {
        return bannerData.url
    }

    // Se bannerUrl é apenas uma cor ou string inválida, usar imagem padrão
    return "/template.jpg"
}

export default function StoreTemplate() {
    const router = useRouter()
    const [subdomain] = useState(() => getSubdomainFromHostname())
    const [searchQuery, setSearchQuery] = useState("")

    // Função para lidar com pesquisa
    const handleSearch = (query: string) => {
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query.trim())}`)
        }
    }

    // Buscar dados da loja
    const { data: storeData, isLoading, error } = useStoreBySubdomain(subdomain)

    // Buscar dados do banner se bannerUrl não for uma URL válida
    const shouldFetchBanner = storeData && !isValidUrl(storeData.bannerUrl)
    const { data: bannerData } = useBanner(shouldFetchBanner ? storeData.bannerUrl : null)

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
        <div className="min-h-screen bg-linear-to-br from-rose-50 via-white to-amber-50">
            {/* Header da Loja */}
            <header className="bg-white/90 backdrop-blur-sm border-b border-rose-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
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
                                <p className="text-xs text-gray-500">@{storeData.subdomain}</p>
                            </div>
                        </div>

                        {/* Busca e Ações */}
                        <div className="flex items-center space-x-4">
                            {/* Busca */}
                            <div className="relative">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Buscar produtos..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleSearch(searchQuery)
                                        }
                                    }}
                                    className="pl-9 w-80"
                                />
                            </div>

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

            {/* Banner Hero */}
            <section className="relative h-[400px] overflow-hidden">
                <Image
                    src={getSafeImageUrl(storeData.bannerUrl, bannerData)}
                    alt="Banner da loja"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/30 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-start">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                        <div className="max-w-lg">
                            <h2 className="text-4xl font-bold text-white mb-4">
                                Bem-vindo à {storeData.name}
                            </h2>
                            <p className="text-xl text-white/90 mb-6">
                                Descubra nossa seleção exclusiva de produtos
                            </p>
                            <div className="flex items-center gap-4 text-white/80 text-sm mb-6">
                                <div className="flex items-center gap-1">
                                    <MapPin className="h-4 w-4" />
                                    {storeData.address}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Phone className="h-4 w-4" />
                                    {storeData.phone}
                                </div>
                            </div>
                            <Button size="lg" style={{ backgroundColor: storeData.primaryColor }} className="text-white hover:opacity-90">
                                Explorar Produtos
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Stats da loja */}
                    <div className="text-center">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-4">
                                <div className="text-2xl font-bold" style={{ color: storeData.primaryColor }}>
                                    {storeData.totalProducts}
                                </div>
                                <div className="text-sm text-gray-600">Produtos disponíveis</div>
                            </div>
                            <div className="p-4">
                                <div className="text-2xl font-bold" style={{ color: storeData.primaryColor }}>
                                    {storeData.categories.length}
                                </div>
                                <div className="text-sm text-gray-600">Categorias</div>
                            </div>
                            <div className="p-4">
                                <div className="text-2xl font-bold" style={{ color: storeData.primaryColor }}>
                                    @{storeData.subdomain}
                                </div>
                                <div className="text-sm text-gray-600">Nossa loja online</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Separator />

            {/* Grid de Produtos */}
            <main className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Produtos em Destaque
                        </h2>
                        <Button
                            variant={'link'}
                            onClick={() => router.push('/search')}
                        >
                            Ver todos
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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

                                        {/* Botões de Ação */}
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