import { Card, CardContent } from "@/components/ui/shadcn/card"
import { InfoRow } from "../../shared/InfoRow"

export function CandidateProfileCard({ candidate }: any) {
  return (
    <Card>
      <CardContent className="space-y-3">
        <InfoRow label="Email" value={candidate.email} />
        <InfoRow label="Phone" value={candidate.phone} />
        <InfoRow label="Location" value={candidate.location} />
        <InfoRow label="Joined" value={candidate.createdAt} />
      </CardContent>
    </Card>
  )
}
