import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card"
import type { ApplicationDetails } from "@/features/candidate/types/applicationDetail.types"

export const CandidateDetailsCard=({ application }: { application: ApplicationDetails })=> {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Application Details</CardTitle>
      </CardHeader>

      <CardContent className="text-sm space-y-2">
        <p><strong>Current Role:</strong> {application.currentRole}</p>
        <p><strong>Experience:</strong> {application.experience}</p>

       
          <p><strong>Expected Salary:</strong> ₹{application.expectedSalary||0}</p>
      

        {application.noticePeriod && (
          <p><strong>Notice Period:</strong> {application.noticePeriod||0}</p>
        )}
      </CardContent>
    </Card>
  )
}
