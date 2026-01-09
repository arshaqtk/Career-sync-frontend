import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/shadcn/card"
import { InfoRow } from "./InfoRow"
import type { RecruiterCompany } from "@/features/recruiter/types/Recruiter.type"

export function CompanyInfoCard({ company }: { company:RecruiterCompany  }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <InfoRow label="Company" value={company?.companyName} />
        <InfoRow label="Location" value={company?.companyLocation} />
        <InfoRow label="WebSite" value={company?.companyWebsite} />

      </CardContent>
    </Card>
  )
}
