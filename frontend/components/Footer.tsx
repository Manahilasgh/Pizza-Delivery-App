import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-secondary text-primary-foreground pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold font-heading">Pizza<span className="text-primary">Slice</span></h3>
                        <p className="text-gray-300 leading-relaxed">
                            Crafting average-defying pizzas since 2010. Fresh ingredients, secret family recipes, and hot delivery to your doorstep.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <Button size="icon" variant="ghost" className="rounded-full bg-white/10 hover:bg-primary hover:text-white transition-colors">
                                <Facebook className="h-5 w-5" />
                            </Button>
                            <Button size="icon" variant="ghost" className="rounded-full bg-white/10 hover:bg-primary hover:text-white transition-colors">
                                <Instagram className="h-5 w-5" />
                            </Button>
                            <Button size="icon" variant="ghost" className="rounded-full bg-white/10 hover:bg-primary hover:text-white transition-colors">
                                <Twitter className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-primary">Quick Links</h4>
                        <ul className="space-y-3">
                            <li><Link href="/" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all inline-block">Home</Link></li>
                            <li><Link href="/menu" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all inline-block">Menu</Link></li>
                            <li><Link href="/about" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all inline-block">Our Story</Link></li>
                            <li><Link href="/blog" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all inline-block">Blog</Link></li>
                            <li><Link href="/contact" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all inline-block">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-primary">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-gray-300">
                                <MapPin className="h-5 w-5 text-primary shrink-0" />
                                <span>123 Pizza Street, <br /> Foodie Town, NY 10012</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-300">
                                <Phone className="h-5 w-5 text-primary shrink-0" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-300">
                                <Mail className="h-5 w-5 text-primary shrink-0" />
                                <span>hello@pizzaslice.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-primary">Get Offers</h4>
                        <p className="text-gray-300 text-sm">Subscribe to get 10% off your first order and exclusive daily deals.</p>
                        <div className="flex gap-2">
                            <Input placeholder="Enter your email" className="bg-white/10 border-transparent text-white placeholder:text-gray-400 focus:bg-white/20" />
                            <Button variant="default">Join</Button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 text-center text-gray-400 text-sm">
                    <p>&copy; {new Date().getFullYear()} PizzaSlice. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
