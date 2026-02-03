import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/shadcn/card";
import type { CandidateData } from "@/types/userDto.type";
import { Briefcase, Calendar } from "lucide-react";

type experience = Pick<CandidateData, "experience">

export default function ExperienceCard({ experience }: experience) {
  if (!experience?.length) return null;

  return (
    <Card className="bg-white border border-gray-200 shadow-sm overflow-hidden text-black">
      <CardHeader className="bg-gray-50 border-b border-gray-200 py-4">
        <CardTitle className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <Briefcase className="h-4 w-4" />
          Work Experience
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        <div className="relative border-l-2 border-gray-100 ml-3 space-y-8 pb-4">
          {experience.map((exp) => (
            <div key={exp._id} className="relative pl-8">
              {/* Dot */}
              <div className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-white bg-blue-500 shadow-sm" />

              <div className="space-y-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1">
                  <h3 className="font-bold text-gray-900">{exp.role}</h3>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded border border-gray-100">
                    <Calendar className="h-3 w-3" />
                    {new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} -{" "}
                    {exp.endDate
                      ? new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                      : "Present"}
                  </div>
                </div>
                <p className="text-sm font-semibold text-blue-600">{exp.company}</p>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
