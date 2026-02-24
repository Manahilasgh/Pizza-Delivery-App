import { Button } from "./ui/button";
import { ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-24 lg:pt-32 pb-20 overflow-hidden bg-gradient-to-br from-orange-50 to-red-50">
            {/* Background image with overlay */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-white/60 z-10"></div>
                <img
                    src="https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?q=80&w=2000&auto=format&fit=crop"
                    className="w-full h-full object-cover opacity-20"
                    alt="Background"
                />
            </div>

            <div className="container mx-auto px-4 max-w-7xl relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8 animate-in slide-in-from-left duration-700 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm text-secondary font-semibold text-sm mx-auto lg:mx-0 border border-orange-100">
                        <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full">New</span>
                        <span>Authentic Italian Recipes</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-heading leading-tight text-secondary">
                        Slice of <span className="text-primary">Heaven</span> in <br />
                        Every Bite
                    </h1>

                    <p className="text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed">
                        Experience the taste of freshly baked, hand-tossed pizzas made with premium ingredients and love. Delivered hot to your door within 30 minutes.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <Link href="/dashboard">
                        <Button size="xl" className="shadow-xl shadow-primary/20 text-lg h-14 px-8 rounded-full">
                            Order Now <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                        </Link>
                        <Link href="/menu">
                        <Button size="xl" variant="outline" className="border-2 text-lg h-14 px-8 rounded-full bg-white/50 hover:bg-white">
                            View Menu
                        </Button>
                        </Link>
                    </div>

                    <div className="flex items-center gap-4 pt-4 justify-center lg:justify-start">
                        <div className="flex -space-x-4">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="h-12 w-12 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="user" className="h-full w-full object-cover" />
                                </div>
                            ))}
                            <div className="h-12 w-12 rounded-full border-2 border-white bg-secondary text-white flex items-center justify-center text-xs font-bold">
                                10k+
                            </div>
                        </div>
                        <div className="text-sm text-left">
                            <div className="flex text-accent">
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="h-4 w-4 fill-current" />)}
                            </div>
                            <p className="font-semibold text-secondary">Happy Customers</p>
                        </div>
                    </div>
                </div>

                <div className="relative animate-in zoom-in duration-700 delay-200 hidden lg:block">
                    <div className="relative z-10 w-full aspect-square max-w-[650px] mx-auto">
                        {/* Main Pizza Image */}
                        <img
                            src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1000&auto=format&fit=crop"
                            alt="Delicious Pizza"
                            className="w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500 hover:rotate-2"
                        />

                        {/* Floating Badges */}
                        <div className="absolute top-20 -right-4 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl animate-bounce duration-[3000ms] border border-orange-100">
                            <span className="text-3xl">🔥</span>
                            <span className="font-bold text-secondary ml-2">Hot & Spicy</span>
                        </div>

                        <div className="absolute bottom-24 -left-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl animate-pulse border border-orange-100">
                            <span className="text-3xl">🧀</span>
                            <span className="font-bold text-secondary ml-2">Extra Cheese</span>
                        </div>
                    </div>

                    {/* Decorative blob */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-primary/5 rounded-full blur-3xl -z-10" />
                </div>
            </div>
        </section>
    );
}
