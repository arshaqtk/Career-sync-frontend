import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/shadcn/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/shadcn/avatar";
import type { ApplicantDTO } from "../../dto/applicant.dto";
import { Button } from "@/components/ui/shadcn/button";
import { useNavigate } from "react-router-dom";

type CandidateProfileProps = {
  candidate: ApplicantDTO["candidateId"];
};

export function CandidateProfileCard({ candidate }: CandidateProfileProps) {
    const navigate=useNavigate()
  return (
    <Card>
      <CardHeader>
        <CardTitle>Candidate Profile</CardTitle>
      </CardHeader>

      <CardContent className="flex items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex gap-4 items-center">
          <Avatar className="h-16 w-16">
            <AvatarImage src={candidate.profilePictureUrl} />
            <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
          </Avatar>

          <div>
            <h3 className="font-semibold text-lg">{candidate.name}</h3>
            <p className="text-sm text-gray-600">{candidate.email}</p>
            <p className="text-sm text-gray-600">{candidate.phone}</p>
            <p className="text-sm text-gray-600">{candidate.location}</p>
            <p className="text-sm text-gray-600">
              {candidate.experience} years experience
            </p>
          </div>
        </div>

        {/* Right side */}
        <Button variant="outline" className="shrink-0"
         onClick={() => navigate(`/recruiter/candidates/${candidate._id}`)}>
          View Profile
        </Button>
      </CardContent>
    </Card>
  );
}
