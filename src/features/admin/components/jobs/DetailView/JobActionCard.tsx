import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card"
import { Button } from "@/components/ui/shadcn/button"
import { Ban, CheckCircle } from "lucide-react"

type Status = "active" | "blocked" | "closed"

export function JobActionCard({
  status,
  onAction,
}: {
  status: Status
  onAction: (currentStatus: Status) => void
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Admin Action</CardTitle>
      </CardHeader>

      <CardContent>
        <Button
          className="w-full"
          variant={status === "blocked" ? "default" : "destructive"}
          onClick={() => onAction(status)}
        >
          {status === "blocked" ? (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              Unblock Job
            </>
          ) : (
            <>
              <Ban className="mr-2 h-4 w-4" />
              Block Job
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
