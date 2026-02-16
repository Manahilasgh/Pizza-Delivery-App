import PizzaCard from "@/components/PizzaCard";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { PIZZAS } from "@/lib/data";

export default function Home() {
  // Display only the first 6 pizzas for the homepage
  const featuredPizzas = PIZZAS.slice(0, 6);

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />

      <Features />

      {/* Popular Menu Section */}
      <section id="menu" className="py-20 bg-background relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-xl">
              <span className="text-primary font-bold tracking-wider uppercase text-sm">Delicious Menu</span>
              <h2 className="text-4xl md:text-5xl font-bold font-heading text-secondary mt-2">Popular Pizzas</h2>
              <p className="text-muted-foreground mt-4 text-lg">
                Choose from our customer favorites. Customizable to your liking with extra toppings and crust options.
              </p>
            </div>
            <Link href="/menu">
              <Button variant="outline" className="hidden md:flex">
                View Full Menu <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-fr">
            {featuredPizzas.map((pizza) => (
              <div key={pizza.id} className="h-full">
                <PizzaCard pizza={pizza} />
              </div>
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
            <Link href="/menu">
              <Button variant="outline" size="lg" className="w-full">
                View Full Menu
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Testimonials />

      <Footer />
    </div>
  );
}
