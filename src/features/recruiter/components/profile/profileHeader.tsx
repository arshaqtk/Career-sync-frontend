import {
  Card,
  CardContent,
} from "@/components/ui/shadcn/card"
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/shadcn/avatar"
import { Button } from "@/components/ui/shadcn/button"
import type { RecruiterProfile } from "../../types/Recruiter.type"
import { useNavigate } from "react-router-dom"

interface RecruiterProfileHeaderProps {
  recruiter: RecruiterProfile
  onSecurity?: () => void
}

export function RecruiterProfileHeader({
  recruiter,
  // onSecurity,
}: RecruiterProfileHeaderProps) {
  const initials = recruiter.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

    const navigate=useNavigate();
  return (
    <Card>
      <CardContent className="p-6 flex items-center justify-between">
        <div className="flex gap-4 items-center">
          <Avatar className="h-16 w-16">
            <AvatarImage src={recruiter.profilePictureUrl} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>

          <div>
            <h2 className="text-xl font-semibold">
              {recruiter.name}
            </h2>

            <p className="text-sm text-muted-foreground">
              {recruiter.role} · {recruiter.recruiterData?.companyName||"Company not defined"}
            </p>

            
          </div>
        </div>

        <div className="flex gap-2">
          <Button  onClick={
           ()=>navigate("edit")
          }>
            Edit Profile
          </Button>
          {/* <Button onClick={onSecurity}>
            Security
          </Button> */}
        </div>
      </CardContent>
    </Card>
  )
}
