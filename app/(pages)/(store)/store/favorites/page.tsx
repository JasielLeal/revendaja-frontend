'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    Heart,
    ShoppingBag,
    ArrowLeft,
    Trash2,
} from "lucide-react"
import { formatCurrency } from "@/lib/format-currency"
import { useStoreBySubdomain } from "../../hooks/use-store"
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

export default function FavoritesPage() {
    const router = useRouter()
    const [subdomain] = useState(() => getSubdomainFromHostname())
    const [favorites, setFavorites] = useState<FavoriteProduct[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const { data: storeData } = useStoreBySubdomain(subdomain)
    const { addItem } = useCart()

    // Carregar favoritos do localStorage
    useEffect(() => {
        if (typeof window === 'undefined') return

        const savedFavorites = localStorage.getItem('favorites')
        if (savedFavorites) {
            try {
                const parsed = JSON.parse(savedFavorites)
                Promise.resolve().then(() => {
                    setFavorites(parsed)
                    setIsLoading(false)
                })
            } catch (error) {
                console.error('Erro ao carregar favoritos:', error)
                Promise.resolve().then(() => setIsLoading(false))
            }
        } else {
            Promise.resolve().then(() => setIsLoading(false))
        }
    }, [])

    // Remover dos favoritos
    const handleRemoveFavorite = (productId: string) => {
        const updated = favorites.filter(fav => fav.id !== productId)
        setFavorites(updated)
        localStorage.setItem('favorites', JSON.stringify(updated))
    }

    // Limpar todos os favoritos
    const handleClearAll = () => {
        setFavorites([])
        localStorage.removeItem('favorites')
    }

    if (isLoading || !storeData) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderBottomColor: storeData?.primaryColor }}></div>
                    <p className="text-gray-600">Carregando favoritos...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Cabeçalho */}
                    <div className="mb-8">

                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                                    <Heart className="h-8 w-8 fill-red-500 text-red-500" />
                                    Meus Favoritos
                                </h1>
                                <p className="text-gray-600 mt-2">
                                    {favorites.length} produto{favorites.length !== 1 ? 's' : ''} salvo{favorites.length !== 1 ? 's' : ''}
                                </p>
                            </div>

                            {favorites.length > 0 && (
                                <Button
                                    variant="outline"
                                    className="text-red-600 border-red-200 hover:bg-red-50"
                                    onClick={handleClearAll}
                                >
                                    Limpar Favoritos
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Conteúdo */}
                    {favorites.length === 0 ? (
                        <Card className="text-center p-12">
                            <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">Nenhum favorito salvo</h2>
                            <p className="text-gray-600 mb-6">Adicione produtos à sua lista de favoritos para acessá-los depois</p>
                            <Link href="/search">
                                <Button
                                    size="lg"
                                    className="text-white"
                                    style={{ backgroundColor: storeData.primaryColor }}
                                >
                                    Continuar Comprando
                                </Button>
                            </Link>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {favorites.map((product) => (
                                <Card key={product.id} className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-gray-300 bg-white">
                                    <div className="relative">
                                        {/* Badges */}
                                        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                                            {product.isNew && (
                                                <Badge className="text-white text-xs font-semibold px-2 py-1" style={{ background: storeData.primaryColor }}>
                                                    NOVO
                                                </Badge>
                                            )}
                                            {product.originalPrice && product.originalPrice > product.price && (
                                                <Badge className="bg-green-500 text-white text-xs font-semibold px-2 py-1">
                                                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                                                </Badge>
                                            )}
                                        </div>

                                        {/* Botão remover favorito */}
                                        <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="bg-white/80 hover:bg-red-50 hover:text-red-600"
                                                onClick={() => handleRemoveFavorite(product.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
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

                                    <CardContent className="p-4">
                                        {/* Marca */}
                                        <p className="text-xs text-gray-500 font-medium mb-1">{product.brand}</p>

                                        {/* Nome */}
                                        <p className="font-semibold text-gray-900 text-sm mb-3 line-clamp-2 min-h-10">
                                            {product.name}
                                        </p>



                                        {/* Preço */}
                                        <div className="mb-4">
                                            {product.originalPrice && product.originalPrice > product.price ? (
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-bold text-gray-900">
                                                        {formatCurrency(product.price)}
                                                    </span>
                                                    <span className="text-xs text-gray-400 line-through">
                                                        {formatCurrency(product.originalPrice)}
                                                    </span>
                                                </div>
                                            ) : (
                                                <span className="text-lg font-bold text-gray-900">
                                                    {formatCurrency(product.price)}
                                                </span>
                                            )}
                                        </div>

                                        {/* Botão comprar */}
                                        <Button
                                            size="sm"
                                            className="w-full text-white font-medium gap-2"
                                            style={{ backgroundColor: storeData.primaryColor }}
                                            onClick={() => {
                                                addItem({
                                                    id: product.id,
                                                    name: product.name,
                                                    brand: product.brand,
                                                    price: product.price,
                                                    image: product.image,
                                                    stock: product.stock,
                                                })
                                            }}
                                        >
                                            <ShoppingBag className="h-4 w-4" />
                                            Adicionar ao Carrinho
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
