import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/shadcn/card";
import { Badge } from "@/components/ui/shadcn/badge";
import { Cpu } from "lucide-react";

export default function SkillsCard({ skills }: { skills?: string[] }) {
  if (!skills?.length) return null;

  return (
    <Card className="bg-white border border-gray-200 shadow-sm overflow-hidden text-black">
      <CardHeader className="bg-gray-50 border-b border-gray-200 py-4">
        <CardTitle className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <Cpu className="h-4 w-4" />
          Technical Skills
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        <div className="flex gap-2 flex-wrap">
          {skills.map((skill) => (
            <Badge
              key={skill}
              variant="secondary"
              className="bg-blue-50 text-blue-700 border-blue-100 px-3 py-1 text-xs font-medium hover:bg-blue-100 transition-colors"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
