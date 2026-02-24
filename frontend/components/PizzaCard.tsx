"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";

interface Pizza {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  image: string;
}

interface PizzaCardProps {
  pizza: Pizza;
}

export default function PizzaCard({ pizza }: PizzaCardProps) {
  const { addItem } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = () => {
    addItem({
      id: pizza.id,
      name: pizza.name,
      size: "Medium",
      basePrice: pizza.basePrice,
      quantity: 1,
      image: pizza.image,
    });
    showToast("Item added to cart successfully!");
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-full border border-secondary/5">
      {/* Image Container - Fixed Height */}
      <div className="relative h-72 overflow-hidden bg-gradient-to-br from-orange-50 to-red-50">
        <img
          src={pizza.image}
          alt={pizza.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Price Badge */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
          <span className="text-2xl font-black text-primary">${pizza.basePrice}</span>
        </div>

        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-secondary mb-3 group-hover:text-primary transition-colors duration-300">
          {pizza.name}
        </h3>

        <p className="text-secondary/70 mb-6 leading-relaxed flex-grow">
          {pizza.description}
        </p>

        {/* Actions */}
        <div className="flex gap-3 mt-auto">
          <Link href={`/pizza/${pizza.id}`} className="flex-1">
            <Button
              variant="outline"
              className="w-full border-2 border-primary/20 hover:border-primary hover:bg-primary/5 transition-all duration-300 font-semibold"
            >
              View Details
            </Button>
          </Link>

          <Button
            size="icon"
            className="shrink-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            onClick={handleAddToCart}
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="h-1 bg-gradient-to-r from-primary via-orange-500 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </div>
  );
}