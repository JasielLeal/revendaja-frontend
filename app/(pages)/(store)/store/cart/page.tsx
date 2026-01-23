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
        <div className="min-h-screen bg-gray-50">
            <main className="py-4 pb-28">

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Cabeçalho */}
                    <div className="mb-2">

                        <h1 className="text-md md:text-4xl text-center font-bold text-gray-900">
                            Carrinho de Compras
                        </h1>
                    </div>

                    {/* Progress indicator (responsive) */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
                        <div className="flex items-center justify-center gap-6">
                            {['Carrinho', 'Confirmação', 'Finalizar'].map((step, i) => {
                                const stepIndex = i + 1
                                const active = stepIndex === 1
                                return (
                                    <div key={step} className="flex items-center gap-3">
                                        <div
                                            className={`flex items-center justify-center rounded-full ${active ? 'w-8 h-8 scale-100' : 'w-7 h-7 scale-95'} transition-all duration-300 ${active ? '' : ''}`}
                                            style={active ? { background: storeData.primaryColor } : { background: '#E6E6E6' }}
                                        >
                                            <span className={`text-white text-xs font-semibold`}>{stepIndex}</span>
                                        </div>
                                        <div className="sm:block text-xs text-gray-600">{step}</div>
                                        {i < 2 && <div className="hidden sm:block w-12 h-[2px]" style={{ background: '#E6E6E6' }} />}
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Lista de Produtos agrupada por marca */}
                        <div className="lg:col-span-2 space-y-6">
                            {Object.entries(groupedItems).map(([brand, brandItems]) => (
                                <div key={brand}>
                                    <div>
                                        {brandItems.map((item) => (
                                            <div key={item.id} className="overflow-hidden">
                                                <div>
                                                    <div className="flex gap-6">
                                                        {/* Imagem */}
                                                        <div className="relative w-16 h-16 shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                                                            <Image
                                                                src={item.image}
                                                                alt={item.name}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        </div>

                                                        {/* Informações */}
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex justify-between gap-4 mb-2">
                                                                <div>

                                                                    <h3 className="font-semibold text-gray-900 line-clamp-2 text-xs">
                                                                        {item.name}
                                                                    </h3>
                                                                    <p className="text-xs text-gray-500 mb-1">
                                                                        {item.brand}
                                                                    </p>
                                                                </div>
                                                            </div>

                                                            <div className="flex items-end justify-between mt-4">

                                                                {/* Preço */}
                                                                <div>
                                                                    {item.originalPrice && item.originalPrice > item.price && (
                                                                        <p className="text-xs text-gray-400 line-through">
                                                                            {formatCurrency(item.originalPrice * item.quantity)}
                                                                        </p>
                                                                    )}
                                                                    <p className="text-sm font-bold text-gray-900">
                                                                        {formatCurrency(item.price * item.quantity)}
                                                                    </p>
                                                                </div>

                                                                {/* Controle de Quantidade */}
                                                                <div className="flex items-center gap-3">
                                                                    <div className="flex items-center border rounded-lg">
                                                                        <Button
                                                                            variant="ghost"
                                                                            size="sm"
                                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                            disabled={item.quantity <= 1}
                                                                            className="h-9 w-9 p-0 sm:h-8 sm:w-8"
                                                                        >
                                                                            <Minus className="h-3 w-3" />
                                                                        </Button>
                                                                        <span className="w-12 text-center text-sm font-medium">
                                                                            {item.quantity}
                                                                        </span>
                                                                        <Button
                                                                            variant="ghost"
                                                                            size="sm"
                                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                            disabled={item.quantity >= item.stock}
                                                                            className="h-9 w-9 p-0 sm:h-8 sm:w-8"
                                                                        >
                                                                            <Plus className="h-3 w-3" />
                                                                        </Button>
                                                                    </div>
                                                                    {item.quantity >= item.stock && (
                                                                        <span className="text-xs text-amber-600">
                                                                            Estoque máximo
                                                                        </span>
                                                                    )}
                                                                </div>


                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Resumo do Pedido */}
                        <div className="lg:col-span-1 hidden lg:block">
                            <div className="sticky top-24 space-y-4">

                                {/* Card Resumo */}
                                <Card>
                                    <CardContent className="p-6">
                                        <h2 className="text-lg font-bold text-gray-900 mb-4">
                                            Resumo do Pedido
                                        </h2>

                                        <div className="space-y-3 mb-4">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">Subtotal</span>
                                                <span className="font-medium">{formatCurrency(subtotal)}</span>
                                            </div>

                                            {appliedCoupon && (
                                                <div className="flex justify-between text-sm text-green-600">
                                                    <span>Desconto ({appliedCoupon.code})</span>
                                                    <span>-{formatCurrency(discount)}</span>
                                                </div>
                                            )}

                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">Frete</span>
                                                <span className={`font-medium ${shipping === 0 ? 'text-green-600' : ''}`}>
                                                    {shipping === 0 ? 'Grátis' : formatCurrency(shipping)}
                                                </span>
                                            </div>

                                            {shipping > 0 && (
                                                <p className="text-xs text-amber-600">
                                                    Falta {formatCurrency(200 - subtotal)} para frete grátis
                                                </p>
                                            )}
                                        </div>

                                        <Separator className="my-4" />

                                        <div className="flex justify-between mb-6">
                                            <span className="text-lg font-bold text-gray-900">Total</span>
                                            <span className="text-2xl font-bold" style={{ color: storeData.primaryColor }}>
                                                {formatCurrency(total)}
                                            </span>
                                        </div>

                                        <Link href="/checkout">
                                            <Button
                                                size="lg"
                                                className="w-full text-white mb-3"
                                                style={{ backgroundColor: storeData.primaryColor }}
                                            >
                                                Finalizar Compra
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>

                                {/* Card Cupom */}
                                <Card>
                                    <CardContent className="p-6">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Tag className="h-4 w-4 text-gray-600" />
                                            <h3 className="font-semibold text-gray-900">Cupom de Desconto</h3>
                                        </div>
                                        <div className="flex gap-2">
                                            <Input
                                                placeholder="Digite o cupom"
                                                value={couponCode}
                                                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                                disabled={!!appliedCoupon}
                                            />
                                            <Button
                                                onClick={handleApplyCoupon}
                                                disabled={!couponCode || !!appliedCoupon}
                                                style={{ backgroundColor: storeData.primaryColor }}
                                                className="text-white"
                                            >
                                                Aplicar
                                            </Button>
                                        </div>
                                        {appliedCoupon && (
                                            <Badge variant="secondary" className="mt-2 bg-green-50 text-green-700">
                                                Cupom aplicado: {appliedCoupon.discount}% OFF
                                            </Badge>
                                        )}
                                    </CardContent>
                                </Card>

                            </div>
                        </div>

                    </div>
                </div>
                {/* Mobile fixed checkout bar */}
                <div className="lg:hidden fixed inset-x-0 bottom-0 border-t bg-white p-3 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                        <div>
                            <div className="text-sm text-gray-600">Total</div>
                            <div className="text-lg font-bold" style={{ color: storeData.primaryColor }}>{formatCurrency(total)}</div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link href="/checkout">
                                <button className="relative inline-flex items-center px-4 py-2 rounded-full text-white font-semibold shadow-md" style={{ backgroundColor: storeData.primaryColor }} aria-label="Finalizar compra">
                                    Finalizar
                                    <span className="ml-3 inline-flex items-center justify-center rounded-full w-6 h-6 font-bold shadow-sm" style={{ background: '#FFFFFF', color: storeData.primaryColor }}>
                                        {items.length}
                                    </span>
                                </button>
                            </Link>
                            <Link href="/store">
                                <Button variant="outline" className="hidden sm:inline-flex">Continuar</Button>
                            </Link>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    )
}
