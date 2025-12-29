import { Button } from "@/components/ui/shadcn/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card"
import { Ban, CheckCircle, AlertTriangle } from "lucide-react"

type Status = "active" | "blocked"

export function CandidateActionCard({
  status,
  onAction,
}: {
  status: Status
  onAction: (currentStatus: Status) => void
}) {
  const isActive = status === "active"

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Actions</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Status info */}
        <div
          className={`flex items-start gap-3 rounded-md p-3 text-sm ${
            isActive
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {isActive ? (
            <CheckCircle className="h-5 w-5 mt-0.5" />
          ) : (
            <AlertTriangle className="h-5 w-5 mt-0.5" />
          )}

          <div>
            <p className="font-medium">
              {isActive ? "Account is Active" : "Account is Blocked"}
            </p>
            <p className="text-xs">
              {isActive
                ? "Candidate can apply for jobs and access the platform."
                : "Candidate cannot apply for jobs or access the platform."}
            </p>
          </div>
        </div>

     
        <Button
          variant={isActive ? "destructive" : "default"}
          className="w-full"
          onClick={() => onAction(status)} 
        >
          {isActive ? (
            <>
              <Ban className="mr-2 h-4 w-4" />
              Block Candidate
            </>
          ) : (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              Unblock Candidate
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
