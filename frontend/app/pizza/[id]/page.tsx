"use client";

import { PIZZAS } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Minus, Plus, ShoppingCart, Star } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { use, useState } from "react";

export default function PizzaDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const pizza = PIZZAS.find((p) => p.id === id);
    const { addItem } = useCart();
    const { showToast } = useToast();

    console.log("PizzaDetailPage Debug:", { id, pizzaFound: !!pizza });
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState("Medium");

    if (!pizza) {
        notFound();
    }

    const sizes = ["Small", "Medium", "Large"];

    return (
        <div className="min-h-screen bg-background pt-24 pb-20">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Breadcrumb / Back Navigation */}
                <Link
                    href="/menu"
                    className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Menu
                </Link>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Left Column: Image */}
                    <div className="relative bg-secondary/5 rounded-3xl p-8 aspect-square flex items-center justify-center overflow-hidden">
                        <div className="absolute top-6 left-6 z-10 bg-white/90 backdrop-blur-sm text-secondary font-bold px-4 py-2 rounded-full shadow-sm border border-orange-100">
                            ⭐ 4.8 (120+ reviews)
                        </div>
                        <img
                            src={pizza.image}
                            alt={pizza.name}
                            className="w-[90%] h-[90%] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500 animate-in zoom-in slide-in-from-bottom-5 duration-700"
                        />
                    </div>

                    {/* Right Column: Details */}
                    <div className="space-y-8 animate-in slide-in-from-right duration-700 delay-200">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold font-heading text-secondary mb-4">{pizza.name}</h1>
                            <p className="text-xl text-muted-foreground leading-relaxed">{pizza.description}</p>
                        </div>

                        {/* Size Selector */}
                        <div>
                            <h3 className="font-semibold text-secondary mb-3">Select Size</h3>
                            <div className="flex flex-wrap gap-3">
                                {sizes.map(size => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-6 py-3 rounded-xl font-medium transition-all ${selectedSize === size
                                            ? "bg-primary font-bold shadow-lg shadow-primary/20 scale-105"
                                            : "bg-secondary/5 text-secondary hover:bg-secondary/10"
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Price and Quantity */}
                        <div className="flex items-center justify-between border-y border-border py-6">
                            <div>
                                <p className="text-muted-foreground text-sm mb-1">Total Price</p>
                                <p className="text-4xl font-bold text-primary">${(pizza.basePrice * quantity).toFixed(2)}</p>
                            </div>

                            <div className="flex items-center gap-4 bg-secondary/5 rounded-full p-2">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="h-10 w-10 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-gray-100 transition-colors"
                                    disabled={quantity <= 1}
                                >
                                    <Minus className="h-4 w-4" />
                                </button>
                                <span className="font-bold text-xl min-w-[30px] text-center">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="h-10 w-10 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-gray-100 transition-colors"
                                >
                                    <Plus className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4">
                            <Button
                                size="xl"
                                className="flex-1 text-lg h-14 rounded-xl shadow-xl shadow-primary/20"
                                onClick={() => {
                                    if (pizza) {
                                        addItem({
                                            id: pizza.id,
                                            name: pizza.name,
                                            size: selectedSize,
                                            basePrice: pizza.basePrice,
                                            quantity: quantity,
                                            image: pizza.image,
                                        });
                                        showToast("Item added to cart successfully!");
                                    }
                                }}
                            >
                                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                            </Button>
                        </div>

                        {/* Additional Info */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                            <div className="bg-secondary/5 p-4 rounded-2xl">
                                <p className="font-bold text-secondary">30-40 min</p>
                                <p className="text-xs text-muted-foreground">Delivery Time</p>
                            </div>
                            <div className="bg-secondary/5 p-4 rounded-2xl">
                                <p className="font-bold text-secondary">150+</p>
                                <p className="text-xs text-muted-foreground">Calories</p>
                            </div>
                            <div className="bg-secondary/5 p-4 rounded-2xl">
                                <p className="font-bold text-secondary">Free</p>
                                <p className="text-xs text-muted-foreground">Delivery</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
