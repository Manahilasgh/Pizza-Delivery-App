import * as React from "react"
import { type ClassValue } from "clsx"
import { cn } from "@/lib/utils"

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "accent"
    size?: "default" | "sm" | "lg" | "icon" | "xl"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", ...props }, ref) => {

        const variants: Record<string, string> = {
            default: "bg-primary text-primary-foreground shadow-md hover:bg-primary/90 hover:scale-[1.02] active:scale-95",
            destructive: "bg-destructive text-destructive-foreground shadow-md hover:bg-destructive/90 hover:scale-[1.02] active:scale-95",
            outline: "border-2 border-primary text-primary bg-transparent hover:bg-primary/10 hover:scale-[1.02] active:scale-95",
            secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 hover:scale-[1.02] active:scale-95",
            ghost: "hover:bg-accent/10 hover:text-accent-foreground",
            link: "text-primary underline-offset-4 hover:underline",
            accent: "bg-accent text-accent-foreground shadow-md hover:bg-accent/90 hover:scale-[1.02] active:scale-95",
        }

        const sizes: Record<string, string> = {
            default: "h-11 px-6 py-2 rounded-full",
            sm: "h-9 rounded-full px-4 text-xs",
            lg: "h-12 rounded-full px-8 text-lg",
            xl: "h-14 rounded-full px-10 text-xl font-bold",
            icon: "h-11 w-11 rounded-full",
        }

        return (
            <button
                className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                    variants[variant],
                    sizes[size],
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }
