'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';
import Cookies from 'universal-cookie';
import { v4 as uuidv4 } from 'uuid';

export interface Product {
    id: string;
    name: string;
    imgUrl: string;
    value: string;
    quantity: number;
    quantityInStock?: number;
}

interface CartContextType {
    cart: {
        name: string;
        phoneNumber: string;
        products: Product[];
    };
    clearCart: () => void;
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    updateUserInfo: (name: string, phoneNumber: string) => void; // ✅ Novo método
    userId: string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<{ name: string; phoneNumber: string; products: Product[] }>({
        name: '',
        phoneNumber: '',
        products: [],
    });

    const [userId, setUserId] = useState<string>('');

    useEffect(() => {
        const cookie = new Cookies();
        const storedCart = cookie.get('cart');
        let storedUserId = cookie.get('userId');

        if (!storedUserId) {
            storedUserId = uuidv4();
            cookie.set('userId', storedUserId, { expires: new Date(Date.now() + 60 * 60 * 24 * 365 * 1000) });
        }
        setUserId(storedUserId);

        try {
            if (storedCart) {
                const parsedCart = JSON.parse(storedCart);
                if (parsedCart && typeof parsedCart === 'object') {
                    setCart(parsedCart);
                }
            }
        } catch (error) {
            console.error('Erro ao carregar o carrinho:', error);
        }
    }, []);

    useEffect(() => {
        const cookie = new Cookies();

        if (cart.products.length > 0) {
            cookie.set('cart', JSON.stringify(cart), {
                expires: new Date(Date.now() + 60 * 60 * 24 * 365 * 1000),
            });
        } else {
            cookie.remove('cart');
        }
    }, [cart]);

    const addToCart = (product: Product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.products.find((item) => item.id === product.id);

            if (existingProduct) {
                return {
                    ...prevCart,
                    products: prevCart.products.map((item) =>
                        item.id === product.id ? { ...item, quantity: item.quantity + product.quantity } : item
                    ),
                };
            }
            return { ...prevCart, products: [...prevCart.products, product] };
        });
    };

    const clearCart = () => {
        setCart((prevCart) => {
            if (prevCart.products.length === 0) return prevCart;
            return { ...prevCart, products: [] };
        });
    };

    const removeFromCart = (productId: string) => {
        setCart((prevCart) => ({
            ...prevCart,
            products: prevCart.products.filter((item) => item.id !== productId),
        }));
    };

    const updateUserInfo = (name: string, phoneNumber: string) => {
        setCart((prevCart) => ({
            ...prevCart,
            name,
            phoneNumber,
        }));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, clearCart, removeFromCart, updateUserInfo, userId }}>
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
