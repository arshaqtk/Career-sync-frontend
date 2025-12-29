import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/shadcn/card"
import { InfoRow } from "./InfoRow"

export function RecruiterActivityCard({ recruiter }: { recruiter: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <InfoRow label="Created At" value={recruiter.createdAt} />
        <InfoRow label="Last Login" value={recruiter.lastLogin} />
        <InfoRow label="Blocked By" value={recruiter.blockedBy} />
      </CardContent>
    </Card>
  )
}
