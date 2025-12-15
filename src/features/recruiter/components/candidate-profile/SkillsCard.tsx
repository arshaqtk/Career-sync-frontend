import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/shadcn/card";
import { Badge } from "@/components/ui/shadcn/badge";

export default function SkillsCard({ skills }: { skills?: string[] }) {
  if (!skills?.length) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills</CardTitle>
      </CardHeader>

      <CardContent className="flex gap-2 flex-wrap">
        {skills.map((skill) => (
          <Badge key={skill} variant="secondary">
            {skill}
          </Badge>
        ))}
      </CardContent>
    </Card>
  );
}
