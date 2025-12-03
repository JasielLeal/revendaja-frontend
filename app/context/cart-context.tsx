'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export interface CartItem {
    id: string
    name: string
    brand: string
    price: number
    originalPrice?: number
    image: string
    quantity: number
    stock: number
}

interface CartContextType {
    items: CartItem[]
    addItem: (item: Omit<CartItem, 'quantity'>, goToCart?: boolean) => void
    removeItem: (id: string) => void
    updateQuantity: (id: string, quantity: number) => void
    clearCart: () => void
    totalItems: number
    totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter()

    // Inicializar com localStorage diretamente
    const [items, setItems] = useState<CartItem[]>(() => {
        if (typeof window === 'undefined') return []

        const savedCart = localStorage.getItem('cart')
        if (savedCart) {
            try {
                return JSON.parse(savedCart)
            } catch (error) {
                console.error('Erro ao carregar carrinho:', error)
                return []
            }
        }
        return []
    })

    // Salvar carrinho no localStorage sempre que mudar
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(items))
    }, [items])

    const addItem = (newItem: Omit<CartItem, 'quantity'>, goToCart = true) => {
        setItems(prev => {
            const existingItem = prev.find(item => item.id === newItem.id)

            if (existingItem) {
                // Se já existe, incrementa quantidade
                return prev.map(item =>
                    item.id === newItem.id
                        ? { ...item, quantity: Math.min(item.quantity + 1, item.stock) }
                        : item
                )
            }

            // Se não existe, adiciona novo item
            return [...prev, { ...newItem, quantity: 1 }]
        })

        // Redirecionar para o carrinho se goToCart for true
        if (goToCart) {
            router.push('/cart')
        }
    }

    const removeItem = (id: string) => {
        setItems(prev => prev.filter(item => item.id !== id))
    }

    const updateQuantity = (id: string, quantity: number) => {
        if (quantity <= 0) {
            removeItem(id)
            return
        }

        setItems(prev =>
            prev.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.min(quantity, item.stock) }
                    : item
            )
        )
    }

    const clearCart = () => {
        setItems([])
    }

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                totalItems,
                totalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error('useCart deve ser usado dentro de CartProvider')
    }
    return context
}
