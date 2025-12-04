import { Badge } from "@/components/ui/shadcn/badge";

interface SkillsSectionProps {
  skills: string[];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Top Skills</h3>

      <div className="flex gap-2 flex-wrap">
        {skills.map((skill) => (
          <Badge key={skill} variant="secondary">
            {skill}
          </Badge>
        ))}
      </div>
    </div>
  );
}
