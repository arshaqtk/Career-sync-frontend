import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card"
import type { CompanyData } from "@/features/candidate/types/applicationDetail.types"

export const companyDetails=({ company }: { company: CompanyData })=>{
    return (
    <Card>
      <CardHeader>
        <CardTitle>Company</CardTitle>
      </CardHeader>

      <CardContent className="text-sm space-y-2">
        <p><strong>Name:</strong> {company.companyName}</p>
        <p><strong>Location:</strong> {company.companyLocation}</p>

        {company.companyWebsite && (
          <a
            href={company.companyWebsite}
            target="_blank"
            className="text-primary underline"
          >
            Visit Website
          </a>
        )}
      </CardContent>
    </Card>
  )
}
