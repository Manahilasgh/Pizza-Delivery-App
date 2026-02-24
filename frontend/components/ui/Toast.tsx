"use client";

import { CheckCircle2, AlertCircle, X, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export type ToastType = "success" | "error" | "info";

interface ToastProps {
    message: string;
    type?: ToastType;
    onClose: () => void;
}

export function Toast({ message, type = "success", onClose }: ToastProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Small delay for entry animation
        const timer = setTimeout(() => setIsVisible(true), 10);
        return () => clearTimeout(timer);
    }, []);

    const icons = {
        success: <CheckCircle2 className="h-5 w-5 text-green-500" />,
        error: <AlertCircle className="h-5 w-5 text-red-500" />,
        info: <Info className="h-5 w-5 text-blue-500" />,
    };

    const styles = {
        success: "border-green-100 bg-green-50/90",
        error: "border-red-100 bg-red-50/90",
        info: "border-blue-100 bg-blue-50/90",
    };

    return (
        <div
            className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-2xl border backdrop-blur-md shadow-lg transition-all duration-500 transform pointer-events-auto",
                styles[type],
                isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
            )}
        >
            <div className="shrink-0">{icons[type]}</div>
            <p className="text-sm font-semibold text-secondary leading-tight min-w-[200px]">
                {message}
            </p>
            <button
                onClick={() => {
                    setIsVisible(false);
                    setTimeout(onClose, 500);
                }}
                className="p-1 hover:bg-black/5 rounded-full transition-colors"
            >
                <X className="h-4 w-4 text-muted-foreground" />
            </button>
        </div>
    );
}
