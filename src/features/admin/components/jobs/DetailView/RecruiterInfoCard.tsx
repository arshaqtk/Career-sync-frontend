import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card"
import { StatusBadge } from "../../shared/StatusBadge"

export function RecruiterInfoCard({ recruiter }: { recruiter: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recruiter</CardTitle>
      </CardHeader>

      <CardContent className="space-y-2 text-sm">
        <p><strong>Name:</strong> {recruiter.name}</p>
        <p><strong>Email:</strong> {recruiter.email}</p>
        <p><strong>Company:</strong> {recruiter.company}</p>
        <StatusBadge status={recruiter.status} />
      </CardContent>
    </Card>
  )
}
