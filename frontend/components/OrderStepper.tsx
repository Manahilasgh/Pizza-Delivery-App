import { Check, Package, Truck, Home, ChefHat } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
    { status: "PENDING", label: "Order Placed", icon: Package },
    { status: "PREPARING", label: "Preparing", icon: ChefHat },
    { status: "IN-TRANSIT", label: "Out for Delivery", icon: Truck },
    { status: "DELIVERED", label: "Delivered", icon: Home },
];

export default function OrderStepper({ status }: { status: string }) {
    const currentStepIndex = steps.findIndex((s) => s.status === status);
    // specific logic: if status is PENDING, index is 0. If PREPARING, 1. etc.
    // We need to map backend status to these steps. 
    // Backend statuses: PENDING, IN-TRANSIT, DELIVERED. 
    // Missing 'PREPARING' in backend? Let's check models.py later. 
    // For now, let's assume PENDING -> 0, IN-TRANSIT -> 2, DELIVERED -> 3.

    let activeIndex = 0;
    if (status === "PENDING") activeIndex = 0;
    else if (status === "PREPARING") activeIndex = 1; // Future proofing
    else if (status === "IN-TRANSIT") activeIndex = 2;
    else if (status === "DELIVERED") activeIndex = 3;

    return (
        <div className="w-full py-6">
            <div className="flex items-center justify-between relative">
                {/* Progress Line Background */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-secondary/10 -z-10 rounded-full" />

                {/* Progress Line Active */}
                <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary -z-10 rounded-full transition-all duration-1000"
                    style={{ width: `${(activeIndex / (steps.length - 1)) * 100}%` }}
                />

                {steps.map((step, index) => {
                    const isActive = index <= activeIndex;
                    const isCompleted = index < activeIndex;
                    const Icon = step.icon;

                    return (
                        <div key={step.status} className="flex flex-col items-center gap-2 relative group">
                            <div
                                className={cn(
                                    "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 z-10 bg-background",
                                    isActive ? "border-primary text-primary" : "border-muted-foreground/30 text-muted-foreground",
                                    isCompleted && "bg-primary text-white border-primary",
                                    index === activeIndex && "ring-4 ring-primary/20 scale-110"
                                )}
                            >
                                {isCompleted ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                            </div>
                            <span className={cn(
                                "absolute -bottom-8 text-[10px] sm:text-xs font-bold whitespace-nowrap transition-colors duration-300",
                                isActive ? "text-secondary" : "text-muted-foreground"
                            )}>
                                {step.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
