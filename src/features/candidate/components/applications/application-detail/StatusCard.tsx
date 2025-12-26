import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card"
import type { ApplicationDetails } from "@/features/candidate/types/applicationDetail.types"

export const ApplicationStatusCard=({ application }: { application: ApplicationDetails })=> {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Status</CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        {/* <StatusBadge status={application.status} /> */}

        {application.decisionNote && (
          <p className="text-sm text-muted-foreground">
            {application.decisionNote}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
