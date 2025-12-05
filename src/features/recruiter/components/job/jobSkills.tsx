import { Badge } from "@/components/ui/shadcn/badge";

interface JobSkillsProps {
  skills?: string[];
}

export const JobSkills: React.FC<JobSkillsProps> = ({ skills }) => {
  if (!skills || skills.length === 0) return null;

  return (
    <div className="mt-6">
      <h3 className="font-semibold text-lg">Skills Required</h3>
      <div className="flex gap-2 flex-wrap mt-2">
        {skills.map((skill) => (
          <Badge key={skill} variant="secondary">
            {skill}
          </Badge>
        ))}
      </div>
    </div>
  );
};
