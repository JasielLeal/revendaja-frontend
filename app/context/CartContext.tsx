'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';
import Cookies from 'universal-cookie';

export interface Product {
    id: string;
    name: string;
    imgUrl: string;
    value: string;
    quantity: number;
    quantityInStock?: number;
}

interface CartContextType {
    cart: Product[];
    clearCart: () => void;
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<Product[]>([]);

    useEffect(() => {
        const cookie = new Cookies();
        const storedCart = cookie.get('cart');

        try {
            if (storedCart) {
                const parsedCart = JSON.parse(storedCart);
                if (Array.isArray(parsedCart)) {
                    setCart(parsedCart);
                }
            }
        } catch (error) {
            console.error("Erro ao carregar o carrinho:", error);
        }
    }, []); // ✅ Só roda ao carregar a página

    useEffect(() => {
        const cookie = new Cookies();

        if (cart.length > 0) {
            cookie.set('cart', JSON.stringify(cart), {
                expires: new Date(Date.now() + 60 * 60 * 24 * 365 * 1000),
            });
        } else if (cart.length === 0) {
            cookie.remove('cart');
        }
    }, [cart]); // ✅ Só salva se o estado realmente mudou

    const addToCart = (product: Product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => item.id === product.id);
            if (existingProduct) {
                return prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + product.quantity } : item
                );
            }
            return [...prevCart, product];
        });
    };

    const clearCart = () => {
        setCart((prevCart) => {
            if (prevCart.length === 0) return prevCart; // ✅ Impede re-renderização desnecessária
            return [];
        });
    };

    const removeFromCart = (productId: string) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, clearCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
