import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/shadcn/dropdown-menu"
import { Button } from "@/components/ui/shadcn/button"
import { MoreHorizontal, Eye, Ban, CheckCircle } from "lucide-react"

type Status = "active" | "blocked"

export function CandidateActions({
  status,
  onView,
  onAction,
}: {
  status: Status
  onView: () => void
  onAction: (currentStatus: Status) => void
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

        <DropdownMenuItem
          onClick={() => onAction(status)}
          className={
            status === "active"
              ? "text-red-600"
              : "text-green-600"
          }
        >
          {status === "active" ? (
            <>
              <Ban className="mr-2 h-4 w-4" />
              Block
            </>
          ) : (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              Unblock
            </>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
