import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card"
import type { ApplicationDetails } from "@/features/candidate/types/applicationDetail.types"
import ApplicationStatusBadge from "../applicationStatusBadge"

export const ApplicationStatusCard=({ application }: { application: ApplicationDetails })=> {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Status</CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        <ApplicationStatusBadge status={application.status} /><br />
        
        {application.decisionNote && (
          <p className="text-sm text-muted-foreground">
           notes: {application.decisionNote}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
