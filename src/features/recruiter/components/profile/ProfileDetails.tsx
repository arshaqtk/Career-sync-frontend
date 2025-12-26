import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/shadcn/card"
import { Separator } from "@/components/ui/shadcn/separator"
import type { RecruiterProfileDetails as RecruiterProfileDetailsType } from "../../types/Recruiter.type"
import InfoRow from "./InfoRow"

interface RecruiterProfileDetailsProps {
  profile: RecruiterProfileDetailsType
}

export function RecruiterProfileDetails({
  profile,
}: RecruiterProfileDetailsProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Personal Info */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3 text-sm">
          <InfoRow label="Email" value={profile.email} />
          <InfoRow label="Phone" value={profile.phone} />
          <InfoRow label="Role" value={profile.role} />
          <InfoRow label="Location" value={profile.location} />
        </CardContent>
      </Card>

      {/* Company Info */}
      <Card>
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3 text-sm">
          <InfoRow label="Name" value={profile.company?.name} />
          <InfoRow label="Website" value={profile.company?.website} />
          <InfoRow label="Size" value={profile.company?.size} />

          <Separator />

          <p className="text-muted-foreground text-sm leading-relaxed">
            {profile.company?.description || "No company description provided."}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
