'use client'

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
    Trash2,
    Plus,
    Minus,
    ShoppingBag,
    ArrowLeft,
    Tag,
} from "lucide-react"
import { formatCurrency } from "@/lib/format-currency"
import { useCart } from "@/app/context/cart-context"
import { useStoreBySubdomain } from "../hooks/use-store"

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

export default function CartPage() {
    const [subdomain] = useState(() => getSubdomainFromHostname())
    const [couponCode, setCouponCode] = useState("")
    const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null)

    const { items, removeItem, updateQuantity, totalPrice } = useCart()
    const { data: storeData, isLoading } = useStoreBySubdomain(subdomain)

    // Calcular valores
    const subtotal = totalPrice
    const discount = appliedCoupon ? (subtotal * appliedCoupon.discount) / 100 : 0
    const shipping = subtotal > 200 ? 0 : 15 // Frete grátis acima de R$200
    const total = subtotal - discount + shipping

    const handleApplyCoupon = () => {
        // Simulação - integrar com backend depois
        if (couponCode.toUpperCase() === "DESCONTO10") {
            setAppliedCoupon({ code: couponCode, discount: 10 })
        } else {
            alert("Cupom inválido")
        }
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Carregando...</p>
                </div>
            </div>
        )
    }

    if (!storeData) {
        return null
    }

    // Agrupar itens por marca para exibir como no mock
    const groupedItems = items.reduce<Record<string, typeof items>>((acc, item) => {
        if (!acc[item.brand]) acc[item.brand] = []
        acc[item.brand].push(item)
        return acc
    }, {})

    // Carrinho vazio
    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50">
                <main className="py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
                                <ShoppingBag className="h-12 w-12 text-gray-400" />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                Seu carrinho está vazio
                            </h1>
                            <p className="text-gray-600 mb-8">
                                Adicione produtos ao carrinho para continuar comprando
                            </p>
                            <Link href="/">
                                <Button
                                    size="lg"
                                    className="text-white"
                                    style={{ backgroundColor: storeData.primaryColor }}
                                >
                                    <ArrowLeft className="mr-2 h-5 w-5" />
                                    Continuar Comprando
                                </Button>
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white">
            <main className="py-8">
                <div className="max-w-2xl mx-auto px-4">
                    
                    {/* Resumo do Carrinho - Card Principal */}
                    <div className="bg-white rounded-xl  overflow-hidden">
                        
                        {/* Cabeçalho */}
                        <div className=" px-6 py-5 border-b border-gray-200 flex items-center justify-between">
                            <h1 className="text-lg font-bold text-gray-900">
                                Seu carrinho tem {items.length} {items.length === 1 ? 'item' : 'itens'}
                            </h1>

                        </div>

                        {/* Produtos */}
                        <div className="px-6 py-5 space-y-4 max-h-96 overflow-y-auto">
                            {Object.entries(groupedItems).map(([brand, brandItems]) =>
                                brandItems.map((item) => (
                                    <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                                        {/* Imagem com botão de excluir sobreposto */}
                                        <div className="relative w-20 sm:w-24 h-20 sm:h-24 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="absolute top-1 right-1 p-1.5 bg-white rounded-full text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors shadow-sm"
                                                aria-label="Remover item"
                                            >
                                                <Trash2 className="h-3.5 w-3.5" />
                                            </button>
                                        </div>

                                        {/* Conteúdo */}
                                        <div className="flex-1 flex flex-col justify-between min-w-0">
                                            <div>
                                                <h3 className="font-bold text-gray-900 line-clamp-2 text-xs sm:text-sm mb-1">
                                                    {item.name}
                                                </h3>
                                            </div>

                                            {/* Preço e Quantidade */}
                                            <div className="flex items-end justify-between gap-2 sm:gap-3">
                                                <p className="text-sm sm:text-base font-bold text-gray-900">
                                                    {formatCurrency(item.price * item.quantity)}
                                                </p>

                                                {/* Controles */}
                                                <div className="flex items-center gap-1 sm:gap-2">
                                                    <button 
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        disabled={item.quantity <= 1}
                                                        className="flex items-center justify-center w-6 sm:w-7 h-6 sm:h-7 rounded border border-gray-300 text-gray-600 hover:border-gray-400 transition-colors disabled:opacity-50 text-sm"
                                                    >
                                                        −
                                                    </button>
                                                    <span className="w-5 sm:w-6 text-center font-semibold text-gray-900 text-xs sm:text-sm">
                                                        {item.quantity}
                                                    </span>
                                                    <button 
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        disabled={item.quantity >= item.stock}
                                                        className="flex items-center justify-center w-6 sm:w-7 h-6 sm:h-7 rounded transition-colors disabled:opacity-50 text-sm"
                                                        style={{ 
                                                            borderColor: storeData.primaryColor, 
                                                            borderWidth: '2px',
                                                            color: storeData.primaryColor
                                                        }}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))

                            )}
                        </div>

                        {/* Total */}
                        <div className="px-6 py-5 bg-white border-t border-gray-200">
                            <div className="flex items-center justify-between mb-6">
                                <span className="text-lg font-bold text-gray-900">Total:</span>
                                <span className="text-3xl font-bold" style={{ color: storeData.primaryColor }}>
                                    {formatCurrency(total)}
                                </span>
                            </div>

                            {/* Cupom */}
                            {/* <div className="mb-4 text-center">
                                <button 
                                    onClick={() => {/* abrir modal de cupom}
                                    className="inline-flex items-center gap-2 font-semibold transition-opacity hover:opacity-70"
                                    style={{ color: storeData.primaryColor }}
                                >
                                    <Tag className="h-4 w-4" />
                                    Adicionar cupom
                                </button>
                            </div> */}

                            {/* Botão Finalizar */}
                            <Link href="/checkout">
                                <Button
                                    size="lg"
                                    className="w-full text-white font-bold text-base py-6 rounded-lg"
                                    style={{ backgroundColor: storeData.primaryColor }}
                                >
                                    Finalizar compra
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
