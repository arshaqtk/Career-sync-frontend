import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/shadcn/card"
import { InfoRow } from "./InfoRow"
import { Button } from "@/components/ui/shadcn/button"
import { Link } from "react-router-dom"
import { ExternalLink } from "lucide-react"
import type { ICompany } from "@/features/admin/types/company.types"

export function CompanyInfoCard({ company }: { company: ICompany }) {
  const companyId = company?._id 
  const companyName =company?.name

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Company Information</CardTitle>
        {companyId && (
          <Button variant="ghost" size="sm" asChild className="h-8">
            <Link to={`/admin/companies/${companyId}`}>
              View Full Profile <ExternalLink className="ml-2 h-3 w-3" />
            </Link>
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        <InfoRow label="Company" value={companyName} />
        <InfoRow label="Location" value={company?.location } />
        <InfoRow label="Website" value={company?.website} />
      </CardContent>
    </Card>
  )
}
