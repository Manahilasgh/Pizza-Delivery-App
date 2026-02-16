"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Pizza, Loader2, Facebook, Mail } from "lucide-react";

export default function LoginPage() {
    const { login } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await login({ username, password });
        } catch (err: any) {
            setError(err.response?.data?.detail || "Login failed");
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
                    <h2 className="text-3xl font-bold font-heading text-secondary">Welcome Back</h2>
                    <p className="mt-2 text-muted-foreground">Sign in to your account and order your favorite pizza</p>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-xl border border-secondary/5">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-secondary">Username</label>
                            <Input
                                type="text"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="h-12 rounded-xl bg-secondary/5 border-transparent focus:bg-white transition-all"
                                placeholder="Enter your username"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-secondary">Password</label>
                                <Link href="#" className="text-xs font-medium text-primary hover:underline">Forgot password?</Link>
                            </div>
                            <Input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="h-12 rounded-xl bg-secondary/5 border-transparent focus:bg-white transition-all"
                                placeholder="••••••••"
                            />
                        </div>

                        {error && <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm">{error}</div>}

                        <Button type="submit" className="w-full h-12 text-lg shadow-lg shadow-primary/20" disabled={loading}>
                            {loading ? <Loader2 className="animate-spin" /> : "Sign In"}
                        </Button>
                    </form>

                    <div className="mt-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-200" /></div>
                            <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-muted-foreground">Or continue with</span></div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <Button variant="outline" className="h-11 border-2 text-secondary hover:bg-secondary/5">
                                <Mail className="mr-2 h-4 w-4" /> Google
                            </Button>
                            <Button variant="outline" className="h-11 border-2 text-secondary hover:bg-secondary/5">
                                <Facebook className="mr-2 h-4 w-4" /> Facebook
                            </Button>
                        </div>
                    </div>
                </div>

                <p className="text-center text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <Link href="/auth/signup" className="font-semibold text-primary hover:underline">
                        Sign up for free
                    </Link>
                </p>
            </div>
        </div>
    );
}
