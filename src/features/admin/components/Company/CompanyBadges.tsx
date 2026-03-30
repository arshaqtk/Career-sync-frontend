import { Badge } from "@/components/ui/shadcn/badge"

interface VerificationBadgeProps {
    status: "pending" | "approved" | "rejected"
}

export function VerificationBadge({ status }: VerificationBadgeProps) {
    const styles = {
        pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20 px-2 py-0.5 rounded-md backdrop-blur-sm shadow-sm",
        approved: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 px-2 py-0.5 rounded-md backdrop-blur-sm shadow-sm",
        rejected: "bg-red-500/10 text-red-500 border-red-500/20 px-2 py-0.5 rounded-md backdrop-blur-sm shadow-sm",
    }

    return (
        <Badge variant="outline" className={`${styles[status]} font-semibold text-[10px] tracking-wide uppercase transition-all hover:scale-105`}>
            {status}
        </Badge>
    )
}

export function ActiveBadge({ isActive }: { isActive: boolean }) {
    return (
        <Badge 
            variant="outline" 
            className={`font-semibold text-[10px] tracking-wide uppercase transition-all hover:scale-105 px-2 py-0.5 rounded-md backdrop-blur-sm shadow-sm ${
                isActive 
                ? "bg-blue-500/10 text-blue-400 border-blue-500/20" 
                : "bg-destructive/10 text-destructive border-destructive/20"
            }`}
        >
            {isActive ? "Active" : "Blocked"}
        </Badge>
    )
}
