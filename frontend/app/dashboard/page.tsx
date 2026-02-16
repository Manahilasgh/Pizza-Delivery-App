import PizzaCard from "@/components/PizzaCard";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Shield, Flame } from "lucide-react";
import Link from "next/link";

const PIZZAS = [
  {
    id: "1",
    name: "Chicken Tikka",
    description: "Spicy chicken tikka chunks with onions and cheese. A local favorite.",
    basePrice: 12,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "2",
    name: "Fajita",
    description: "Mexican style chicken fajita with peppers, onions, and lots of cheese.",
    basePrice: 13,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "3",
    name: "Cheese Lover",
    description: "Classic Margherita with extra mozzarella and cheddar cheese blend.",
    basePrice: 10,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "4",
    name: "Hot N Spicy",
    description: "Hot peppers, jalapeños, spicy beef and chili flakes for the brave.",
    basePrice: 14,
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "5",
    name: "Peri Peri",
    description: "African bird's eye chili chicken with our signature peri peri sauce.",
    basePrice: 13,
    image: "https://images.unsplash.com/photo-1593560708920-6389281534b5?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "6",
    name: "Pepperoni Feast",
    description: "Classic American pepperoni with double mozzarella on a thin crust.",
    basePrice: 11,
    image: "https://img.freepik.com/free-photo/pepperoni-pizza-with-sausages-cheese-dark-wooden-table_220768-9277.jpg?size=626&ext=jpg"
  },
];

const FEATURES = [
  {
    icon: Clock,
    title: "Fast Delivery",
    description: "Hot & fresh pizza delivered to your door in 30 minutes or less"
  },
  {
    icon: Shield,
    title: "Premium Quality",
    description: "Made with the finest ingredients and love"
  },
  {
    icon: Flame,
    title: "Always Hot",
    description: "Our special packaging keeps your pizza piping hot"
  }
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Compact & Professional */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-orange-50 via-white to-red-50 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF6B35' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-block animate-in fade-in slide-in-from-top-4 duration-700">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary font-bold rounded-full text-sm tracking-wide">
                🍕 FRESH • HOT • DELICIOUS
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-secondary leading-tight animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
              Slice of Heaven in
              <span className="block bg-gradient-to-r from-primary via-orange-500 to-red-500 bg-clip-text text-transparent">
                Every Bite
              </span>
            </h1>

            <p className="text-xl text-secondary/70 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
              Handcrafted pizzas made with premium ingredients. Delivered hot to your door in 30 minutes or less.
            </p>

            <div className="flex flex-wrap gap-4 justify-center pt-4 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300">
              <Link href="/menu">
                <Button size="lg" className="gap-2 text-base px-8 py-6 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
                  Order Now <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white border-y border-secondary/10">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURES.map((feature, index) => (
              <div
                key={feature.title}
                className="flex flex-col items-center text-center gap-4 p-6 rounded-2xl hover:bg-orange-50/50 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-4 bg-gradient-to-br from-primary/10 to-orange-100/50 rounded-2xl">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-secondary">{feature.title}</h3>
                <p className="text-secondary/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Pizzas Section */}
      <section className="py-20 bg-gradient-to-b from-white to-orange-50/30">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-3xl mb-16 animate-in fade-in slide-in-from-left-6 duration-700">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary font-bold rounded-full text-sm tracking-wide mb-4">
              POPULAR MENU
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-secondary mb-4">
              Customer Favorites
            </h2>
            <p className="text-xl text-secondary/70">
              Handpicked pizzas loved by thousands. Every pizza is customizable with your choice of size and toppings.
            </p>
          </div>

          {/* Pizza Grid with Equal Heights */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
            {PIZZAS.map((pizza, index) => (
              <div
                key={pizza.id}
                className="animate-in fade-in slide-in-from-bottom-6 duration-700"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <PizzaCard pizza={pizza} />
              </div>
            ))}
          </div>

          <div className="text-center mt-12 animate-in fade-in duration-700 delay-500">
            <Link href="/menu">
              <Button variant="outline" size="lg" className="gap-2 px-8 shadow-md hover:shadow-lg transition-all">
                View Full Menu <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials at Bottom */}
      <Testimonials />

      <Footer />
    </div>
  );
}