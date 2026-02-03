import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/shadcn/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/shadcn/avatar";
import { User, Mail, Phone, MapPin } from "lucide-react";

type candidateData = {
  profilePicture: {url:string},
  name: string,
  email: string,
  phone: string,
  location: string,
  experience: string
}

export default function BasicInfoCard({ candidate }: { candidate: candidateData }) {
  return (
    <Card className="bg-white border border-gray-200 shadow-sm overflow-hidden text-black">
      <CardHeader className="bg-gray-50 border-b border-gray-200 py-4">
        <CardTitle className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <User className="h-4 w-4" />
          Basic Information
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <Avatar className="h-24 w-24 border-2 border-gray-100 shadow-sm">
            <AvatarImage src={candidate.profilePicture?.url} />
            <AvatarFallback className="bg-gray-100 text-gray-600 font-bold text-2xl">
              {candidate.name.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{candidate.name}</h2>
              {/* <div className="flex items-center gap-2 mt-1 text-blue-600 font-medium text-sm">
                <Briefcase className="h-3.5 w-3.5" />
                {candidate.experience} Years of Professional Experience
              </div> */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="h-4 w-4 text-gray-400" />
                {candidate.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="h-4 w-4 text-gray-400" />
                {candidate.phone}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4 text-gray-400" />
                {candidate.location}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
