import { Badge } from "@/components/ui/shadcn/badge"

interface VerificationBadgeProps {
    status: "pending" | "approved" | "rejected"
}

export function VerificationBadge({ status }: VerificationBadgeProps) {
    const styles = {
        pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200",
        approved: "bg-green-100 text-green-800 hover:bg-green-100 border-green-200",
        rejected: "bg-red-100 text-red-800 hover:bg-red-100 border-red-200",
    }

    return (
        <Badge variant="outline" className={styles[status]}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
    )
}

export function ActiveBadge({ isActive }: { isActive: boolean }) {
    return (
        <Badge variant={isActive ? "default" : "destructive"}>
            {isActive ? "Active" : "Blocked"}
        </Badge>
    )
}
