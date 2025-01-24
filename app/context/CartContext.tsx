'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';
import Cookies from 'universal-cookie';

interface Product {
    id: string;
    name: string
    imgUrl: string;
    value: string
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
        if (storedCart) {
            setCart((storedCart));
        }
    }, []);

    useEffect(() => {
        const cookie = new Cookies();
        cookie.set('cart', JSON.stringify(cart), { expires: new Date(Date.now() + 60 * 60 * 24 * 365 * 1000) });
    }, [cart]);

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
        setCart([]);
    };

    const removeFromCart = (productId: string) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };


    return (
        <CartContext.Provider value={{ cart, addToCart, clearCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};