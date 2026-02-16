import PizzaCard from "@/components/PizzaCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal } from "lucide-react";
import { PIZZAS } from "@/lib/data";

const categories = ["All", "Meat", "Veggie", "Spicy", "Classic"];

export default function MenuPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="bg-secondary/5 py-16 md:py-24 pt-32">
                <div className="container mx-auto px-4 text-center max-w-7xl">
                    <h1 className="text-4xl md:text-5xl font-bold font-heading text-secondary mb-4">Our Menu</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">Explore our wide range of pizzas, made with love and fresh ingredients.</p>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl py-12 md:py-20">
                {/* Filters & Search */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
                    <div className="flex overflow-x-auto pb-2 md:pb-0 gap-3 w-full md:w-auto no-scrollbar">
                        {categories.map((cat, i) => (
                            <Button key={cat} variant={i === 0 ? 'default' : 'outline'} className="rounded-full whitespace-nowrap px-6">
                                {cat}
                            </Button>
                        ))}
                    </div>

                    <div className="flex w-full md:w-auto gap-4">
                        <div className="relative flex-1 md:w-72">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search pizzas..." className="pl-10 rounded-full" />
                        </div>
                        <Button variant="outline" size="icon" className="rounded-full shrink-0">
                            <SlidersHorizontal className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 md:gap-6">
                    {PIZZAS.map((pizza) => (
                        <div key={pizza.id} className="h-full">
                            <PizzaCard pizza={pizza} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
