import { Card, CardContent } from "@/components/ui/shadcn/card"
import { InfoRow } from "../../shared/InfoRow"

interface Candidate {
  email: string;
  phone?: string;
  location?: string;
  createdAt?: string;
}

export function CandidateProfileCard({ candidate }: { candidate: Candidate }) {
  return (
    <Card>
      <CardContent className="space-y-3">
        <InfoRow label="Email" value={candidate.email} />
        <InfoRow label="Phone" value={candidate.phone || "---"} />
        <InfoRow label="Location" value={candidate.location || "---"} />
        <InfoRow label="Joined" value={candidate.createdAt || "---"} />
      </CardContent>
    </Card>
  )
}
