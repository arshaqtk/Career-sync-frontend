import { MoreHorizontal, Eye, CheckCircle, XCircle, Ban } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/shadcn/dropdown-menu"
import { Button } from "@/components/ui/shadcn/button"

interface CompanyActionsProps {
    status: "pending" | "approved" | "rejected"
    isActive: boolean
    onView: () => void
    onApprove: () => void
    onReject: () => void
    onBlock: () => void
    onUnblock: () => void
}

export function CompanyActions({
    status,
    isActive,
    onView,
    onApprove,
    onReject,
    onBlock,
    onUnblock,
}: CompanyActionsProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={onView}>
                    <Eye className="mr-2 h-4 w-4" /> View Details
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                {status === "pending" && (
                    <>
                        <DropdownMenuItem onClick={onApprove} className="text-green-600">
                            <CheckCircle className="mr-2 h-4 w-4" /> Approve
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={onReject} className="text-red-600">
                            <XCircle className="mr-2 h-4 w-4" /> Reject
                        </DropdownMenuItem>
                    </>
                )}

                {status === "approved" && (
                    isActive ? (
                        <DropdownMenuItem onClick={onBlock} className="text-red-600">
                            <Ban className="mr-2 h-4 w-4" /> Block Company
                        </DropdownMenuItem>
                    ) : (
                        <DropdownMenuItem onClick={onUnblock} className="text-green-600">
                            <CheckCircle className="mr-2 h-4 w-4" /> Unblock Company
                        </DropdownMenuItem>
                    )
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
