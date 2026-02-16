import { cn } from "@/lib/utils";

const styles: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-700 border-yellow-200",
    "IN-TRANSIT": "bg-blue-100 text-blue-700 border-blue-200",
    DELIVERED: "bg-green-100 text-green-700 border-green-200",
    CANCELLED: "bg-red-100 text-red-700 border-red-200",
};

const labels: Record<string, string> = {
    PENDING: "Pending",
    "IN-TRANSIT": "On the way",
    DELIVERED: "Delivered",
    CANCELLED: "Cancelled"
}

export default function StatusBadge({ status }: { status: string }) {
    return (
        <span
            className={cn(
                "px-3 py-1 rounded-full text-xs font-bold border shadow-sm uppercase tracking-wide",
                styles[status] || "bg-gray-100 text-gray-700 border-gray-200"
            )}
        >
            {labels[status] || status}
        </span>
    );
}
