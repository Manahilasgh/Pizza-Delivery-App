import { Truck, Leaf, Flame } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const features = [
    {
        icon: <Truck className="h-10 w-10 text-primary" />,
        title: "Fast Delivery",
        description: "Hot and fresh pizza delivered to your doorstep in 30 minutes or less, guaranteed.",
    },
    {
        icon: <Leaf className="h-10 w-10 text-green-500" />,
        title: "Fresh Ingredients",
        description: "We use only the freshest, locally sourced vegetables and premium meats for our toppings.",
    },
    {
        icon: <Flame className="h-10 w-10 text-orange-500" />,
        title: "Wood Fired Taste",
        description: "Baked to perfection in our traditional wood-fired ovens for that authentic smoky flavor.",
    },
];

export default function Features() {
    return (
        <section className="py-20 bg-secondary/5">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold font-heading text-secondary mb-4">Why Choose PizzaSlice?</h2>
                    <p className="text-muted-foreground">More than just a pizza, it's an experience. Here's why our customers keep coming back for more.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <Card key={index} className="border-none shadow-lg hover:-translate-y-2 transition-transform duration-300">
                            <CardContent className="pt-6 text-center flex flex-col items-center gap-4">
                                <div className="p-4 rounded-full bg-background shadow-sm">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-secondary">{feature.title}</h3>
                                <p className="text-muted-foreground">{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
