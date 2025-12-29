import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/shadcn/card"
import { InfoRow } from "./InfoRow"

export function CompanyInfoCard({ company }: { company: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <InfoRow label="Company" value={company?.name} />
        <InfoRow label="Location" value={company?.location} />
        <InfoRow label="Industry" value={company?.field} />
      </CardContent>
    </Card>
  )
}
