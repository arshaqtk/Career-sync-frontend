import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/shadcn/card"
import { InfoRow } from "./InfoRow"

export function PersonalInfoCard({ recruiter }: { recruiter: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <InfoRow label="Email" value={recruiter.email} />
        <InfoRow label="Phone" value={recruiter.phone} />
        <InfoRow label="Role" value={recruiter.role} />
      </CardContent>
    </Card>
  )
}
