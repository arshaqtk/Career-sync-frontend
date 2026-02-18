import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/shadcn/card"
import { Separator } from "@/components/ui/shadcn/separator"
import { Button } from "@/components/ui/shadcn/button"
import { Pencil } from "lucide-react"
import { useState } from "react"

import type { RecruiterProfileDetails as RecruiterProfileDetailsType } from "../../types/Recruiter.type"
import InfoRow from "./InfoRow"
import { UpdateCompanyModal } from "./UpdateCompanyModal"

interface RecruiterProfileDetailsProps {
  profile: RecruiterProfileDetailsType
}

export function RecruiterProfileDetails({ profile }: RecruiterProfileDetailsProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
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
            {/* <InfoRow label="Location" value={profile.location} /> */}
          </CardContent>
        </Card>

        {/* Company Info */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Company Information</CardTitle>

            <Button
              size="icon"
              variant="ghost"
              onClick={() => setOpen(true)}
            >
              <Pencil className="w-4 h-4" />
            </Button>
          </CardHeader>

          <CardContent className="space-y-3 text-sm">
            <InfoRow
              label="Name"
              value={profile.recruiterData?.company?.name || "—"}
            />
            <InfoRow
              label="Website"
              value={profile.recruiterData?.company?.website || "—"}
            />
            <InfoRow
              label="Location"
              value={profile.recruiterData?.company?.location || "—"}
            />

            <Separator />

            <p className="text-muted-foreground text-sm leading-relaxed">
              {profile.recruiterData?.company?.description || "No company description provided."}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Modal */}
      <UpdateCompanyModal
        open={open}
        onClose={() => setOpen(false)}
        company={profile.recruiterData?.company}
      />
    </>
  )
}
