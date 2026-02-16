"use client";

import { useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingCart, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function OrderModal({ isOpen, onClose, pizza }: any) {
    const { token } = useAuth();
    const [size, setSize] = useState("SMALL");
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    if (!isOpen) return null;

    const handleSubmit = async () => {
        if (!token) {
            // Ideally show a nice auth modal or redirect. Alert for now.
            alert("Please login to order");
            return;
        }
        setLoading(true);
        setMessage("");

        try {
            const orderData = {
                flavour: pizza.name.toUpperCase(),
                quantity: quantity,
                pizza_size: size,
                order_status: "PENDING"
            };

            await axios.post("http://localhost:8000/orders/order", orderData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setMessage("Order placed successfully!");
            setTimeout(() => {
                onClose();
                setMessage("");
                setQuantity(1);
            }, 1500);
        } catch (error: any) {
            console.error(error);
            setMessage("Failed to place order. " + (error.response?.data?.detail || ""));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />

            {/* Modal Content */}
            <div className="relative w-full max-w-lg bg-background rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">

                {/* Header Image */}
                <div className="h-40 relative">
                    <img src={pizza.image} alt={pizza.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-4 left-6 text-white">
                        <h2 className="text-3xl font-bold font-heading">{pizza.name}</h2>
                        <p className="text-white/80 line-clamp-1">{pizza.description}</p>
                    </div>
                    <button onClick={onClose} className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {/* Size Selector */}
                    <div className="space-y-3">
                        <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Select Size</label>
                        <div className="grid grid-cols-4 gap-2">
                            {['SMALL', 'MEDIUM', 'LARGE', 'EXTRA-LARGE'].map((s) => (
                                <button
                                    key={s}
                                    onClick={() => setSize(s)}
                                    className={cn(
                                        "flex flex-col items-center justify-center py-3 px-1 rounded-xl border-2 transition-all duration-200",
                                        size === s
                                            ? "border-primary bg-primary/5 text-primary shadow-sm"
                                            : "border-border hover:border-primary/50 text-muted-foreground"
                                    )}
                                >
                                    <span className="text-xs font-bold">{s === 'EXTRA-LARGE' ? 'XL' : s.charAt(0)}</span>
                                    <span className="text-[10px] uppercase mt-1">{s.split('-')[0]}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="space-y-3">
                        <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Quantity</label>
                        <div className="flex items-center gap-4 bg-secondary/5 rounded-full p-1 w-max">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="h-10 w-10 bg-white shadow-sm hover:bg-white/90 rounded-full"
                            >
                                <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-12 text-center text-xl font-bold text-secondary">{quantity}</span>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setQuantity(quantity + 1)}
                                className="h-10 w-10 bg-white shadow-sm hover:bg-white/90 rounded-full"
                            >
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Total Price */}
                    <div className="flex items-center justify-between pt-4 border-t border-dashed">
                        <span className="text-muted-foreground">Total Price</span>
                        <span className="text-2xl font-bold text-primary">${(pizza.basePrice * quantity).toFixed(2)}</span>
                    </div>

                    {message && (
                        <div className={cn("p-3 rounded-lg text-center font-medium", message.includes("success") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700")}>
                            {message}
                        </div>
                    )}
                </div>

                <div className="p-6 pt-0 flex gap-3">
                    <Button variant="outline" className="flex-1 rounded-xl h-12 border-2" onClick={onClose} disabled={loading}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="flex-1 rounded-xl h-12 gap-2 text-lg shadow-lg shadow-primary/25"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <ShoppingCart className="h-5 w-5" />}
                        {loading ? "Ordering..." : "Place Order"}
                    </Button>
                </div>
            </div>
        </div>
    );
}
