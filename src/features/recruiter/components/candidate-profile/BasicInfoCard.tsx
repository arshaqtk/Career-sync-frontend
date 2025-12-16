import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/shadcn/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/shadcn/avatar";

type candidateData={
    profilePictureUrl:string,
    name:string,
    email:string,
    phone:string,
    location:string,
    experience:string
}

export default function BasicInfoCard({ candidate }:{candidate:candidateData}) {
    console.log(candidate)
  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
      </CardHeader>

      <CardContent className="flex gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={candidate.profilePictureUrl} />
          <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
        </Avatar>

        <div>
          <h2 className="text-xl font-semibold">{candidate.name}</h2>
          <p className="text-gray-600">{candidate.email}</p>
          <p className="text-gray-600">{candidate.phone}</p>
          <p className="text-gray-600">{candidate.location}</p>
          <p className="text-gray-600">
            {candidate.experience} Years Experience
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
