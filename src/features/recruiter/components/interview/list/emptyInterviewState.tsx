import { CalendarX } from "lucide-react"
import { Button } from "@/components/ui/shadcn/button"
import { useNavigate } from "react-router-dom"

export function EmptyInterviewsState() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground">
      <CalendarX className="h-12 w-12 mb-4" />
      <h3 className="text-lg font-medium text-foreground">
        No interviews scheduled
      </h3>
      <p className="text-sm max-w-md mt-1">
        You don’t have any interviews scheduled yet. Once candidates are shortlisted,
        interviews will appear here.
      </p>

      <Button
        className="mt-6"
        onClick={() => navigate("/recruiter/jobs")}
      >
        View Jobs
      </Button>
    </div>
  )
}
