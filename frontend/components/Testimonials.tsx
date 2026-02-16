import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const testimonials = [
    {
        name: "Sarah Johnson",
        role: "Food Blogger",
        content: "The best pizza I've had in years! The crust is perfectly crispy and the toppings are generous. Highly recommended!",
        avatar: "https://i.pravatar.cc/100?img=5",
        rating: 5,
    },
    {
        name: "Michael Chen",
        role: "Regular Customer",
        content: "Delivery was super fast and the pizza was still piping hot. The app makes ordering so easy. Love the rewards program!",
        avatar: "https://i.pravatar.cc/100?img=3",
        rating: 5,
    },
    {
        name: "Emily Davis",
        role: "Pizza Eaters Club",
        content: "Tried the Chicken Tikka pizza and I'm hooked. The flavors are authentic and the cheese pull is real. Will order again.",
        avatar: "https://i.pravatar.cc/100?img=9",
        rating: 4,
    },
];

export default function Testimonials() {
    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold font-heading text-secondary mb-4">What Our Customers Say</h2>
                    <p className="text-muted-foreground">Don't just take our word for it. Read reviews from our happy customers.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <Card key={index} className="border-border/50 bg-secondary/5 relative">
                            <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/10" />
                            <CardContent className="pt-8">
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-4 w-4 ${i < testimonial.rating ? "text-accent fill-current" : "text-gray-300"}`}
                                        />
                                    ))}
                                </div>
                                <p className="text-secondary/80 italic mb-6">"{testimonial.content}"</p>
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-primary">
                                        <img src={testimonial.avatar} alt={testimonial.name} className="h-full w-full object-cover" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-secondary">{testimonial.name}</h4>
                                        <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
