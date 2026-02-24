"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, X, User, Pizza } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { token, user, logout } = useAuth();
  const { showToast } = useToast();
  const { itemsCount, setIsCartOpen } = useCart();
  const [shouldBounce, setShouldBounce] = useState(false);

  useEffect(() => {
    if (itemsCount > 0) {
      setShouldBounce(true);
      const timer = setTimeout(() => setShouldBounce(false), 500);
      return () => clearTimeout(timer);
    }
  }, [itemsCount]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/menu", label: "Menu" },
    { href: "/dashboard", label: "My Orders" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-white/95 backdrop-blur-md shadow-lg"
        : "bg-white/80 backdrop-blur-sm"
        }`}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Pizza className="h-8 w-8 text-primary transition-transform group-hover:rotate-12 duration-300" />
              <div className="absolute -inset-1 bg-primary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent">
              PizzaSlice
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition-colors relative group ${pathname === link.href
                  ? "text-primary"
                  : "text-secondary/70 hover:text-primary"
                  }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full ${pathname === link.href ? "w-full" : ""
                    }`}
                />
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "relative group",
                shouldBounce && "animate-bounce"
              )}
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="h-5 w-5 transition-transform group-hover:scale-110 duration-300" />
              {itemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white font-medium text-[10px] rounded-full h-5 w-5 flex items-center justify-center shadow-lg ring-2 ring-red animate-in zoom-in duration-300">
                  {itemsCount}
                  <span className="absolute inset-0 rounded-full bg-red-600 animate-ping opacity-75" />
                </span>
              )}
            </Button>

            {token ? (
              <div className="flex items-center gap-3">
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <User className="h-4 w-4" />
                    {user?.username || "Profile"}
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={() => {
                  logout();
                  showToast("Logged out successfully", "success");
                }}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="sm" className="shadow-md hover:shadow-lg transition-shadow">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-secondary hover:text-primary transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-6 border-t border-secondary/10 animate-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-base font-semibold py-2 transition-colors ${pathname === link.href
                    ? "text-primary"
                    : "text-secondary/70 hover:text-primary"
                    }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="pt-4 border-t border-secondary/10 flex flex-col gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start gap-2"
                  onClick={() => {
                    setIsCartOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <ShoppingCart className="h-4 w-4" />
                  Cart ({itemsCount})
                </Button>

                {token ? (
                  <>
                    <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                        <User className="h-4 w-4" />
                        {user?.username || "Profile"}
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm" onClick={() => {
                      logout();
                      showToast("Logged out successfully", "success");
                      setIsMobileMenuOpen(false);
                    }}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="ghost" size="sm" className="w-full">
                        Login
                      </Button>
                    </Link>
                    <Link href="/auth/signup" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button size="sm" className="w-full">
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}