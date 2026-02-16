"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Pizza, Loader2 } from "lucide-react";

export default function SignupPage() {
    const { signup } = useAuth();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        is_active: true,
        is_staff: false
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await signup(formData);
        } catch (err: any) {
            setError(err.response?.data?.detail || "Signup failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 animate-in slide-in-from-bottom-5 duration-700">
                <div className="text-center">
                    <div className="mx-auto h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        <Pizza className="h-8 w-8 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold font-heading text-secondary">Create Account</h2>
                    <p className="mt-2 text-muted-foreground">Join us today and get 50% off your first order</p>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-xl border border-secondary/5">
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-secondary">Username</label>
                            <Input id="username" type="text" value={formData.username} onChange={handleChange} required className="h-11 rounded-xl bg-secondary/5 border-transparent focus:bg-white" placeholder="johndoe" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-secondary">Email</label>
                            <Input id="email" type="email" value={formData.email} onChange={handleChange} required className="h-11 rounded-xl bg-secondary/5 border-transparent focus:bg-white" placeholder="john@example.com" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-secondary">Password</label>
                            <Input id="password" type="password" value={formData.password} onChange={handleChange} required className="h-11 rounded-xl bg-secondary/5 border-transparent focus:bg-white" placeholder="Create a strong password" />
                        </div>

                        <div className="flex items-center space-x-2 py-2">
                            <input type="checkbox" id="terms" className="rounded border-gray-300 text-primary focus:ring-primary" required />
                            <label htmlFor="terms" className="text-sm text-muted-foreground">I agree to the <Link href="#" className="underline decoration-dotted">Terms & Conditions</Link></label>
                        </div>

                        {error && <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm">{error}</div>}

                        <Button type="submit" className="w-full h-12 text-lg shadow-lg shadow-primary/20" disabled={loading}>
                            {loading ? <Loader2 className="animate-spin" /> : "Create Account"}
                        </Button>
                    </form>
                </div>

                <p className="text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link href="/auth/login" className="font-semibold text-primary hover:underline">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
}
