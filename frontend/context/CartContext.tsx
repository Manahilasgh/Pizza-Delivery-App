"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
    id: string;
    name: string;
    size: string;
    basePrice: number;
    quantity: number;
    image: string;
}

interface CartContextType {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string, size: string) => void;
    updateQuantity: (id: string, size: string, quantity: number) => void;
    clearCart: () => void;
    itemsCount: number;
    subtotal: number;
    isCartOpen: boolean;
    setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart from localStorage", e);
            }
        }
    }, []);

    // Save cart to localStorage on changes
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(items));
    }, [items]);

    const addItem = (newItem: CartItem) => {
        setItems((prevItems) => {
            const existingItemIndex = prevItems.findIndex(
                (item) => item.id === newItem.id && item.size === newItem.size
            );

            if (existingItemIndex > -1) {
                const updatedItems = [...prevItems];
                updatedItems[existingItemIndex].quantity += newItem.quantity;
                return updatedItems;
            }

            return [...prevItems, newItem];
        });
    };

    const removeItem = (id: string, size: string) => {
        setItems((prevItems) =>
            prevItems.filter((item) => !(item.id === id && item.size === size))
        );
    };

    const updateQuantity = (id: string, size: string, quantity: number) => {
        if (quantity < 1) return;
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id && item.size === size ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setItems([]);
    };

    const itemsCount = items.reduce((count, item) => count + item.quantity, 0);
    const subtotal = items.reduce(
        (total, item) => total + item.basePrice * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                itemsCount,
                subtotal,
                isCartOpen,
                setIsCartOpen,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
