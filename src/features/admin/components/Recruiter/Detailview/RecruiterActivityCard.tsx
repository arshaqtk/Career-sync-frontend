import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/shadcn/card"
import { InfoRow } from "./InfoRow"
import { formatDateTime } from "@/lib/utils"

export function RecruiterActivityCard({ recruiter }: { recruiter:{createdAt:string,lastLoginAt:string}  }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
     <InfoRow label="Created At" value={formatDateTime(recruiter.createdAt)} />
<InfoRow label="Last Login" value={formatDateTime(recruiter.lastLoginAt)} />
        {/* <InfoRow label="Blocked By" value={recruiter.blockedBy} /> */}
      </CardContent>
    </Card>
  )
}
