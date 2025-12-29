import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/shadcn/dropdown-menu"
import { Button } from "@/components/ui/shadcn/button"
import { MoreHorizontal, Eye, Ban, } from "lucide-react"

type JobStatus = "active" | "blocked" | "closed"

export function JobActions({
  status,
  onView,
  onAction,
}: {
  status: JobStatus
  onView: () => void
  onAction: (currentStatus: JobStatus) => void
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onView}>
          <Eye className="mr-2 h-4 w-4" />
          View
        </DropdownMenuItem>

        {status !== "closed" && (
          <DropdownMenuItem
            onClick={() => onAction(status)}
            className="text-red-600"
          >
            <Ban className="mr-2 h-4 w-4" />
            {status === "active" ? "Block Job" : "Unblock Job"}
          </DropdownMenuItem>
        )}

        {/* {status === "active" && (
          <DropdownMenuItem
            onClick={() => onAction("closed")}
            className="text-orange-600"
          >
            <Lock className="mr-2 h-4 w-4" />
            Close Job
          </DropdownMenuItem>
        )} */}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
