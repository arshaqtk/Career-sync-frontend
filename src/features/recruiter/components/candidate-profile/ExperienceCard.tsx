import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/shadcn/card";
import type { CandidateData } from "@/types/userDto.type";

type experience=Pick<CandidateData,"experience">
export default function ExperienceCard({ experience }:experience) {
  if (!experience?.length) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Work Experience</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {experience.map((exp) => (
          <div key={exp._id} className="border-b pb-3">
            <h3 className="font-semibold">{exp.role}</h3>
            <p className="text-gray-600">{exp.company}</p>
            <p className="text-gray-500">
               {new Date(exp.startDate).toLocaleDateString()} -{" "}
  {exp.endDate
    ? new Date(exp.endDate).toLocaleDateString()
    : "Present"}
            </p>
            <p className="text-gray-700">{exp.description}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
