"use client";

import { useCart, CartItem } from "@/context/CartContext";
import { X, Minus, Plus, ShoppingCart, Trash2, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function CartSidebar() {
    const { items, removeItem, updateQuantity, subtotal, isCartOpen, setIsCartOpen, itemsCount, clearCart } = useCart();
    const { token } = useAuth();
    const { showToast } = useToast();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleCheckout = async () => {
        if (!token) {
            showToast("Please login to checkout", "error");
            setIsCartOpen(false);
            router.push("/auth/login");
            return;
        }

        if (items.length === 0) return;

        setLoading(true);
        try {
            console.log("Starting checkout with token:", token ? "Token present (length: " + token.length + ")" : "Token missing");

            // Loop through items and place orders
            const orderPromises = items.map((item: CartItem) => {
                const orderData = {
                    flavour: item.name.toUpperCase(),
                    quantity: item.quantity,
                    pizza_size: item.size.toUpperCase(), // Ensure uppercase for backend
                    order_status: "PENDING"
                };
                console.log("Placing order for:", orderData.flavour, "Size:", orderData.pizza_size);
                return axios.post("http://localhost:8000/orders/order", orderData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            });

            await Promise.all(orderPromises);
            console.log("All orders placed successfully");

            showToast("Orders placed successfully!", "success");
            clearCart();
            setIsCartOpen(false);
            router.push("/dashboard");
        } catch (error: any) {
            const backendMsg = error.response?.data?.detail;
            const msg = Array.isArray(backendMsg) ? backendMsg.map((m: any) => m.msg).join(", ") : (backendMsg || "Failed to place orders");
            showToast(msg, "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className={cn(
                    "fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] transition-opacity duration-300",
                    isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={() => setIsCartOpen(false)}
            />

            {/* Sidebar */}
            <div
                className={cn(
                    "fixed top-0 right-0 h-full w-full max-w-md bg-background shadow-2xl z-[101] transition-transform duration-500 ease-in-out transform flex flex-col",
                    isCartOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                {/* Header */}
                <div className="p-6 border-b flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <ShoppingCart className="h-6 w-6 text-primary" />
                        <h2 className="text-2xl font-bold font-heading">Your Cart</h2>
                        <span className="bg-primary/10 text-primary text-sm px-2 py-1 rounded-full font-bold">
                            {itemsCount}
                        </span>
                    </div>
                    <button
                        onClick={() => setIsCartOpen(false)}
                        className="p-2 hover:bg-secondary/5 rounded-full transition-colors"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Items List */}
                <div className="flex-grow overflow-y-auto p-6 space-y-6">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                            <div className="bg-secondary/5 p-8 rounded-full">
                                <ShoppingCart className="h-12 w-12 text-muted-foreground" />
                            </div>
                            <p className="text-xl font-medium text-muted-foreground">Your cart is empty</p>
                            <Button variant="outline" onClick={() => setIsCartOpen(false)}>
                                Continue Shopping
                            </Button>
                        </div>
                    ) : (
                        items.map((item: CartItem) => (
                            <div key={`${item.id}-${item.size}`} className="flex gap-4 group">
                                <div className="h-20 w-20 rounded-xl overflow-hidden bg-secondary/5 shrink-0">
                                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                                </div>
                                <div className="flex-grow">
                                    <div className="flex justify-between mb-1">
                                        <h3 className="font-bold">{item.name}</h3>
                                        <button
                                            onClick={() => removeItem(item.id, item.size)}
                                            className="text-muted-foreground hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-3">{item.size}</p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 bg-secondary/5 rounded-full p-1">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                                                className="h-7 w-7 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-gray-100"
                                            >
                                                <Minus className="h-3 w-3" />
                                            </button>
                                            <span className="w-6 text-center text-sm font-bold">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                                                className="h-7 w-7 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-gray-100"
                                            >
                                                <Plus className="h-3 w-3" />
                                            </button>
                                        </div>
                                        <span className="font-bold text-primary">
                                            ${(item.basePrice * item.quantity).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="p-6 border-t bg-secondary/5 space-y-4">
                        <div className="flex justify-between items-center text-lg font-bold">
                            <span>Subtotal</span>
                            <span className="text-primary">${subtotal.toFixed(2)}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Taxes and delivery shipping calculated at checkout
                        </p>
                        <Button
                            size="xl"
                            className="w-full text-lg shadow-xl shadow-primary/20"
                            onClick={handleCheckout}
                            disabled={loading}
                        >
                            {loading ? <Loader2 className="animate-spin mr-2 h-5 w-5" /> : null}
                            {loading ? "Processing..." : "Checkout"}
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
}
